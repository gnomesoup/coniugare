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

const VERB_DATA = [
  { id: "essere", it: "essere", en: "to be", irregular: true, aux: "essere", participle: "stato" },
  { id: "avere", it: "avere", en: "to have", irregular: true, aux: "avere", participle: "avuto" },
  { id: "fare", it: "fare", en: "to do / make", irregular: true, aux: "avere", participle: "fatto" },
  { id: "dire", it: "dire", en: "to say / tell", irregular: true, aux: "avere", participle: "detto" },
  { id: "potere", it: "potere", en: "can / to be able to", irregular: true, aux: "avere", participle: "potuto" },
  { id: "volere", it: "volere", en: "to want", irregular: true, aux: "avere", participle: "voluto" },
  { id: "dovere", it: "dovere", en: "must / to have to", irregular: true, aux: "avere", participle: "dovuto" },
  { id: "sapere", it: "sapere", en: "to know", irregular: true, aux: "avere", participle: "saputo" },
  { id: "stare", it: "stare", en: "to stay / be", irregular: true, aux: "avere", participle: "stato" },
  { id: "andare", it: "andare", en: "to go", irregular: true, aux: "essere", participle: "andato" },
  { id: "venire", it: "venire", en: "to come", irregular: true, aux: "essere", participle: "venuto" },
  { id: "dare", it: "dare", en: "to give", irregular: true, aux: "avere", participle: "dato" },
  { id: "vedere", it: "vedere", en: "to see", irregular: true, aux: "avere", participle: "visto" },
  { id: "parlare", it: "parlare", en: "to speak", irregular: false, aux: "avere", participle: "parlato" },
  { id: "trovare", it: "trovare", en: "to find", irregular: false, aux: "avere", participle: "trovato" },
  { id: "prendere", it: "prendere", en: "to take", irregular: true, aux: "avere", participle: "preso" },
  { id: "mettere", it: "mettere", en: "to put", irregular: true, aux: "avere", participle: "messo" },
  { id: "pensare", it: "pensare", en: "to think", irregular: false, aux: "avere", participle: "pensato" },
  { id: "lasciare", it: "lasciare", en: "to leave / let", irregular: false, aux: "avere", participle: "lasciato" },
  { id: "guardare", it: "guardare", en: "to watch / look at", irregular: false, aux: "avere", participle: "guardato" },
  { id: "chiamare", it: "chiamare", en: "to call", irregular: false, aux: "avere", participle: "chiamato" },
  { id: "arrivare", it: "arrivare", en: "to arrive", irregular: false, aux: "essere", participle: "arrivato" },
  { id: "passare", it: "passare", en: "to pass / spend time", irregular: false, aux: "avere", participle: "passato" },
  { id: "credere", it: "credere", en: "to believe", irregular: false, aux: "avere", participle: "creduto" },
  { id: "portare", it: "portare", en: "to bring / wear", irregular: false, aux: "avere", participle: "portato" },
  { id: "uscire", it: "uscire", en: "to go out", irregular: true, aux: "essere", participle: "uscito" },
  { id: "tornare", it: "tornare", en: "to return", irregular: false, aux: "essere", participle: "tornato" },
  { id: "sentire", it: "sentire", en: "to hear / feel", irregular: false, aux: "avere", participle: "sentito" },
  { id: "vivere", it: "vivere", en: "to live", irregular: true, aux: "avere", participle: "vissuto" },
  { id: "morire", it: "morire", en: "to die", irregular: true, aux: "essere", participle: "morto" },
  { id: "capire", it: "capire", en: "to understand", irregular: false, aux: "avere", participle: "capito", isc: true },
  { id: "mangiare", it: "mangiare", en: "to eat", irregular: false, aux: "avere", participle: "mangiato" },
  { id: "bere", it: "bere", en: "to drink", irregular: true, aux: "avere", participle: "bevuto" },
  { id: "aspettare", it: "aspettare", en: "to wait for", irregular: false, aux: "avere", participle: "aspettato" },
  { id: "cercare", it: "cercare", en: "to look for / search", irregular: false, aux: "avere", participle: "cercato" },
  { id: "entrare", it: "entrare", en: "to enter", irregular: false, aux: "essere", participle: "entrato" },
  { id: "lavorare", it: "lavorare", en: "to work", irregular: false, aux: "avere", participle: "lavorato" },
  { id: "scrivere", it: "scrivere", en: "to write", irregular: true, aux: "avere", participle: "scritto" },
  { id: "leggere", it: "leggere", en: "to read", irregular: true, aux: "avere", participle: "letto" },
  { id: "perdere", it: "perdere", en: "to lose", irregular: true, aux: "avere", participle: "perso" },
  { id: "chiedere", it: "chiedere", en: "to ask", irregular: true, aux: "avere", participle: "chiesto" },
  { id: "rispondere", it: "rispondere", en: "to answer", irregular: true, aux: "avere", participle: "risposto" },
  { id: "chiudere", it: "chiudere", en: "to close", irregular: true, aux: "avere", participle: "chiuso" },
  { id: "aprire", it: "aprire", en: "to open", irregular: true, aux: "avere", participle: "aperto" },
  { id: "conoscere", it: "conoscere", en: "to know / meet", irregular: false, aux: "avere", participle: "conosciuto" },
  { id: "comprare", it: "comprare", en: "to buy", irregular: false, aux: "avere", participle: "comprato" },
  { id: "studiare", it: "studiare", en: "to study", irregular: false, aux: "avere", participle: "studiato" },
  { id: "giocare", it: "giocare", en: "to play", irregular: false, aux: "avere", participle: "giocato" },
  { id: "pagare", it: "pagare", en: "to pay", irregular: false, aux: "avere", participle: "pagato" },
  { id: "cominciare", it: "cominciare", en: "to begin", irregular: false, aux: "avere", participle: "cominciato" },
  { id: "finire", it: "finire", en: "to finish", irregular: false, aux: "avere", participle: "finito", isc: true },
  { id: "preferire", it: "preferire", en: "to prefer", irregular: false, aux: "avere", participle: "preferito", isc: true },
  { id: "dormire", it: "dormire", en: "to sleep", irregular: false, aux: "avere", participle: "dormito" },
  { id: "partire", it: "partire", en: "to leave / depart", irregular: false, aux: "essere", participle: "partito" },
  { id: "restare", it: "restare", en: "to remain / stay", irregular: false, aux: "essere", participle: "restato" },
  { id: "abitare", it: "abitare", en: "to live / reside", irregular: false, aux: "avere", participle: "abitato" },
  { id: "ascoltare", it: "ascoltare", en: "to listen to", irregular: false, aux: "avere", participle: "ascoltato" },
  { id: "usare", it: "usare", en: "to use", irregular: false, aux: "avere", participle: "usato" },
  { id: "piacere", it: "piacere", en: "to please / like", irregular: true, aux: "essere", participle: "piaciuto" },
  { id: "sembrare", it: "sembrare", en: "to seem", irregular: false, aux: "essere", participle: "sembrato" },
  { id: "tenere", it: "tenere", en: "to hold / keep", irregular: true, aux: "avere", participle: "tenuto" },
  { id: "riuscire", it: "riuscire", en: "to manage / succeed", irregular: true, aux: "essere", participle: "riuscito" },
  { id: "rimanere", it: "rimanere", en: "to remain", irregular: true, aux: "essere", participle: "rimasto" },
  { id: "cadere", it: "cadere", en: "to fall", irregular: true, aux: "essere", participle: "caduto" },
  { id: "scegliere", it: "scegliere", en: "to choose", irregular: true, aux: "avere", participle: "scelto" },
  { id: "nascere", it: "nascere", en: "to be born", irregular: true, aux: "essere", participle: "nato" },
  { id: "crescere", it: "crescere", en: "to grow", irregular: true, aux: "avere", participle: "cresciuto" },
  { id: "correre", it: "correre", en: "to run", irregular: true, aux: "avere", participle: "corso" },
  { id: "ridere", it: "ridere", en: "to laugh", irregular: true, aux: "avere", participle: "riso" },
  { id: "vincere", it: "vincere", en: "to win", irregular: true, aux: "avere", participle: "vinto" },
  { id: "offrire", it: "offrire", en: "to offer", irregular: true, aux: "avere", participle: "offerto" },
  { id: "produrre", it: "produrre", en: "to produce", irregular: true, aux: "avere", participle: "prodotto" },
  { id: "spiegare", it: "spiegare", en: "to explain", irregular: false, aux: "avere", participle: "spiegato" },
  { id: "seguire", it: "seguire", en: "to follow", irregular: false, aux: "avere", participle: "seguito" },
  { id: "servire", it: "servire", en: "to serve / be useful", irregular: false, aux: "avere", participle: "servito" },
  { id: "ricevere", it: "ricevere", en: "to receive", irregular: false, aux: "avere", participle: "ricevuto" },
  { id: "amare", it: "amare", en: "to love", irregular: false, aux: "avere", participle: "amato" },
  { id: "aiutare", it: "aiutare", en: "to help", irregular: false, aux: "avere", participle: "aiutato" },
  { id: "ricordare", it: "ricordare", en: "to remember", irregular: false, aux: "avere", participle: "ricordato" },
  { id: "dimenticare", it: "dimenticare", en: "to forget", irregular: false, aux: "avere", participle: "dimenticato" },
  { id: "provare", it: "provare", en: "to try", irregular: false, aux: "avere", participle: "provato" },
  { id: "cambiare", it: "cambiare", en: "to change", irregular: false, aux: "avere", participle: "cambiato" },
  { id: "continuare", it: "continuare", en: "to continue", irregular: false, aux: "avere", participle: "continuato" },
  { id: "iniziare", it: "iniziare", en: "to start", irregular: false, aux: "avere", participle: "iniziato" },
  { id: "diventare", it: "diventare", en: "to become", irregular: false, aux: "essere", participle: "diventato" },
  { id: "creare", it: "creare", en: "to create", irregular: false, aux: "avere", participle: "creato" },
  { id: "incontrare", it: "incontrare", en: "to meet", irregular: false, aux: "avere", participle: "incontrato" },
  { id: "mostrare", it: "mostrare", en: "to show", irregular: false, aux: "avere", participle: "mostrato" },
  { id: "succedere", it: "succedere", en: "to happen", irregular: true, aux: "essere", participle: "successo" },
  { id: "esistere", it: "esistere", en: "to exist", irregular: false, aux: "essere", participle: "esistito" },
  { id: "telefonare", it: "telefonare", en: "to phone", irregular: false, aux: "avere", participle: "telefonato" },
  { id: "viaggiare", it: "viaggiare", en: "to travel", irregular: false, aux: "avere", participle: "viaggiato" },
  { id: "camminare", it: "camminare", en: "to walk", irregular: false, aux: "avere", participle: "camminato" },
  { id: "vendere", it: "vendere", en: "to sell", irregular: false, aux: "avere", participle: "venduto" },
  { id: "decidere", it: "decidere", en: "to decide", irregular: true, aux: "avere", participle: "deciso" },
  { id: "permettere", it: "permettere", en: "to allow", irregular: true, aux: "avere", participle: "permesso" },
  { id: "accadere", it: "accadere", en: "to happen / occur", irregular: false, aux: "essere", participle: "accaduto" },
  { id: "ottenere", it: "ottenere", en: "to obtain", irregular: true, aux: "avere", participle: "ottenuto" },
  { id: "riconoscere", it: "riconoscere", en: "to recognize", irregular: false, aux: "avere", participle: "riconosciuto" },
  { id: "costruire", it: "costruire", en: "to build", irregular: false, aux: "avere", participle: "costruito", isc: true },
];

const IRREGULAR_FORMS = {
  essere: {
    presente: ["sono", "sei", "è", "siamo", "siete", "sono"],
    passato_prossimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
    imperfetto: ["ero", "eri", "era", "eravamo", "eravate", "erano"],
    futuro: ["sarò", "sarai", "sarà", "saremo", "sarete", "saranno"],
    condizionale: ["sarei", "saresti", "sarebbe", "saremmo", "sareste", "sarebbero"],
    congiuntivo_presente: ["sia", "sia", "sia", "siamo", "siate", "siano"],
  },
  avere: {
    presente: ["ho", "hai", "ha", "abbiamo", "avete", "hanno"],
    futuro: ["avrò", "avrai", "avrà", "avremo", "avrete", "avranno"],
    condizionale: ["avrei", "avresti", "avrebbe", "avremmo", "avreste", "avrebbero"],
    congiuntivo_presente: ["abbia", "abbia", "abbia", "abbiamo", "abbiate", "abbiano"],
  },
  fare: {
    presente: ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
    imperfetto: ["facevo", "facevi", "faceva", "facevamo", "facevate", "facevano"],
    futuro: ["farò", "farai", "farà", "faremo", "farete", "faranno"],
    condizionale: ["farei", "faresti", "farebbe", "faremmo", "fareste", "farebbero"],
    congiuntivo_presente: ["faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"],
  },
  dire: {
    presente: ["dico", "dici", "dice", "diciamo", "dite", "dicono"],
    imperfetto: ["dicevo", "dicevi", "diceva", "dicevamo", "dicevate", "dicevano"],
    futuro: ["dirò", "dirai", "dirà", "diremo", "direte", "diranno"],
    condizionale: ["direi", "diresti", "direbbe", "diremmo", "direste", "direbbero"],
    congiuntivo_presente: ["dica", "dica", "dica", "diciamo", "diciate", "dicano"],
  },
  potere: {
    presente: ["posso", "puoi", "può", "possiamo", "potete", "possono"],
    futuro: ["potrò", "potrai", "potrà", "potremo", "potrete", "potranno"],
    condizionale: ["potrei", "potresti", "potrebbe", "potremmo", "potreste", "potrebbero"],
    congiuntivo_presente: ["possa", "possa", "possa", "possiamo", "possiate", "possano"],
  },
  volere: {
    presente: ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
    futuro: ["vorrò", "vorrai", "vorrà", "vorremo", "vorrete", "vorranno"],
    condizionale: ["vorrei", "vorresti", "vorrebbe", "vorremmo", "vorreste", "vorrebbero"],
    congiuntivo_presente: ["voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"],
  },
  dovere: {
    presente: ["devo", "devi", "deve", "dobbiamo", "dovete", "devono"],
    futuro: ["dovrò", "dovrai", "dovrà", "dovremo", "dovrete", "dovranno"],
    condizionale: ["dovrei", "dovresti", "dovrebbe", "dovremmo", "dovreste", "dovrebbero"],
    congiuntivo_presente: ["debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"],
  },
  sapere: {
    presente: ["so", "sai", "sa", "sappiamo", "sapete", "sanno"],
    futuro: ["saprò", "saprai", "saprà", "sapremo", "saprete", "sapranno"],
    condizionale: ["saprei", "sapresti", "saprebbe", "sapremmo", "sapreste", "saprebbero"],
    congiuntivo_presente: ["sappia", "sappia", "sappia", "sappiamo", "sappiate", "sappiano"],
  },
  stare: {
    presente: ["sto", "stai", "sta", "stiamo", "state", "stanno"],
    futuro: ["starò", "starai", "starà", "staremo", "starete", "staranno"],
    condizionale: ["starei", "staresti", "starebbe", "staremmo", "stareste", "starebbero"],
    congiuntivo_presente: ["stia", "stia", "stia", "stiamo", "stiate", "stiano"],
  },
  andare: {
    presente: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
    futuro: ["andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
    condizionale: ["andrei", "andresti", "andrebbe", "andremmo", "andreste", "andrebbero"],
    congiuntivo_presente: ["vada", "vada", "vada", "andiamo", "andiate", "vadano"],
  },
  venire: {
    presente: ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
    futuro: ["verrò", "verrai", "verrà", "verremo", "verrete", "verranno"],
    condizionale: ["verrei", "verresti", "verrebbe", "verremmo", "verreste", "verrebbero"],
    congiuntivo_presente: ["venga", "venga", "venga", "veniamo", "veniate", "vengano"],
  },
  dare: {
    presente: ["do", "dai", "dà", "diamo", "date", "danno"],
    futuro: ["darò", "darai", "darà", "daremo", "darete", "daranno"],
    condizionale: ["darei", "daresti", "darebbe", "daremmo", "dareste", "darebbero"],
    congiuntivo_presente: ["dia", "dia", "dia", "diamo", "diate", "diano"],
  },
  vedere: {
    futuro: ["vedrò", "vedrai", "vedrà", "vedremo", "vedrete", "vedranno"],
    condizionale: ["vedrei", "vedresti", "vedrebbe", "vedremmo", "vedreste", "vedrebbero"],
    congiuntivo_presente: ["veda", "veda", "veda", "vediamo", "vediate", "vedano"],
  },
  uscire: {
    presente: ["esco", "esci", "esce", "usciamo", "uscite", "escono"],
    congiuntivo_presente: ["esca", "esca", "esca", "usciamo", "usciate", "escano"],
  },
  vivere: {
    futuro: ["vivrò", "vivrai", "vivrà", "vivremo", "vivrete", "vivranno"],
    condizionale: ["vivrei", "vivresti", "vivrebbe", "vivremmo", "vivreste", "vivrebbero"],
  },
  morire: {
    presente: ["muoio", "muori", "muore", "moriamo", "morite", "muoiono"],
    congiuntivo_presente: ["muoia", "muoia", "muoia", "moriamo", "moriate", "muoiano"],
  },
  bere: {
    presente: ["bevo", "bevi", "beve", "beviamo", "bevete", "bevono"],
    imperfetto: ["bevevo", "bevevi", "beveva", "bevevamo", "bevevate", "bevevano"],
    futuro: ["berrò", "berrai", "berrà", "berremo", "berrete", "berranno"],
    condizionale: ["berrei", "berresti", "berrebbe", "berremmo", "berreste", "berrebbero"],
    congiuntivo_presente: ["beva", "beva", "beva", "beviamo", "beviate", "bevano"],
  },
  piacere: {
    presente: ["piaccio", "piaci", "piace", "piacciamo", "piacete", "piacciono"],
    congiuntivo_presente: ["piaccia", "piaccia", "piaccia", "piacciamo", "piacciate", "piacciano"],
  },
  tenere: {
    presente: ["tengo", "tieni", "tiene", "teniamo", "tenete", "tengono"],
    futuro: ["terrò", "terrai", "terrà", "terremo", "terrete", "terranno"],
    condizionale: ["terrei", "terresti", "terrebbe", "terremmo", "terreste", "terrebbero"],
    congiuntivo_presente: ["tenga", "tenga", "tenga", "teniamo", "teniate", "tengano"],
  },
  riuscire: {
    presente: ["riesco", "riesci", "riesce", "riusciamo", "riuscite", "riescono"],
    congiuntivo_presente: ["riesca", "riesca", "riesca", "riusciamo", "riusciate", "riescano"],
  },
  rimanere: {
    presente: ["rimango", "rimani", "rimane", "rimaniamo", "rimanete", "rimangono"],
    futuro: ["rimarrò", "rimarrai", "rimarrà", "rimarremo", "rimarrete", "rimarranno"],
    condizionale: ["rimarrei", "rimarresti", "rimarrebbe", "rimarremmo", "rimarreste", "rimarrebbero"],
    congiuntivo_presente: ["rimanga", "rimanga", "rimanga", "rimaniamo", "rimaniate", "rimangano"],
  },
  cadere: {
    futuro: ["cadrò", "cadrai", "cadrà", "cadremo", "cadrete", "cadranno"],
    condizionale: ["cadrei", "cadresti", "cadrebbe", "cadremmo", "cadreste", "cadrebbero"],
  },
  scegliere: {
    presente: ["scelgo", "scegli", "sceglie", "scegliamo", "scegliete", "scelgono"],
    congiuntivo_presente: ["scelga", "scelga", "scelga", "scegliamo", "scegliate", "scelgano"],
  },
  nascere: {
    presente: ["nasco", "nasci", "nasce", "nasciamo", "nascete", "nascono"],
    futuro: ["nascerò", "nascerai", "nascerà", "nasceremo", "nascerete", "nasceranno"],
    congiuntivo_presente: ["nasca", "nasca", "nasca", "nasciamo", "nasciate", "nascano"],
  },
  crescere: {
    presente: ["cresco", "cresci", "cresce", "cresciamo", "crescete", "crescono"],
    congiuntivo_presente: ["cresca", "cresca", "cresca", "cresciamo", "cresciate", "crescano"],
  },
  vincere: {
    presente: ["vinco", "vinci", "vince", "vinciamo", "vincete", "vincono"],
    congiuntivo_presente: ["vinca", "vinca", "vinca", "vinciamo", "vinciate", "vincano"],
  },
  produrre: {
    presente: ["produco", "produci", "produce", "produciamo", "producete", "producono"],
    imperfetto: ["producevo", "producevi", "produceva", "producevamo", "producevate", "producevano"],
    futuro: ["produrrò", "produrrai", "produrrà", "produrremo", "produrrete", "produrranno"],
    condizionale: ["produrrei", "produrresti", "produrrebbe", "produrremmo", "produrreste", "produrrebbero"],
    congiuntivo_presente: ["produca", "produca", "produca", "produciamo", "produciate", "producano"],
  },
};

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
    if (stem.endsWith("i")) stem = stem.slice(0, -1);
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
  doneVerbs: document.querySelector("#doneVerbs"),
  selectAllForms: document.querySelector("#selectAllForms"),
  clearForms: document.querySelector("#clearForms"),
  doneForms: document.querySelector("#doneForms"),
  promptLanguage: document.querySelector("#promptLanguage"),
  newRound: document.querySelector("#newRound"),
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
  setAnswersChecked(true, { hasMistakes: correct < PRONOUNS.length });
  requestAnimationFrame(() => els.checkAnswers.focus());
}

function clearRound({ focusFirst = true } = {}) {
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
els.newRound.addEventListener("click", () => clearRound());
els.nextRound.addEventListener("click", () => newRound());
els.checkAnswers.addEventListener("click", () => {
  if (!answersChecked) checkAnswers();
  else if (checkedHasMistakes) clearRound();
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
  if (event.key !== "Enter" || event.isComposing || !event.target.classList.contains("answer-input")) return;

  event.preventDefault();

  const inputs = [...els.quizForm.querySelectorAll(".answer-input")];
  const allFilled = inputs.every((input) => input.value.trim());

  if (allFilled) {
    if (!answersChecked) checkAnswers();
    else if (checkedHasMistakes) clearRound();
    else newRound();
    return;
  }

  const currentIndex = inputs.indexOf(event.target);
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
    else if (checkedHasMistakes) clearRound();
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
