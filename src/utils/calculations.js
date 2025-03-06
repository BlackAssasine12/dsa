// Calculate character attributes
export const calculateCharacterAttributes = (character, setCharacter) => {
  if (!character) return;
  
  // Get values from character
  const { fähigkeiten, werte, Magische_Elemente } = character;
  
  // Calculate magic element total
  let totalMagicElements = 0;
  Object.values(Magische_Elemente).forEach(value => {
    totalMagicElements += value;
  });
  
  // Get modifiers
  const lpModifier = fähigkeiten.modifier.lp || 0;
  const aspModifier = fähigkeiten.modifier.asp || 0;
  const magicModifier = fähigkeiten.modifier.magie || 0;
  const fernModifier = fähigkeiten.modifier.fernkampf || 0;
  const nahModifier = fähigkeiten.modifier.nahkampf || 0;
  const giftModifier = fähigkeiten.modifier.gift || 0;
  
  // Get attributes
  const ko = fähigkeiten.attribute.Konstitution || 0;
  const kk = fähigkeiten.attribute.Körperkraft || 0;
  const ge = fähigkeiten.attribute.Gewandheit || 0;
  const kl = fähigkeiten.attribute.Klugheit || 0;
  const in_ = fähigkeiten.attribute.Intuition || 0;
  const ff = fähigkeiten.attribute.Fingerfertigkeit || 0;
  const ch = fähigkeiten.attribute.Charisma || 0;
  const gesch = fähigkeiten.attribute.Geschicklichkeit || 0;
  const tarnung = fähigkeiten.attribute.Tarnung || 0;
  const sin = fähigkeiten.attribute.Sinnesschärfe || 0;
  const wil = fähigkeiten.attribute.Willenskraft || 0;
  
  const xp = werte.xp || 0;
  const gesteigerte = werte.Gesteigerte || 0;
  
  // Calculate level
  let level = 1;
  if (xp < 750) {
    level = Math.floor(xp / 150) + 1;
  } else if (xp < 4950) {
    level = Math.floor((xp - 750) / 600) + 7;
  } else {
    level = Math.floor((xp - 4950) / 1200) + 14;
  }
  
  // Calculate derived values
  const lp = lpModifier * 3 + level * 6 + 20 + ko;
  const ausd = lp + wil;
  const mb = totalMagicElements + magicModifier;
  const maxAsp = level * 6 + aspModifier * 2 + mb;
  const mr = Math.round((mb + level + kl) / 3);
  const giftresistenz = Math.round(ausd / 10 + giftModifier);
  const wurf = Math.round((in_ + ff + kk) / 4);
  const schuss = Math.round((in_ + ff + kk) / 4);
  const attacke = Math.round((ko + ge + kk) / 5);
  const parade = Math.round((in_ + ge + kk) / 5);
  const steigerungspunkte = level * 30 + 100 - gesteigerte;
  const schnelligkeit = Math.round((kk + ge + sin) / 4);
  
  // Get current values to preserve them
  const aktuelleLp = fähigkeiten.sonderwerte["Aktuelle LP"] || lp;
  const aktuelleAusdauer = fähigkeiten.sonderwerte["Ausdauer"] || ausd;
  const aktuelleAstralenergie = fähigkeiten.sonderwerte["Astralenergie"] || maxAsp;
  
  // Update character with calculated values
  const updatedCharacter = {
    ...character,
    werte: {
      ...werte,
      level,
      Steigerungspunkte: steigerungspunkte
    },
    fähigkeiten: {
      ...fähigkeiten,
      sonderwerte: {
        ...fähigkeiten.sonderwerte,
        "Aktuelle LP": aktuelleLp > lp ? lp : aktuelleLp,
        "Maximale LP": lp,
        "Ausdauer": aktuelleAusdauer > ausd ? ausd : aktuelleAusdauer,
        "Maximale Ausdauer": ausd,
        "Astralenergie": aktuelleAstralenergie > maxAsp ? maxAsp : aktuelleAstralenergie,
        "Maximale Astralenergie": maxAsp,
        "Magiebegabung": mb,
        "Magieresistenz": mr,
        "Giftresistenz": giftresistenz,
        "Schnelligkeit": schnelligkeit
      },
      KampfBasiswerte: {
        ...fähigkeiten.KampfBasiswerte,
        "Wurfwaffen Basiswert": wurf,
        "Schusswaffen Basiswert": schuss,
        "Attacke Basiswert": attacke,
        "Parade Basiswert": parade
      }
    }
  };
  
  setCharacter(updatedCharacter);
};