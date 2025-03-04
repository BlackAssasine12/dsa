// Helper function to get magic element requirements
export const getMagicElementRequirements = (elementName) => {
    const requirements = {
      "Schatten": "Benötigt: Luft Dunkle",
      "Licht": "Benötigt: Helle Feuer",
      "Holz": "Benötigt: Erde Wasser",
      "Metall": "Benötigt: Erde Feuer",
      "Eis": "Benötigt: Luft Wasser",
      "Leben": "Benötigt: Heilung Natur",
      "Nekromantie": "Benötigt: Dunkle Leben",
      "Blitz": "Benötigt: Licht Luft",
      "Gravitation": "Benötigt: Erde Luft",
      "Erschaffung": "Benötigt: Feuer Wasser Erde Luft Natur Dunkle Helle",
      "Raumzeit": "Benötigt: Alle Elemente",
      "Gift": "Benötigt: Natur Wasser",
      "Blut": "Benötigt: Leben Wasser"
    };
    
    return requirements[elementName] || '';
  };