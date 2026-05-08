const STORAGE_KEY = "coniugare-settings-v1";

const DEFAULT_STATE = {
  selectedVerbIds: ["essere", "avere", "fare", "andare", "parlare"],
  selectedFormIds: ["presente"],
  promptLanguage: "both",
  currentRound: null,
};

const els = {
  verbPicker: document.querySelector("#verbPicker"),
  formPicker: document.querySelector("#formPicker"),
  verbSearch: document.querySelector("#verbSearch"),
  formSearch: document.querySelector("#formSearch"),
  verbList: document.querySelector("#verbList"),
  formList: document.querySelector("#formList"),
  verbCount: document.querySelector("#verbCount"),
  formCount: document.querySelector("#formCount"),
  selectAllVerbs: document.querySelector("#selectAllVerbs"),
  clearVerbs: document.querySelector("#clearVerbs"),
  doneVerbs: document.querySelector("#doneVerbs"),
  selectAllForms: document.querySelector("#selectAllForms"),
  clearForms: document.querySelector("#clearForms"),
  doneForms: document.querySelector("#doneForms"),
  promptLanguage: document.querySelector("#promptLanguage"),
  clearAnswers: document.querySelector("#clearAnswers"),
  nextRound: document.querySelector("#nextRound"),
  quizTitle: document.querySelector("#quizTitle"),
  quizSubtitle: document.querySelector("#quizSubtitle"),
  quizForm: document.querySelector("#quizForm"),
  checkAnswers: document.querySelector("#checkAnswers"),
  scoreText: document.querySelector("#scoreText"),
};

let state = loadState();
let answersChecked = false;
let checkedHasMistakes = false;
let pendingChoiceFocus = null;

function defaultState() {
  return {
    ...DEFAULT_STATE,
    selectedVerbIds: [...DEFAULT_STATE.selectedVerbIds],
    selectedFormIds: [...DEFAULT_STATE.selectedFormIds],
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaultState();

    const defaults = defaultState();
    return {
      selectedVerbIds: Array.isArray(saved.selectedVerbIds)
        ? saved.selectedVerbIds.filter((id) => VERBS.some((verb) => verb.id === id))
        : defaults.selectedVerbIds,
      selectedFormIds: Array.isArray(saved.selectedFormIds)
        ? saved.selectedFormIds.filter((id) => FORMS.some((form) => form.id === id))
        : defaults.selectedFormIds,
      promptLanguage: ["both", "it", "en"].includes(saved.promptLanguage) ? saved.promptLanguage : defaults.promptLanguage,
      currentRound: saved.currentRound && typeof saved.currentRound === "object" ? saved.currentRound : null,
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Continue without persistence when storage is unavailable or full.
  }
}

function normalize(value) {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/[.,;:!?]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function fuzzyScore(query, text) {
  const q = normalize(query);
  const t = normalize(text);
  if (!q) return 1;
  if (t === q) return 1000;
  if (t.includes(q)) return 500 - t.indexOf(q);

  let qi = 0;
  let score = 0;
  let streak = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti += 1) {
    if (t[ti] === q[qi]) {
      qi += 1;
      streak += 1;
      score += 10 + streak * 2;
    } else {
      streak = 0;
      score -= 1;
    }
  }
  return qi === q.length ? score : -Infinity;
}

function searchableVerb(verb) {
  return `${verb.it} ${verb.en} ${verb.irregular ? "irregular" : "regular"}`;
}

function searchableForm(form) {
  return `${form.it} ${form.en} ${form.hint}`;
}

function renderChoiceList({ items, selectedIds, query, container, getTitle, getSubtitle, getSearchText, onToggle }) {
  const scored = items
    .map((item, index) => ({ item, index, score: fuzzyScore(query, getSearchText(item)) }))
    .filter(({ score }) => score > -Infinity)
    .sort((a, b) => (query ? b.score - a.score : a.index - b.index));

  container.replaceChildren();

  if (!scored.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No matches. Try another search.";
    container.append(empty);
    return;
  }

  scored.forEach(({ item }) => {
    const button = document.createElement("button");
    const selected = selectedIds.includes(item.id);
    button.type = "button";
    button.className = "choice";
    button.dataset.choiceId = item.id;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", selected.toString());
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      pendingChoiceFocus = { containerId: container.id, choiceId: item.id };
      onToggle(item.id);
    });

    const check = document.createElement("span");
    check.className = "checkmark";
    check.setAttribute("aria-hidden", "true");
    check.textContent = selected ? "✓" : "";

    const text = document.createElement("span");
    const title = document.createElement("span");
    title.className = "choice-title";
    title.textContent = getTitle(item);
    const subtitle = document.createElement("span");
    subtitle.className = "choice-subtitle";
    subtitle.textContent = getSubtitle(item);
    text.append(title, subtitle);

    button.append(check, text);
    container.append(button);
  });

  if (pendingChoiceFocus?.containerId === container.id) {
    const target = [...container.querySelectorAll(".choice")]
      .find((button) => button.dataset.choiceId === pendingChoiceFocus.choiceId);
    target?.focus();
    target?.scrollIntoView({ block: "nearest" });
    pendingChoiceFocus = null;
  }
}

function choiceButtons(container) {
  return [...container.querySelectorAll(".choice")];
}

function focusChoice(container, index) {
  const buttons = choiceButtons(container);
  if (!buttons.length) return;
  const boundedIndex = Math.max(0, Math.min(index, buttons.length - 1));
  buttons[boundedIndex].focus();
  buttons[boundedIndex].scrollIntoView({ block: "nearest" });
}

function moveChoiceFocus(container, direction) {
  const buttons = choiceButtons(container);
  if (!buttons.length) return;
  const currentIndex = buttons.indexOf(document.activeElement);
  const nextIndex = currentIndex === -1
    ? (direction > 0 ? 0 : buttons.length - 1)
    : currentIndex + direction;
  focusChoice(container, nextIndex);
}

function handleChoiceListKeydown(event, container) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveChoiceFocus(container, 1);
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveChoiceFocus(container, -1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    focusChoice(container, 0);
  }

  if (event.key === "End") {
    event.preventDefault();
    focusChoice(container, choiceButtons(container).length - 1);
  }
}

function handleChoiceSearchKeydown(event, container) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    focusChoice(container, 0);
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    focusChoice(container, choiceButtons(container).length - 1);
  }
}

function renderSettings() {
  els.promptLanguage.value = state.promptLanguage;
  els.verbCount.textContent = `${state.selectedVerbIds.length} selected`;
  els.formCount.textContent = `${state.selectedFormIds.length} selected`;

  renderChoiceList({
    items: VERBS,
    selectedIds: state.selectedVerbIds,
    query: els.verbSearch.value,
    container: els.verbList,
    getTitle: (verb) => verb.it,
    getSubtitle: (verb) => `${verb.en} · ${verb.irregular ? "irregular" : "regular"}`,
    getSearchText: searchableVerb,
    onToggle: toggleVerb,
  });

  renderChoiceList({
    items: FORMS,
    selectedIds: state.selectedFormIds,
    query: els.formSearch.value,
    container: els.formList,
    getTitle: (form) => form.it,
    getSubtitle: (form) => `${form.en} · ${form.hint}`,
    getSearchText: searchableForm,
    onToggle: toggleForm,
  });
}

function toggleVerb(id) {
  state.selectedVerbIds = toggleId(state.selectedVerbIds, id);
  keepRoundValid();
  saveState();
  render();
}

function toggleForm(id) {
  state.selectedFormIds = toggleId(state.selectedFormIds, id);
  keepRoundValid();
  saveState();
  render();
}

function toggleId(ids, id) {
  return ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];
}

function getCurrentVerb() {
  return VERBS.find((verb) => verb.id === state.currentRound?.verbId);
}

function getCurrentForm() {
  return FORMS.find((form) => form.id === state.currentRound?.formId);
}

function keepRoundValid() {
  const verbValid = state.currentRound && state.selectedVerbIds.includes(state.currentRound.verbId);
  const formValid = state.currentRound && state.selectedFormIds.includes(state.currentRound.formId);
  if (!verbValid || !formValid) state.currentRound = null;
}

function newRound({ focusFirst = true } = {}) {
  if (!state.selectedVerbIds.length || !state.selectedFormIds.length) {
    state.currentRound = null;
    saveState();
    renderQuiz();
    return;
  }

  const rounds = state.selectedVerbIds.flatMap((verbId) => state.selectedFormIds.map((formId) => ({ verbId, formId })));
  const currentKey = state.currentRound ? `${state.currentRound.verbId}:${state.currentRound.formId}` : null;
  const nextRounds = rounds.length > 1 ? rounds.filter((round) => `${round.verbId}:${round.formId}` !== currentKey) : rounds;
  state.currentRound = randomFrom(nextRounds);
  saveState();
  renderQuiz();

  if (focusFirst) {
    requestAnimationFrame(() => document.querySelector(".answer-input")?.focus());
  }
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setAnswersChecked(checked, { hasMistakes = false } = {}) {
  answersChecked = checked;
  checkedHasMistakes = checked && hasMistakes;
  els.checkAnswers.textContent = checked ? (hasMistakes ? "Try Again" : "Next Verb") : "Check answers";
  els.checkAnswers.classList.toggle("primary", checked);
}

function titleFor(verb, form) {
  if (state.promptLanguage === "it") return `${verb.it} — ${form.it}`;
  if (state.promptLanguage === "en") return `${verb.en} — ${form.en}`;
  return `${verb.it} — ${form.it}`;
}

function subtitleFor(verb, form) {
  if (state.promptLanguage === "it") return form.hint;
  if (state.promptLanguage === "en") return "Type the Italian conjugations for each pronoun.";
  return `${verb.en} — ${form.en}. Type the Italian conjugations for each pronoun.`;
}

function renderQuiz() {
  keepRoundValid();

  if (!state.currentRound && state.selectedVerbIds.length && state.selectedFormIds.length) {
    state.currentRound = { verbId: randomFrom(state.selectedVerbIds), formId: randomFrom(state.selectedFormIds) };
    saveState();
  }

  const verb = getCurrentVerb();
  const form = getCurrentForm();
  const hasQuiz = Boolean(verb && form);
  els.quizForm.replaceChildren();
  els.scoreText.textContent = "No answers checked yet.";
  setAnswersChecked(false);

  els.checkAnswers.disabled = !hasQuiz;
  els.quizTitle.textContent = hasQuiz ? titleFor(verb, form) : "Ready?";
  els.quizSubtitle.textContent = hasQuiz
    ? subtitleFor(verb, form)
    : "Choose at least one verb and one form to start.";

  PRONOUNS.forEach((pronoun, index) => {
    const row = document.createElement("label");
    row.className = "answer-row";

    const pronounEl = document.createElement("span");
    pronounEl.className = "pronoun";
    const it = document.createElement("strong");
    it.textContent = pronoun.it;
    const en = document.createElement("span");
    en.className = "muted";
    en.textContent = `— ${pronoun.en}`;
    pronounEl.append(it, en);

    const input = document.createElement("input");
    input.className = "answer-input";
    input.name = `answer-${index}`;
    input.type = "text";
    input.inputMode = "text";
    input.autocapitalize = "none";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.placeholder = hasQuiz ? "conjugation" : "select verbs/forms";
    input.disabled = !hasQuiz;
    input.dataset.index = index.toString();

    const feedback = document.createElement("span");
    feedback.className = "feedback";
    feedback.setAttribute("aria-live", "polite");

    row.append(pronounEl, input, feedback);
    els.quizForm.append(row);
  });
}

function canonicalAnswer(answer) {
  return Array.isArray(answer) ? answer[0] : answer;
}

function answerVariants(answer) {
  const answers = Array.isArray(answer) ? answer : [answer];
  return [...new Set(answers.flatMap(expandSlashAnswer))];
}

function expandSlashAnswer(answer) {
  const words = answer.split(" ");
  let variants = [""];

  words.forEach((word) => {
    const wordVariants = expandSlashWord(word);
    variants = variants.flatMap((prefix) => wordVariants.map((variant) => `${prefix} ${variant}`.trim()));
  });

  return variants;
}

function expandSlashWord(word) {
  if (!word.includes("/")) return [word];
  const [left, right] = word.split("/");
  const replacement = right.length === 1 && /^[ae]$/.test(right) && /[oi]$/.test(left)
    ? left.slice(0, -1) + right
    : right;
  return [...new Set([word, left, replacement])];
}

function isCorrect(userAnswer, expectedAnswer) {
  const normalizedUser = normalize(userAnswer);
  if (!normalizedUser) return false;
  return answerVariants(expectedAnswer).some((variant) => normalize(variant) === normalizedUser);
}

function checkAnswers() {
  const verb = getCurrentVerb();
  const form = getCurrentForm();
  if (!verb || !form) return;

  const expected = verb.forms[form.id];
  let correct = 0;

  [...els.quizForm.querySelectorAll(".answer-row")].forEach((row, index) => {
    const input = row.querySelector(".answer-input");
    const feedback = row.querySelector(".feedback");
    const ok = isCorrect(input.value, expected[index]);

    row.classList.toggle("correct", ok);
    row.classList.toggle("incorrect", !ok);
    if (ok) {
      correct += 1;
      feedback.textContent = "✓";
      feedback.setAttribute("aria-label", "correct");
    } else {
      feedback.textContent = canonicalAnswer(expected[index]);
      feedback.removeAttribute("aria-label");
    }
  });

  els.scoreText.textContent = `${correct} / ${PRONOUNS.length} correct`;
  setAnswersChecked(true, { hasMistakes: correct < PRONOUNS.length });
  requestAnimationFrame(() => els.checkAnswers.focus());
}

function clearAnswers({ focusFirst = true } = {}) {
  setAnswersChecked(false);
  els.scoreText.textContent = "No answers checked yet.";

  [...els.quizForm.querySelectorAll(".answer-row")].forEach((row) => {
    row.classList.remove("correct", "incorrect");
    row.querySelector(".answer-input").value = "";
    row.querySelector(".feedback").textContent = "";
  });

  if (focusFirst) {
    requestAnimationFrame(() => document.querySelector(".answer-input")?.focus());
  }
}

function selectAll(type) {
  if (type === "verbs") state.selectedVerbIds = VERBS.map((verb) => verb.id);
  if (type === "forms") state.selectedFormIds = FORMS.map((form) => form.id);
  keepRoundValid();
  saveState();
  render();
}

function clearAll(type) {
  if (type === "verbs") state.selectedVerbIds = [];
  if (type === "forms") state.selectedFormIds = [];
  keepRoundValid();
  saveState();
  render();
}

function render() {
  renderSettings();
  renderQuiz();
}

function focusPickerSearch(kind) {
  const picker = kind === "verbs" ? els.verbPicker : els.formPicker;
  const search = kind === "verbs" ? els.verbSearch : els.formSearch;
  picker.open = true;
  requestAnimationFrame(() => {
    search.focus();
    search.select();
  });
}

function closePicker(picker) {
  picker.open = false;
  document.querySelector(".answer-input:not(:disabled)")?.focus();
}

function closePickerOnEnter(event, picker) {
  if (!picker.open || event.key !== "Enter" || !event.target.closest(".picker-menu")) return;
  event.preventDefault();
  event.stopPropagation();
  closePicker(picker);
}

els.promptLanguage.addEventListener("change", (event) => {
  state.promptLanguage = event.target.value;
  saveState();
  renderQuiz();
});

els.verbSearch.addEventListener("input", renderSettings);
els.formSearch.addEventListener("input", renderSettings);
els.verbSearch.addEventListener("keydown", (event) => handleChoiceSearchKeydown(event, els.verbList));
els.formSearch.addEventListener("keydown", (event) => handleChoiceSearchKeydown(event, els.formList));
els.verbList.addEventListener("keydown", (event) => handleChoiceListKeydown(event, els.verbList));
els.formList.addEventListener("keydown", (event) => handleChoiceListKeydown(event, els.formList));
els.verbPicker.addEventListener("keydown", (event) => closePickerOnEnter(event, els.verbPicker));
els.formPicker.addEventListener("keydown", (event) => closePickerOnEnter(event, els.formPicker));
els.selectAllVerbs.addEventListener("click", () => selectAll("verbs"));
els.clearVerbs.addEventListener("click", () => clearAll("verbs"));
els.doneVerbs.addEventListener("click", () => closePicker(els.verbPicker));
els.selectAllForms.addEventListener("click", () => selectAll("forms"));
els.clearForms.addEventListener("click", () => clearAll("forms"));
els.doneForms.addEventListener("click", () => closePicker(els.formPicker));
els.verbPicker.addEventListener("toggle", () => {
  if (els.verbPicker.open) els.formPicker.open = false;
});
els.formPicker.addEventListener("toggle", () => {
  if (els.formPicker.open) els.verbPicker.open = false;
});
document.addEventListener("click", (event) => {
  if (els.verbPicker.open && !els.verbPicker.contains(event.target)) {
    els.verbPicker.open = false;
  }
  if (els.formPicker.open && !els.formPicker.contains(event.target)) {
    els.formPicker.open = false;
  }
});
els.clearAnswers.addEventListener("click", () => clearAnswers());
els.nextRound.addEventListener("click", () => newRound());
els.checkAnswers.addEventListener("click", () => {
  if (!answersChecked) checkAnswers();
  else if (checkedHasMistakes) clearAnswers();
  else newRound();
});
els.quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkAnswers();
});
els.quizForm.addEventListener("input", (event) => {
  if (!event.target.classList.contains("answer-input") || !answersChecked) return;
  setAnswersChecked(false);
  els.scoreText.textContent = "No answers checked yet.";
  [...els.quizForm.querySelectorAll(".answer-row")].forEach((row) => {
    row.classList.remove("correct", "incorrect");
    row.querySelector(".feedback").textContent = "";
  });
});
els.quizForm.addEventListener("keydown", (event) => {
  if (event.isComposing || !event.target.classList.contains("answer-input")) return;

  const inputs = [...els.quizForm.querySelectorAll(".answer-input")];
  const currentIndex = inputs.indexOf(event.target);

  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    const direction = event.key === "ArrowUp" ? -1 : 1;
    const nextIndex = Math.max(0, Math.min(currentIndex + direction, inputs.length - 1));
    inputs[nextIndex]?.focus();
    return;
  }

  if (event.key !== "Enter") return;

  event.preventDefault();

  const allFilled = inputs.every((input) => input.value.trim());

  if (allFilled) {
    if (!answersChecked) checkAnswers();
    else if (checkedHasMistakes) clearAnswers();
    else newRound();
    return;
  }

  const nextInput = inputs.slice(currentIndex + 1).find((input) => !input.value.trim())
    || inputs[currentIndex + 1]
    || inputs.find((input) => !input.value.trim());

  nextInput?.focus();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    if (!answersChecked) checkAnswers();
    else if (checkedHasMistakes) clearAnswers();
    else newRound();
    return;
  }

  if (event.altKey && event.key.toLowerCase() === "n") {
    event.preventDefault();
    newRound();
    return;
  }

  if (event.altKey && event.key.toLowerCase() === "v") {
    event.preventDefault();
    focusPickerSearch("verbs");
    return;
  }

  if (event.altKey && event.key.toLowerCase() === "f") {
    event.preventDefault();
    focusPickerSearch("forms");
    return;
  }

  if (!isTyping && event.key === "/") {
    event.preventDefault();
    focusPickerSearch("verbs");
    return;
  }

  if (!isTyping && event.key.toLowerCase() === "f") {
    event.preventDefault();
    focusPickerSearch("forms");
  }
});

render();
requestAnimationFrame(() => document.querySelector(".answer-input")?.focus());
