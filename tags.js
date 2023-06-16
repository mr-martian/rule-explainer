// TODO: some of these should probably be simplified
var TAGS = {
  aa: "Animate",
  abbr: "Abbreviation",
  abe: "Abessive",
  abl: "Ablative",
  acc: "Accusative",
  acr: "Acronym",
  actv: "Active voice",
  ade: "Adessive",
  adj: "Adjective",
  adv: "Adverb",
  aff: "Affirmative",
  agnt: "Agent noun",
  al: "Altres",
  all: "Allative",
  an: "Animate or inanimate",
  ant: "Anthroponym",
  aor: "Aorist",
  apos: "Apostrophe",
  atn: "Atónico",
  atp: "Attachable prefix",
  attr: "Attributive",
  caus: "Causative",
  caus: "Causative voice",
  CD: "Case to be determined",
  cl1: "Noun class 1",
  cl2: "Noun class 2",
  cl3: "Noun class 3",
  cl4: "Noun class 4",
  cl5: "Noun class 5",
  cl6: "Noun class 6",
  cl7: "Noun class 7",
  cl8: "Noun class 8",
  cl9: "Noun class 9",
  cl10: "Noun class 10",
  cl11: "Noun class 11",
  cl12: "Noun class 12",
  clb: "Clause Boundary",
  clt: "Clitic",
  cm: "Comma punctuation",
  cmp: "Compound Noun",
  cni: "Conditional",
  cnjadv: "Conjunctive adverb",
  cnjcoo: "Co-ordinating conjunction",
  cnjsub: "Sub-ordinating conjunction",
  cnt: "Countable",
  cog: "Cognomen",
  coll: "Collective",
  com: "Comitative",
  comp: "Comparative",
  cop: "Copula",
  crd: "Cordial",
  ct: "Count",
  dat: "Dative",
  date: "Dates",
  deb: "Debitive mode",
  def: "Definite",
  dela: "Delative",
  dem: "Demonstrative",
  det: "Determiner",
  detnt: "Neuter determiner",
  dg: "Dative and Genitive",
  dis: "Distributive",
  dst: "Distal",
  du: "Dual",
  el: "Elite",
  email: "Electronic Mail",
  enc: "Enclitic",
  erg: "Ergative",
  ess: "Essive",
  expl: "Syntactic expletive",
  fam: "Familiar",
  f: "Feminine",
  file: "Filenames",
  fm: "Separable verb in main clause",
  fn: "Feminine or neuter",
  frm: "Formal",
  fs: "Separable verb in subordinate clause",
  fti: "Future indicative",
  fts: "Future subjunctive",
  fut: "Future",
  GD: "Gender to be determined",
  gen: "Genitive",
  ger_aor: "Aorist gerund",
  ger_fut: "Future gerund",
  ger: "Gerund",
  ger_hab: "Habitual gerund",
  ger_impf: "Imperfect gerund",
  ger_past: "Past gerund",
  ger_perf: "Perfect gerund",
  ger_pres: "Present gerund",
  gna_aor: "Aorist verbal adverb",
  gna_fut: "Future verbal adverb",
  gna_hab: "Habitual verbal adverb",
  gna_impf: "Imperfect verbal adverb",
  gna_past: "Past verbal adverb",
  gna_perf: "Perfect verbal adverb",
  gna_pres: "Present verbal adverb",
  gna: "Verbal adverb",
  gpr_aor: "Aorist verbal adjective",
  gpr_fut: "Future verbal adjective",
  gpr_hab: "Habitual verbal adjective",
  gpr_impf: "Imperfect verbal adjective",
  gpr_past: "Past verbal adjective",
  gpr_perf: "Perfect verbal adjective",
  gpr_pres: "Present verbal adjective",
  gpr: "Verbal adjective",
  guio: "Hyphen",
  hab: "Habitual",
  hi: "High courtesy",
  hu: "Human",
  hyd: "Hydronym",
  ideo: "Ideophone",
  ifi: "Past definite",
  ij: "Interjection",
  ill: "Illative",
  imperf: "Imperfective",
  impers: "Impersonal",
  impf: "Imperfective",
  imp: "Imperative",
  ind: "Indefinite",
  ine: "Inessive",
  inf: "Infinitive",
  infml: "Informal",
  infps: "Personal infinitive",
  ingr: "Ingressive",
  ins: "Instrumental or Instructive",
  itg: "Interrogative",
  itg: "Interrogative",
  ito: "Infinitive with 'to'",
  iv: "Intransitive",
  loc: "Locative",
  log: "Logophoric",
  low: "Low courtesy",
  lpar: "Left parenthesis",
  lp: "L-participle",
  lquest: "Left question/exclamation mark",
  lquot: "Left quote",
  maj: "Large script in which every letter is the same height",
  ma: "Masculine (animate)",
  med: "Medial",
  mf: "Masculine or feminine",
  mfn: "Masculine , feminine , neuter",
  mid: "Mid courtesy",
  midv: "Middle voice",
  mi: "Masculine (inanimate)",
  min: "small script in which every letter is the same height",
  m: "Masculine",
  mn: "Masculine or neuter",
  mod: "Modal word",
  mon: "Money",
  mp: "Masculine (personal)",
  nactv: "Non-active voice",
  ND: "Number to be determined",
  neg: "Negative",
  nn: "Inanimate",
  n: "Noun",
  nom: "Nominative",
  nonpast: "Non-past",
  np: "Proper noun",
  nspc: "Non-sepecific",
  nt: "Neuter",
  num: "Numeral",
  obj: "Object",
  obl: "Oblique",
  o_pl1: "First person plural object",
  o_pl2: "Second person plural object",
  o_pl3: "Third person plural object",
  ord: "Ordinal",
  org: "Organisation",
  o_sg1: "First person singular object",
  o_sg2: "Second person singular object",
  o_sg3: "Third person singular object",
  p1: "First person",
  p2: "Second person",
  p3: "Third person",
  par: "Partitive",
  pass: "Passive voice",
  past3p: "Past third person",
  past: "Past",
  pasv: "Passive voice",
  pat: "Patronymic",
  percent: "Percentage",
  percent: "Percentage",
  perf: "Perfective",
  pers: "Personal",
  pii: "Imperfect",
  pis: "Imperfect subjunctive",
  pl: "Plural",
  plu: "Pluperfect",
  pmp: "Pluperfect",
  pol: "Polite",
  pos: "Possessive",
  postadv: "Post-adverb",
  post: "Postposition",
  pp2: "Past participle (???)",
  pp3: "Past participle (???)",
  pp: "Past participle",
  ppres: "Present participle",
  pprs: "Present participle",
  prc_aor: "Aorist participle",
  prc_fut: "Future participle",
  prc_hab: "Habitual participle",
  prc_impf: "Imperfect participle",
  prc_past: "Past participle",
  prc_perf: "Perfect participle",
  prc_pres: "Present participle",
  preadj_nh: "Pre-adjective if not human",
  preadj: "Pre-adjective",
  preadv: "Pre-adverb",
  predet: "Pre determiner",
  pred: "Predicative",
  pres: "Present",
  pret: "Preterite",
  pri: "Present indicative",
  prl: "Prolative",
  prn: "Pronoun",
  pro: "Proclitic",
  prp: "Prepositional",
  pr: "Preposition",
  prs: "Present subjunctive",
  prx: "Proximate",
  pst: "Positive",
  punct: "Punctuation",
  px1pl: "First person plural possessive",
  px1sg: "First person singular possessive",
  px2pl: "Second person plural possessive",
  px2sg: "Second person singular possessive",
  px3pl: "Third person plural possessive",
  px3sg: "Third person singular possessive",
  px3sp: "Third person possessive singular or plural",
  qnt: "Quantifier",
  quot: "Quotation",
  rec: "Reciprocal Pronoun",
  ref: "Reflexive",
  rel: "Relative",
  res: "Reciprocal Pronoun",
  rpar: "Right parenthesis",
  rquot: "Right quote",
  sent: "Sentence-ending punctuation",
  sep: "Separable verb",
  ses: "Superessive",
  sg: "Singular",
  sint: "Synthetic",
  soc: "Sociative",
  spc: "Specific",
  s_pl1: "First person plural object",
  s_pl2: "Second person plural object",
  s_pl3: "Third person plural object",
  sp: "Singular or plural",
  s_sg1: "First person singular object",
  s_sg2: "Second person singular object",
  s_sg3: "Third person singular object",
  subj: "Subject",
  sub: "Sublative",
  subs: "Verbal Noun or Verbal Substantive",
  supn: "Supine",
  sup: "Superlative",
  TD: "Transitivity to be determined",
  temp: "Temporal",
  term: "Terminative",
  time: "Time",
  tn: "Tónico",
  top: "Toponym",
  tra: "Translative",
  tv: "Transitive",
  un: "Common or neuter",
  unc: "Uncountable (mass)",
  url: "Web address",
  ut: "Common",
  vaux: "Auxiliary verb",
  vbdo: "Verb \"to do\"",
  vbhaver: "Verb \"to have\"",
  vblex: "Standard (\"lexical\") verb",
  vbmod: "Modal verb",
  vbser: "Verb \"to be\"",
  voc: "Vocative",
  v: "Standard verb",
  web: "Links and Emails",
  year: "Years",
};

var RTX_TAG_QUERY = `
(attr_rule name: (ident) [(ident) (string)] @tag)
(attr_pair [(ident) (string)] @tag)
(lit_tag (ident) @tag)
(output_rule pos: (ident) @tag)
(clip val: (ident) @tag) ; may include list names
(pattern_element pos: (ident) @tag)
(pattern_element "." . [(ident) (string)] @tag)
(string) @tag
`;
