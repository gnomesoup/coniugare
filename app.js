const PRONOUNS = [
  { it: "io", en: "I" },
  { it: "tu", en: "you" },
  { it: "lui / lei", en: "he / she" },
  { it: "noi", en: "we" },
  { it: "voi", en: "you all" },
  { it: "loro", en: "they" },
];

const FORMS = [
  { id: "presente", it: "presente indicativo", en: "present indicative", hint: "I speak / I am" },
  { id: "passato_prossimo", it: "passato prossimo", en: "present perfect", hint: "I have spoken / I went" },
  { id: "imperfetto", it: "imperfetto", en: "imperfect", hint: "I used to speak" },
  { id: "futuro", it: "futuro semplice", en: "simple future", hint: "I will speak" },
  { id: "condizionale", it: "condizionale presente", en: "present conditional", hint: "I would speak" },
  { id: "congiuntivo_presente", it: "congiuntivo presente", en: "present subjunctive", hint: "that I speak" },
];

const VERBS = [
  {
    id: "essere",
    it: "essere",
    en: "to be",
    forms: {
      presente: ["sono", "sei", "è", "siamo", "siete", "sono"],
      passato_prossimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
      imperfetto: ["ero", "eri", "era", "eravamo", "eravate", "erano"],
      futuro: ["sarò", "sarai", "sarà", "saremo", "sarete", "saranno"],
      condizionale: ["sarei", "saresti", "sarebbe", "saremmo", "sareste", "sarebbero"],
      congiuntivo_presente: ["sia", "sia", "sia", "siamo", "siate", "siano"],
    },
  },
  {
    id: "avere",
    it: "avere",
    en: "to have",
    forms: {
      presente: ["ho", "hai", "ha", "abbiamo", "avete", "hanno"],
      passato_prossimo: ["ho avuto", "hai avuto", "ha avuto", "abbiamo avuto", "avete avuto", "hanno avuto"],
      imperfetto: ["avevo", "avevi", "aveva", "avevamo", "avevate", "avevano"],
      futuro: ["avrò", "avrai", "avrà", "avremo", "avrete", "avranno"],
      condizionale: ["avrei", "avresti", "avrebbe", "avremmo", "avreste", "avrebbero"],
      congiuntivo_presente: ["abbia", "abbia", "abbia", "abbiamo", "abbiate", "abbiano"],
    },
  },
  {
    id: "fare",
    it: "fare",
    en: "to do / make",
    forms: {
      presente: ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
      passato_prossimo: ["ho fatto", "hai fatto", "ha fatto", "abbiamo fatto", "avete fatto", "hanno fatto"],
      imperfetto: ["facevo", "facevi", "faceva", "facevamo", "facevate", "facevano"],
      futuro: ["farò", "farai", "farà", "faremo", "farete", "faranno"],
      condizionale: ["farei", "faresti", "farebbe", "faremmo", "fareste", "farebbero"],
      congiuntivo_presente: ["faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"],
    },
  },
  {
    id: "andare",
    it: "andare",
    en: "to go",
    forms: {
      presente: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
      passato_prossimo: ["sono andato/a", "sei andato/a", "è andato/a", "siamo andati/e", "siete andati/e", "sono andati/e"],
      imperfetto: ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"],
      futuro: ["andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
      condizionale: ["andrei", "andresti", "andrebbe", "andremmo", "andreste", "andrebbero"],
      congiuntivo_presente: ["vada", "vada", "vada", "andiamo", "andiate", "vadano"],
    },
  },
  {
    id: "venire",
    it: "venire",
    en: "to come",
    forms: {
      presente: ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
      passato_prossimo: ["sono venuto/a", "sei venuto/a", "è venuto/a", "siamo venuti/e", "siete venuti/e", "sono venuti/e"],
      imperfetto: ["venivo", "venivi", "veniva", "venivamo", "venivate", "venivano"],
      futuro: ["verrò", "verrai", "verrà", "verremo", "verrete", "verranno"],
      condizionale: ["verrei", "verresti", "verrebbe", "verremmo", "verreste", "verrebbero"],
      congiuntivo_presente: ["venga", "venga", "venga", "veniamo", "veniate", "vengano"],
    },
  },
  {
    id: "parlare",
    it: "parlare",
    en: "to speak",
    forms: {
      presente: ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"],
      passato_prossimo: ["ho parlato", "hai parlato", "ha parlato", "abbiamo parlato", "avete parlato", "hanno parlato"],
      imperfetto: ["parlavo", "parlavi", "parlava", "parlavamo", "parlavate", "parlavano"],
      futuro: ["parlerò", "parlerai", "parlerà", "parleremo", "parlerete", "parleranno"],
      condizionale: ["parlerei", "parleresti", "parlerebbe", "parleremmo", "parlereste", "parlerebbero"],
      congiuntivo_presente: ["parli", "parli", "parli", "parliamo", "parliate", "parlino"],
    },
  },
  {
    id: "mangiare",
    it: "mangiare",
    en: "to eat",
    forms: {
      presente: ["mangio", "mangi", "mangia", "mangiamo", "mangiate", "mangiano"],
      passato_prossimo: ["ho mangiato", "hai mangiato", "ha mangiato", "abbiamo mangiato", "avete mangiato", "hanno mangiato"],
      imperfetto: ["mangiavo", "mangiavi", "mangiava", "mangiavamo", "mangiavate", "mangiavano"],
      futuro: ["mangerò", "mangerai", "mangerà", "mangeremo", "mangerete", "mangeranno"],
      condizionale: ["mangerei", "mangeresti", "mangerebbe", "mangeremmo", "mangereste", "mangerebbero"],
      congiuntivo_presente: ["mangi", "mangi", "mangi", "mangiamo", "mangiate", "mangino"],
    },
  },
  {
    id: "vedere",
    it: "vedere",
    en: "to see",
    forms: {
      presente: ["vedo", "vedi", "vede", "vediamo", "vedete", "vedono"],
      passato_prossimo: ["ho visto", "hai visto", "ha visto", "abbiamo visto", "avete visto", "hanno visto"],
      imperfetto: ["vedevo", "vedevi", "vedeva", "vedevamo", "vedevate", "vedevano"],
      futuro: ["vedrò", "vedrai", "vedrà", "vedremo", "vedrete", "vedranno"],
      condizionale: ["vedrei", "vedresti", "vedrebbe", "vedremmo", "vedreste", "vedrebbero"],
      congiuntivo_presente: ["veda", "veda", "veda", "vediamo", "vediate", "vedano"],
    },
  },
  {
    id: "prendere",
    it: "prendere",
    en: "to take",
    forms: {
      presente: ["prendo", "prendi", "prende", "prendiamo", "prendete", "prendono"],
      passato_prossimo: ["ho preso", "hai preso", "ha preso", "abbiamo preso", "avete preso", "hanno preso"],
      imperfetto: ["prendevo", "prendevi", "prendeva", "prendevamo", "prendevate", "prendevano"],
      futuro: ["prenderò", "prenderai", "prenderà", "prenderemo", "prenderete", "prenderanno"],
      condizionale: ["prenderei", "prenderesti", "prenderebbe", "prenderemmo", "prendereste", "prenderebbero"],
      congiuntivo_presente: ["prenda", "prenda", "prenda", "prendiamo", "prendiate", "prendano"],
    },
  },
  {
    id: "dormire",
    it: "dormire",
    en: "to sleep",
    forms: {
      presente: ["dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"],
      passato_prossimo: ["ho dormito", "hai dormito", "ha dormito", "abbiamo dormito", "avete dormito", "hanno dormito"],
      imperfetto: ["dormivo", "dormivi", "dormiva", "dormivamo", "dormivate", "dormivano"],
      futuro: ["dormirò", "dormirai", "dormirà", "dormiremo", "dormirete", "dormiranno"],
      condizionale: ["dormirei", "dormiresti", "dormirebbe", "dormiremmo", "dormireste", "dormirebbero"],
      congiuntivo_presente: ["dorma", "dorma", "dorma", "dormiamo", "dormiate", "dormano"],
    },
  },
  {
    id: "capire",
    it: "capire",
    en: "to understand",
    forms: {
      presente: ["capisco", "capisci", "capisce", "capiamo", "capite", "capiscono"],
      passato_prossimo: ["ho capito", "hai capito", "ha capito", "abbiamo capito", "avete capito", "hanno capito"],
      imperfetto: ["capivo", "capivi", "capiva", "capivamo", "capivate", "capivano"],
      futuro: ["capirò", "capirai", "capirà", "capiremo", "capirete", "capiranno"],
      condizionale: ["capirei", "capiresti", "capirebbe", "capiremmo", "capireste", "capirebbero"],
      congiuntivo_presente: ["capisca", "capisca", "capisca", "capiamo", "capiate", "capiscano"],
    },
  },
  {
    id: "volere",
    it: "volere",
    en: "to want",
    forms: {
      presente: ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
      passato_prossimo: ["ho voluto", "hai voluto", "ha voluto", "abbiamo voluto", "avete voluto", "hanno voluto"],
      imperfetto: ["volevo", "volevi", "voleva", "volevamo", "volevate", "volevano"],
      futuro: ["vorrò", "vorrai", "vorrà", "vorremo", "vorrete", "vorranno"],
      condizionale: ["vorrei", "vorresti", "vorrebbe", "vorremmo", "vorreste", "vorrebbero"],
      congiuntivo_presente: ["voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"],
    },
  },
  {
    id: "potere",
    it: "potere",
    en: "to be able to / can",
    forms: {
      presente: ["posso", "puoi", "può", "possiamo", "potete", "possono"],
      passato_prossimo: ["ho potuto", "hai potuto", "ha potuto", "abbiamo potuto", "avete potuto", "hanno potuto"],
      imperfetto: ["potevo", "potevi", "poteva", "potevamo", "potevate", "potevano"],
      futuro: ["potrò", "potrai", "potrà", "potremo", "potrete", "potranno"],
      condizionale: ["potrei", "potresti", "potrebbe", "potremmo", "potreste", "potrebbero"],
      congiuntivo_presente: ["possa", "possa", "possa", "possiamo", "possiate", "possano"],
    },
  },
  {
    id: "dovere",
    it: "dovere",
    en: "to have to / must",
    forms: {
      presente: ["devo", "devi", "deve", "dobbiamo", "dovete", "devono"],
      passato_prossimo: ["ho dovuto", "hai dovuto", "ha dovuto", "abbiamo dovuto", "avete dovuto", "hanno dovuto"],
      imperfetto: ["dovevo", "dovevi", "doveva", "dovevamo", "dovevate", "dovevano"],
      futuro: ["dovrò", "dovrai", "dovrà", "dovremo", "dovrete", "dovranno"],
      condizionale: ["dovrei", "dovresti", "dovrebbe", "dovremmo", "dovreste", "dovrebbero"],
      congiuntivo_presente: ["debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"],
    },
  },
];

const STORAGE_KEY = "coniugare-settings-v1";

const DEFAULT_STATE = {
  name: "",
  selectedVerbIds: ["essere", "avere", "fare", "andare", "parlare"],
  selectedFormIds: ["presente"],
  promptLanguage: "both",
  currentRound: null,
};

const els = {
  learnerName: document.querySelector("#learnerName"),
  welcome: document.querySelector("#welcome"),
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
  selectAllForms: document.querySelector("#selectAllForms"),
  clearForms: document.querySelector("#clearForms"),
  promptLanguage: document.querySelector("#promptLanguage"),
  newRound: document.querySelector("#newRound"),
  quizTitle: document.querySelector("#quizTitle"),
  quizSubtitle: document.querySelector("#quizSubtitle"),
  quizForm: document.querySelector("#quizForm"),
  checkAnswers: document.querySelector("#checkAnswers"),
  scoreText: document.querySelector("#scoreText"),
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(DEFAULT_STATE);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...saved,
      selectedVerbIds: (saved.selectedVerbIds || []).filter((id) => VERBS.some((verb) => verb.id === id)),
      selectedFormIds: (saved.selectedFormIds || []).filter((id) => FORMS.some((form) => form.id === id)),
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  return `${verb.it} ${verb.en}`;
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
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", selected.toString());
    button.addEventListener("click", () => onToggle(item.id));

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
}

function renderSettings() {
  els.learnerName.value = state.name;
  els.promptLanguage.value = state.promptLanguage;
  els.welcome.textContent = state.name ? `Ciao, ${state.name}` : "Welcome";
  els.verbCount.textContent = `${state.selectedVerbIds.length} selected`;
  els.formCount.textContent = `${state.selectedFormIds.length} selected`;

  renderChoiceList({
    items: VERBS,
    selectedIds: state.selectedVerbIds,
    query: els.verbSearch.value,
    container: els.verbList,
    getTitle: (verb) => verb.it,
    getSubtitle: (verb) => verb.en,
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

  const verbId = randomFrom(state.selectedVerbIds);
  const formId = randomFrom(state.selectedFormIds);
  state.currentRound = { verbId, formId };
  saveState();
  renderQuiz();

  if (focusFirst) {
    requestAnimationFrame(() => document.querySelector(".answer-input")?.focus());
  }
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
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
  els.quizForm.replaceChildren();
  els.scoreText.textContent = "No answers checked yet.";

  if (!verb || !form) {
    els.quizTitle.textContent = "Ready?";
    els.quizSubtitle.textContent = "Choose at least one verb and one form to start.";
    els.checkAnswers.disabled = true;
    return;
  }

  els.checkAnswers.disabled = false;
  els.quizTitle.textContent = titleFor(verb, form);
  els.quizSubtitle.textContent = subtitleFor(verb, form);

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
    input.placeholder = "conjugation";
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
  const replacement = right.length < left.length ? left.slice(0, left.length - right.length) + right : right;
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
      feedback.textContent = "correct";
    } else {
      feedback.textContent = `→ ${canonicalAnswer(expected[index])}`;
    }
  });

  els.scoreText.textContent = `${correct} / ${PRONOUNS.length} correct`;
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

els.learnerName.addEventListener("input", (event) => {
  state.name = event.target.value.trim();
  saveState();
  renderSettings();
});

els.promptLanguage.addEventListener("change", (event) => {
  state.promptLanguage = event.target.value;
  saveState();
  renderQuiz();
});

els.verbSearch.addEventListener("input", renderSettings);
els.formSearch.addEventListener("input", renderSettings);
els.selectAllVerbs.addEventListener("click", () => selectAll("verbs"));
els.clearVerbs.addEventListener("click", () => clearAll("verbs"));
els.selectAllForms.addEventListener("click", () => selectAll("forms"));
els.clearForms.addEventListener("click", () => clearAll("forms"));
els.verbPicker.addEventListener("toggle", () => {
  if (els.verbPicker.open) els.formPicker.open = false;
});
els.formPicker.addEventListener("toggle", () => {
  if (els.formPicker.open) els.verbPicker.open = false;
});
els.newRound.addEventListener("click", () => newRound());
els.checkAnswers.addEventListener("click", checkAnswers);
els.quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkAnswers();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    checkAnswers();
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
