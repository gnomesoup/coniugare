const AVERE_PRESENTE = ["ho", "hai", "ha", "abbiamo", "avete", "hanno"];
const ESSERE_PRESENTE = ["sono", "sei", "è", "siamo", "siete", "sono"];
const FUTURE_ENDINGS = ["ò", "ai", "à", "emo", "ete", "anno"];
const CONDITIONAL_ENDINGS = ["ei", "esti", "ebbe", "emmo", "este", "ebbero"];

function regularConjugations(verb) {
  return {
    presente: regularPresente(verb),
    passato_prossimo: passatoProssimo(verb),
    imperfetto: regularImperfetto(verb),
    futuro: regularFuturo(verb),
    condizionale: regularCondizionale(verb),
    congiuntivo_presente: regularCongiuntivoPresente(verb),
  };
}

function verbEnding(infinitive) {
  return infinitive.slice(-3);
}

function verbStem(infinitive) {
  return infinitive.slice(0, -3);
}

function joinStem(stem, ending) {
  return stem.endsWith("i") && ending.startsWith("i") ? stem.slice(0, -1) + ending : stem + ending;
}

function hardCOrGStem(stem, ending) {
  if (!/^[ie]/.test(ending)) return stem;
  if (stem.endsWith("c") || stem.endsWith("g")) return `${stem}h`;
  return stem;
}

function regularPresente(verb) {
  const ending = verbEnding(verb.it);
  const stem = verbStem(verb.it);
  if (ending === "are") {
    return ["o", "i", "a", "iamo", "ate", "ano"].map((suffix) => joinStem(hardCOrGStem(stem, suffix), suffix));
  }
  if (ending === "ere") {
    return ["o", "i", "e", "iamo", "ete", "ono"].map((suffix) => joinStem(stem, suffix));
  }
  if (verb.isc) {
    return [`${stem}isco`, `${stem}isci`, `${stem}isce`, `${stem}iamo`, `${stem}ite`, `${stem}iscono`];
  }
  return ["o", "i", "e", "iamo", "ite", "ono"].map((suffix) => joinStem(stem, suffix));
}

function regularImperfetto(verb) {
  const ending = verbEnding(verb.it);
  const stem = verbStem(verb.it);
  const vowel = ending === "are" ? "a" : ending === "ere" ? "e" : "i";
  return ["vo", "vi", "va", "vamo", "vate", "vano"].map((suffix) => `${stem}${vowel}${suffix}`);
}

function futureStem(verb) {
  const ending = verbEnding(verb.it);
  let stem = verbStem(verb.it);
  if (ending === "ire") return `${stem}ir`;
  if (ending === "are") {
    if (stem.endsWith("c") || stem.endsWith("g")) return `${stem}her`;
    if (stem.endsWith("ci") || stem.endsWith("gi")) stem = stem.slice(0, -1);
  }
  return `${stem}er`;
}

function regularFuturo(verb) {
  const stem = futureStem(verb);
  return FUTURE_ENDINGS.map((ending) => `${stem}${ending}`);
}

function regularCondizionale(verb) {
  const stem = futureStem(verb);
  return CONDITIONAL_ENDINGS.map((ending) => `${stem}${ending}`);
}

function regularCongiuntivoPresente(verb) {
  const ending = verbEnding(verb.it);
  const stem = verbStem(verb.it);
  if (ending === "are") {
    return ["i", "i", "i", "iamo", "iate", "ino"].map((suffix) => joinStem(hardCOrGStem(stem, suffix), suffix));
  }
  if (verb.isc) {
    return [`${stem}isca`, `${stem}isca`, `${stem}isca`, `${stem}iamo`, `${stem}iate`, `${stem}iscano`];
  }
  return ["a", "a", "a", "iamo", "iate", "ano"].map((suffix) => joinStem(stem, suffix));
}

function passatoProssimo(verb) {
  const aux = verb.aux === "essere" ? ESSERE_PRESENTE : AVERE_PRESENTE;
  if (verb.aux !== "essere") return aux.map((helper) => `${helper} ${verb.participle}`);

  const singular = verb.participle.endsWith("o") ? `${verb.participle}/a` : verb.participle;
  const plural = verb.participle.endsWith("o") ? `${verb.participle.slice(0, -1)}i/e` : verb.participle;
  return [`${aux[0]} ${singular}`, `${aux[1]} ${singular}`, `${aux[2]} ${singular}`, `${aux[3]} ${plural}`, `${aux[4]} ${plural}`, `${aux[5]} ${plural}`];
}

function buildVerb(verb) {
  return {
    ...verb,
    forms: {
      ...regularConjugations(verb),
      ...(IRREGULAR_FORMS[verb.id] || {}),
    },
  };
}

const VERBS = VERB_DATA.map(buildVerb);
