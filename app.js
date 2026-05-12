const STORAGE_KEY = "coniugare-settings-v1";
const URL_VERBS_PARAM = "verbs";
const URL_FORMS_PARAM = "forms";
const URL_ALL_VALUE = "all";

const DEFAULT_STATE = {
  selectedVerbIds: [],
  selectedFormIds: ["presente"],
  promptLanguage: "both",
  currentRound: null,
  roundQueue: [],
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
  checkedVerbsOnly: document.querySelector("#checkedVerbsOnly"),
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
  hintText: document.querySelector("#hintText"),
  contactLink: document.querySelector("#contactLink"),
  checkAnswers: document.querySelector("#checkAnswers"),
};

const IS_MAC = /mac|iphone|ipad|ipod/i.test(navigator.userAgentData?.platform || navigator.platform || "");
const DEFAULT_CONTACT_EMAIL = "hello@coniugare.app";

let state = loadState();
let answersChecked = false;
let checkedHasMistakes = false;
let showCheckedVerbsOnly = false;
let pendingChoiceFocus = null;
let escapePrimed = false;

function defaultState() {
  return {
    ...DEFAULT_STATE,
    selectedVerbIds: VERBS.map((verb) => verb.id),
    selectedFormIds: [...DEFAULT_STATE.selectedFormIds],
    roundQueue: [...DEFAULT_STATE.roundQueue],
  };
}

function idsFromUrl(params, name, validIds) {
  const pathPrefix = `${name}=`;
  const pathValues = window.location.pathname
    .split("/")
    .filter((part) => part.startsWith(pathPrefix))
    .map((part) => decodeURIComponent(part.slice(pathPrefix.length)));
  const rawValues = params.has(name) ? params.getAll(name) : pathValues;
  if (!rawValues.length) return null;

  const tokens = rawValues
    .flatMap((value) => value.split(","))
    .map((id) => id.trim());
  if (tokens.includes(URL_ALL_VALUE)) return [...validIds];

  const validIdSet = new Set(validIds);
  const seen = new Set();
  return tokens.filter((id) => {
    if (!validIdSet.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function loadState() {
  const defaults = defaultState();
  const params = new URLSearchParams(window.location.search);
  const urlVerbIds = idsFromUrl(params, URL_VERBS_PARAM, VERBS.map((verb) => verb.id));
  const urlFormIds = idsFromUrl(params, URL_FORMS_PARAM, FORMS.map((form) => form.id));

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") {
      return {
        ...defaults,
        selectedVerbIds: urlVerbIds || defaults.selectedVerbIds,
        selectedFormIds: urlFormIds || defaults.selectedFormIds,
      };
    }

    const selectedVerbIds = urlVerbIds || defaults.selectedVerbIds;
    const selectedFormIds = urlFormIds || defaults.selectedFormIds;
    return {
      selectedVerbIds,
      selectedFormIds,
      promptLanguage: ["both", "it", "en"].includes(saved.promptLanguage) ? saved.promptLanguage : defaults.promptLanguage,
      currentRound: null,
      roundQueue: defaults.roundQueue,
    };
  } catch {
    return {
      ...defaults,
      selectedVerbIds: urlVerbIds || defaults.selectedVerbIds,
      selectedFormIds: urlFormIds || defaults.selectedFormIds,
    };
  }
}

function urlSelectionValue(selectedIds, allIds) {
  return selectedIds.length === allIds.length && allIds.every((id) => selectedIds.includes(id))
    ? URL_ALL_VALUE
    : selectedIds.join(",");
}

function syncUrlSelections() {
  const url = new URL(window.location.href);
  url.searchParams.set(URL_VERBS_PARAM, urlSelectionValue(state.selectedVerbIds, VERBS.map((verb) => verb.id)));
  url.searchParams.set(URL_FORMS_PARAM, urlSelectionValue(state.selectedFormIds, FORMS.map((form) => form.id)));
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Continue without persistence when storage is unavailable or full.
  }
  syncUrlSelections();
}

function shortcutFragment(...keys) {
  const fragment = document.createDocumentFragment();
  keys.forEach((key, index) => {
    if (index) fragment.append(" + ");
    const keyEl = document.createElement("kbd");
    keyEl.textContent = key;
    fragment.append(keyEl);
  });
  return fragment;
}

function renderKeyboardHint() {
  const optionKey = IS_MAC ? "⌥" : "Alt";
  const commandKey = IS_MAC ? "⌘" : "Ctrl";
  els.hintText.replaceChildren(
    "Keyboard: ",
    shortcutFragment(optionKey, "V"),
    " verbs, ",
    shortcutFragment(optionKey, "F"),
    " forms, ",
    shortcutFragment(commandKey, "Enter"),
    " check, ",
    shortcutFragment(optionKey, "N"),
    " next, ",
    shortcutFragment("Esc", "Esc"),
    " refresh.",
  );
}

function renderContactLink() {
  const configuredEmail = window.CONIUGARE_CONFIG?.contactEmail;
  const email = (typeof configuredEmail === "string" ? configuredEmail : DEFAULT_CONTACT_EMAIL)
    .replace(/[\r\n]/g, "")
    .trim() || DEFAULT_CONTACT_EMAIL;
  els.contactLink.href = `mailto:${email}`;
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

function alphabetizeByItalian(a, b) {
  return a.it.localeCompare(b.it, "it", { sensitivity: "base" });
}

function verbSearchRank(verb, query) {
  const q = normalize(query);
  const it = normalize(verb.it);
  const en = normalize(verb.en);
  const regularity = verb.irregular ? "irregular" : "regular";

  if (it === q || en === q) return 0;
  if (it.startsWith(q) || en.startsWith(q)) return 1;
  if (regularity === q) return 2;
  if (it.includes(q) || en.includes(q)) return 3;
  if (searchableVerb(verb).includes(q)) return 4;
  return 5;
}

function sortVerbSearchResults(a, b, query) {
  return verbSearchRank(a, query) - verbSearchRank(b, query) || alphabetizeByItalian(a, b);
}

function renderChoiceList({ items, selectedIds, query, container, getTitle, getSubtitle, getSearchText, onToggle, sortWhenIdle, sortWhenSearching, emptyText = "No matches. Try another search." }) {
  const hasQuery = Boolean(normalize(query));
  const scored = items
    .map((item, index) => ({ item, index, score: fuzzyScore(query, getSearchText(item)) }))
    .filter(({ score }) => score > -Infinity)
    .sort((a, b) => {
      if (hasQuery) return sortWhenSearching ? sortWhenSearching(a.item, b.item, query) : b.score - a.score;
      if (sortWhenIdle) return sortWhenIdle(a.item, b.item);
      return a.index - b.index;
    });

  container.replaceChildren();

  if (!scored.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = emptyText;
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
  els.promptLanguage.querySelectorAll("button").forEach((button) => {
    const selected = button.dataset.promptLanguage === state.promptLanguage;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected.toString());
  });
  els.verbCount.textContent = `${state.selectedVerbIds.length} selected`;
  els.formCount.textContent = `${state.selectedFormIds.length} selected`;
  els.checkedVerbsOnly.classList.toggle("selected", showCheckedVerbsOnly);
  els.checkedVerbsOnly.setAttribute("aria-pressed", showCheckedVerbsOnly.toString());

  const visibleVerbs = showCheckedVerbsOnly
    ? VERBS.filter((verb) => state.selectedVerbIds.includes(verb.id))
    : VERBS;

  renderChoiceList({
    items: visibleVerbs,
    selectedIds: state.selectedVerbIds,
    query: els.verbSearch.value,
    container: els.verbList,
    getTitle: (verb) => verb.it,
    getSubtitle: (verb) => `${verb.en} · ${verb.irregular ? "irregular" : "regular"}`,
    getSearchText: searchableVerb,
    onToggle: toggleVerb,
    sortWhenIdle: alphabetizeByItalian,
    sortWhenSearching: sortVerbSearchResults,
    emptyText: showCheckedVerbsOnly ? "No checked verbs match." : "No matches. Try another search.",
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
  resetRoundQueue();
  saveState();
  render();
}

function toggleForm(id) {
  state.selectedFormIds = toggleId(state.selectedFormIds, id);
  keepRoundValid();
  resetRoundQueue();
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
  state.roundQueue = sanitizeRoundQueue(state.roundQueue);
}

function roundKey(round) {
  return round ? `${round.verbId}:${round.formId}` : "";
}

function selectedRounds() {
  return state.selectedVerbIds.flatMap((verbId) => state.selectedFormIds.map((formId) => ({ verbId, formId })));
}

function sanitizeRoundQueue(queue) {
  if (!Array.isArray(queue)) return [];

  const seen = new Set();
  return queue
    .filter((round) => round
      && state.selectedVerbIds.includes(round.verbId)
      && state.selectedFormIds.includes(round.formId))
    .filter((round) => {
      const key = roundKey(round);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((round) => ({ verbId: round.verbId, formId: round.formId }));
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function moveCurrentRoundAwayFromFront(queue) {
  const currentKey = roundKey(state.currentRound);
  if (queue.length < 2 || roundKey(queue[0]) !== currentKey) return queue;

  const swapIndex = queue.findIndex((round, index) => index > 0 && roundKey(round) !== currentKey);
  if (swapIndex > 0) [queue[0], queue[swapIndex]] = [queue[swapIndex], queue[0]];
  return queue;
}

function resetRoundQueue() {
  const currentKey = roundKey(state.currentRound);
  const rounds = selectedRounds();
  const remaining = currentKey && rounds.length > 1
    ? rounds.filter((round) => roundKey(round) !== currentKey)
    : rounds;
  state.roundQueue = shuffled(remaining);
}

function refillRoundQueue() {
  state.roundQueue = moveCurrentRoundAwayFromFront(shuffled(selectedRounds()));
}

function takeNextRound() {
  if (!state.selectedVerbIds.length || !state.selectedFormIds.length) {
    state.currentRound = null;
    state.roundQueue = [];
    return;
  }

  state.roundQueue = sanitizeRoundQueue(state.roundQueue);
  if (!state.roundQueue.length) refillRoundQueue();
  state.currentRound = state.roundQueue.shift() || null;
}

function pressButton(button, action) {
  button.classList.add("keyboard-pressed");
  window.setTimeout(() => button.classList.remove("keyboard-pressed"), 140);
  action();
}

function newRound({ focusFirst = true } = {}) {
  if (!state.selectedVerbIds.length || !state.selectedFormIds.length) {
    state.currentRound = null;
    state.roundQueue = [];
    saveState();
    renderQuiz();
    return;
  }

  takeNextRound();
  saveState();
  renderQuiz();

  if (focusFirst) {
    requestAnimationFrame(() => document.querySelector(".answer-input")?.focus());
  }
}

function setAnswersChecked(checked, { hasMistakes = false } = {}) {
  answersChecked = checked;
  checkedHasMistakes = checked && hasMistakes;

  if (!checked) {
    els.checkAnswers.textContent = "Controlla le risposte";
    els.checkAnswers.title = "Check answers";
    return;
  }

  if (hasMistakes) {
    els.checkAnswers.textContent = "Riprova";
    els.checkAnswers.title = "Try again";
    return;
  }

  els.checkAnswers.textContent = "Prossimo verbo";
  els.checkAnswers.title = "Next verb";
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
    takeNextRound();
    saveState();
  }

  const verb = getCurrentVerb();
  const form = getCurrentForm();
  const hasQuiz = Boolean(verb && form);
  els.quizForm.replaceChildren();
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
    en.textContent = pronoun.en;
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

  setAnswersChecked(true, { hasMistakes: correct < PRONOUNS.length });
  requestAnimationFrame(() => els.checkAnswers.focus());
}

function clearAnswers({ focusFirst = true } = {}) {
  setAnswersChecked(false);

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
  resetRoundQueue();
  saveState();
  render();
}

function clearAll(type) {
  if (type === "verbs") state.selectedVerbIds = [];
  if (type === "forms") state.selectedFormIds = [];
  keepRoundValid();
  resetRoundQueue();
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

els.promptLanguage.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-prompt-language]");
  if (!button) return;

  state.promptLanguage = button.dataset.promptLanguage;
  saveState();
  renderSettings();
  renderQuiz();
});

els.verbSearch.addEventListener("input", renderSettings);
els.formSearch.addEventListener("input", renderSettings);
els.checkedVerbsOnly.addEventListener("click", () => {
  showCheckedVerbsOnly = !showCheckedVerbsOnly;
  renderSettings();
});
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

  if (event.key === "Escape") {
    event.preventDefault();
    if (els.verbPicker.open || els.formPicker.open) {
      els.verbPicker.open = false;
      els.formPicker.open = false;
      escapePrimed = false;
      document.querySelector(".answer-input:not(:disabled)")?.focus();
    } else if (document.activeElement === els.clearAnswers && escapePrimed) {
      clearAnswers();
      escapePrimed = false;
    } else {
      els.clearAnswers.focus();
      escapePrimed = true;
    }
    return;
  }

  escapePrimed = false;

  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    if (!answersChecked) checkAnswers();
    else if (checkedHasMistakes) clearAnswers();
    else newRound();
    return;
  }

  if (event.altKey && (event.key.toLowerCase() === "n" || event.code === "KeyN")) {
    event.preventDefault();
    pressButton(els.nextRound, () => newRound());
    return;
  }

  if (event.altKey && (event.key.toLowerCase() === "v" || event.code === "KeyV")) {
    event.preventDefault();
    focusPickerSearch("verbs");
    return;
  }

  if (event.altKey && (event.key.toLowerCase() === "f" || event.code === "KeyF")) {
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

renderKeyboardHint();
renderContactLink();
syncUrlSelections();
render();
requestAnimationFrame(() => document.querySelector(".answer-input")?.focus());
