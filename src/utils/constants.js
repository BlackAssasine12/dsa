export const defaultCharacter = {
  charakterInfo: {
    name: "",
    alter: "",
    geschlecht: "",
    rasse: "",
    klasse: "",
    größe: "",
    gewicht: "",
    haarfarbe: "",
    augenfarbe: "",
    titel: ""
  },
  werte: {
    level: 0,
    xp: 0,
    Steigerungspunkte: 0,
    Gesteigerte: 0
  },
  geld: {
    wInsg: 0,
    dukaten: 0,
    silber: 0,
    heller: 0,
    kreuzer: 0
  },
  Magische_Elemente: {
    Feuer: 0,
    Wasser: 0,
    Erde: 0,
    Luft: 0,
    Natur: 0,
    Heilung: 0,
    Dunkle: 0,
    Helle: 0,
    Schatten: 0,
    Licht: 0,
    Holz: 0,
    Metall: 0,
    Eis: 0,
    Leben: 0,
    Nekromantie: 0,
    Blitz: 0,
    Blut: 0,
    Gravitation: 0,
    Erschaffung: 0,
    Raumzeit: 0
  },
  fähigkeiten: {
    modifier: {
      magie:0,
      asp:0,
      lp:0,
      fernkampf:0,
      nahkampf:0,
      gift:0,
      stealth:0
    },
    attribute: {
      Konstitution: 9,
      Körperkraft: 9,
      Gewandheit: 9,
      Klugheit: 9,
      Intuition: 9,
      Geschicklichkeit: 9,
      Tarnung: 9,
      Fingerfertigkeit: 9,
      Sinnesschärfe: 9,
      Charisma: 9,
      Willenskraft: 9
    },
    sonderwerte: {
      "Aktuelle LP": 0,
      "Maximale LP": 0,
      "Ausdauer": 0,
      "Maximale Ausdauer": 0,
      "Astralenergie": 0,
      "Maximale Astralenergie": 0,
      "Magiebegabung": 0,
      "Magieresistenz": 0,
      "Giftresistenz": 0,
      "Schnelligkeit": 0
    },
    KampfBasiswerte: {
      "Wurfwaffen Basiswert": 9,
      "Schusswaffen Basiswert": 9,
      "Attacke Basiswert": 8,
      "Parade Basiswert": 8
    },
    Kampf_Talente: {
      "Zweihand Schwerter": [0, 0, 0],
      "Einhand Schwerter": [0, 0, 0],
      "Schild": [0, 0, 0],
      "Stichwaffen": [0, 0, 0],
      "Stumpfe Waffen": [0, 0, 0],
      "Schwere Waffen": [0, 0, 0],
      "Versteckte Klingen": [0, 0, 0],
      "Messer/Dolche": [0, 0, 0],
      "Flexible Nahkampfwaffen": [0, 0, 0],
      "Waffenlos": [0, 0, 0],
      "Pfeilwaffen": [0, 0, 0],
      "Bolzenwaffen": [0, 0, 0],
      "Wurfwaffen": [0, 0, 0]
    }
  }
};

export const defaultShopData = {
  "Waffenzubehör": [
    { "Item": "Schwertgürtel", "Preis": 2, "Währung": "Silber" },
    { "Item": "Beingurt", "Preis": 1, "Währung": "Silber" },
    { "Item": "Dolchscheide", "Preis": 8, "Währung": "Heller" }
  ],
  "Munition": [
    { "Item": "Pfeile (5 Stück)", "Preis": 5, "Währung": "Heller" },
    { "Item": "Bolzen (5 Stück)", "Preis": 8, "Währung": "Heller" },
    { "Item": "Wurfmesser", "Preis": 8, "Währung": "Silber" }
  ],
  "Beleuchtung": [
    { "Item": "Kerze, 1 Spann", "Preis": 2, "Währung": "Heller" },
    { "Item": "Pechfackel", "Preis": 5, "Währung": "Heller" },
    { "Item": "Öllampe", "Preis": 1, "Währung": "Silber" },
    { "Item": "Lampen Öl ~1h", "Preis": 5, "Währung": "Heller" }
  ],
  "Ausrüstung": [
    { "Item": "Lederrucksack", "Preis": 5, "Währung": "Silber" },
    { "Item": "Seil (20m)", "Preis": 5, "Währung": "Silber" },
    { "Item": "Wasserschlauch", "Preis": 2, "Währung": "Silber" },
    { "Item": "Zelt (2 Personen)", "Preis": 1, "Währung": "Dukaten" }
  ]
};

export const defaultDropdowns = {
  "rassen": [
    {
      label: "Menschen",
      options: [
        { value: "Mittelreicher", label: "Mittelreicher" },
        { value: "Thorwaler", label: "Thorwaler" },
        { value: "Tulamide", label: "Tulamide" }
      ]
    },
    {
      label: "Elfen",
      options: [
        { value: "Waldelfen", label: "Waldelfen" },
        { value: "Steppenelfen", label: "Steppenelfen" },
        { value: "Halbelfen", label: "Halbelfen" }
      ]
    },
    {
      label: "Zwerge",
      options: [
        { value: "Ambosszwerge", label: "Ambosszwerge" },
        { value: "Hügelzwerge", label: "Hügelzwerge" }
      ]
    }
  ],
  "klassen": [
    {
      label: "Magische Klassen",
      options: [
        { value: "Kampfmagier", label: "Kampfmagier" },
        { value: "Elementarmagier", label: "Elementarmagier" },
        { value: "Heiler (Magisch)", label: "Heiler (Magisch)" }
      ]
    },
    {
      label: "Nahkampf Basierte Klassen",
      options: [
        { value: "Samurai", label: "Samurai" },
        { value: "Ritter", label: "Ritter" },
        { value: "Abenteurer (Optional Nahkampf)", label: "Abenteurer (Optional Nahkampf)" }
      ]
    },
    {
      label: "Stealth Klassen",
      options: [
        { value: "Ninja", label: "Ninja" },
        { value: "Assassine", label: "Assassine" },
        { value: "Dieb", label: "Dieb" }
      ]
    }
  ]
};

export const defaultKlassenKategorien = {
  "Magische Klassen": ["Kampfmagier", "Elementarmagier", "Supportmagier", "Druide", "Priester", "Heiler (Magisch)"],
  "Nahkampf Basierte Klassen": ["Samurai", "Ritter", "Söldner", "Abenteurer (Optional Nahkampf)", "Kampfkünstler"],
  "Fernkampf Basierte Klassen": ["Fernkämpfer"],
  "Wissenschaftliche Klassen": ["Gelehrter", "Alchemist", "Heiler (Nicht Magisch)"],
  "Arbeiterklassen": ["Handwerker", "Händler", "Schmied", "Jäger"],
  "Halbmagische Klassen": ["Hexe/r", "Paladin", "Schamane", "Abenteurer (Optional Halbmagisch)", "Heiler (Halbmagisch)", "Kriegerpriester"],
  "Stealth Klassen": ["Ninja", "Assassine", "Dieb"],
  "Spezialklassen": ["Ki", "Chakra", "Nen"]
};

export const defaultAdjustments = {
  'modifier_stealth': 10,
  'modifier_magie': 10,
  'modifier_asp': 10,
  'modifier_lp': 10,
  'modifier_fernkampf': 10,
  'modifier_nahkampf': 10,
  'modifier_gift': 10,
  'attribute': 5,
  'Kampf_Talente_2': 5,
  'Assassinen_Talente': 3,
  'Normale_Talente': 3,
  'Handwerkstalente': 3,
  'attribute_Klugheit': 5,
  'Tarnung': 5,
  'Fingerfertigkeit': 5,
  'Magische_Elemente': 25,
  'Magische_Elemente_Raumzeit': 80,
  'Talente_1': 3,
  'Talente_2': 3,
  'attribute_Körperkraft': 5,
  'Wissenschaftliche_Talente': 3,
};