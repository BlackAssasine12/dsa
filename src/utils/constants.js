export const defaultCharacter = {
    charakterInfo: {
      name: "Alrik",
      alter: "25",
      geschlecht: "Männlich",
      rasse: "Mittelreicher",
      klasse: "Abenteurer (Optional Nahkampf)",
      größe: "180 cm",
      gewicht: "85 kg",
      haarfarbe: "Braun",
      augenfarbe: "Blau",
      titel: "Wanderer"
    },
    werte: {
      level: 5,
      xp: 650,
      Steigerungspunkte: 95,
      Gesteigerte: 55
    },
    geld: {
      wInsg: 0,
      dukaten: 10,
      silber: 25,
      heller: 8,
      kreuzer: 12
    },
    Magische_Elemente: {
      Feuer: 5,
      Wasser: 3,
      Erde: 4,
      Luft: 2,
      Natur: 3,
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
        magie: 6,
        asp: 5,
        lp: 8,
        fernkampf: 7,
        nahkampf: 10,
        gift: 4,
        stealth: 3
      },
      attribute: {
        Konstitution: 12,
        Körperkraft: 14,
        Gewandheit: 13,
        Klugheit: 11,
        Intuition: 12,
        Geschicklichkeit: 13,
        Tarnung: 10,
        Fingerfertigkeit: 11,
        Sinnesschärfe: 14,
        Charisma: 12,
        Willenskraft: 13
      },
      sonderwerte: {
        "Aktuelle LP": 85,
        "Maximale LP": 85,
        "Ausdauer": 98,
        "Maximale Ausdauer": 98,
        "Astralenergie": 42,
        "Maximale Astralenergie": 42,
        "Magiebegabung": 20,
        "Magieresistenz": 12,
        "Giftresistenz": 14,
        "Schnelligkeit": 10
      },
      KampfBasiswerte: {
        "Wurfwaffen Basiswert": 9,
        "Schusswaffen Basiswert": 9,
        "Attacke Basiswert": 8,
        "Parade Basiswert": 8
      },
      Kampf_Talente: {
        "Zweihand Schwerter": [9, 7, 4],
        "Einhand Schwerter": [12, 8, 5],
        "Schild": [6, 8, 3],
        "Stichwaffen": [0, 0, 0],
        "Stumpfe Waffen": [0, 0, 0],
        "Schwere Waffen": [0, 0, 0],
        "Versteckte Klingen": [0, 0, 0],
        "Messer/Dolche": [9, 5, 3],
        "Flexible Nahkampfwaffen": [0, 0, 0],
        "Waffenlos": [6, 7, 4],
        "Pfeilwaffen": [0, 0, 0],
        "Bolzenwaffen": [0, 0, 0],
        "Wurfwaffen": [7, 0, 4]
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