// src/utils/magicData.js
export const magicData = {
    "elements": [
      "Feuer",
      "Wasser",
      "Erde",
      "Luft",
      "Licht",
      "Schatten",
      "Blitz",
      "Eis",
      "Natur",
      "Zeit",
      "Metall",
      "Chaos",
      "Geist"
    ],
    "magicTypes": [
      "Angriff",
      "Verteidigung",
      "Unterstützung",
      "Heilung",
      "Beschwörung",
      "Illusion",
      "Kontrolle",
      "Verstärkung",
      "Manipulation",
      "Verzauberung"
    ]
  };
  
  // Level-Kosten Tabelle: Index = aktuelles Level, Wert = Kosten für Steigerung
  export const levelUpCosts = [
    0,  // Level 0 -> 1 (nicht genutzt)
    1,  // Level 1 -> 2
    1,  // Level 2 -> 3
    2,  // Level 3 -> 4
    2,  // Level 4 -> 5
    3,  // Level 5 -> 6
    3,  // Level 6 -> 7
    4,  // Level 7 -> 8
    4,  // Level 8 -> 9
    5,  // Level 9 -> 10
    5,  // Level 10 -> 11
    6,  // Level 11 -> 12
    6,  // Level 12 -> 13
    7,  // Level 13 -> 14
    7,  // Level 14 -> 15
    8,  // Level 15 -> 16
    8,  // Level 16 -> 17
    9,  // Level 17 -> 18
    9,  // Level 18 -> 19
    10, // Level 19 -> 20
    10  // Level 20 -> 21
  ];
  
  // Icon-Zuordnung für Magie-Arten
  export const magicTypeIcons = {
    "Angriff": "fire",
    "Verteidigung": "shield-alt",
    "Unterstützung": "hand-holding-magic",
    "Heilung": "heart",
    "Beschwörung": "dragon",
    "Illusion": "eye",
    "Kontrolle": "brain",
    "Verstärkung": "bolt",
    "Manipulation": "hand-sparkles",
    "Verzauberung": "wand-magic-sparkles"
  };
  
  // Icon-Zuordnung für Elemente
  export const elementIcons = {
    "Feuer": "fire",
    "Wasser": "water",
    "Erde": "mountain",
    "Luft": "wind",
    "Licht": "sun",
    "Schatten": "moon",
    "Blitz": "bolt",
    "Eis": "snowflake",
    "Natur": "leaf",
    "Zeit": "hourglass-half",
    "Metall": "hammer",
    "Chaos": "dice-d20",
    "Geist": "ghost"
  };