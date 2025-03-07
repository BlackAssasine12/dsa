import React, { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';
import CharacterInfo from './CharacterInfo';
import Wallet from './Wallet';
import Experience from './Experience';
import CombatValues from './CombatValues';
import Attributes from './Attributes';
import SpecialValues from './SpecialValues';
import Modifiers from './Modifiers';
import MagicElements from './MagicElements';
import Inventory from './Inventory';
import Shop from './Shop';
import DiceRoller from './DiceRoller';
import Settings from './Settings';
import HiddenItems from './HiddenItems';
import MagicSystem from './MagicSystem';
import TalentSection from './TalentSection';
import CombatTalents from './CombatTalents';
import { SaveIcon, UploadIcon, BookIcon } from './Icons';
import { calculateCharacterAttributes } from '../utils/calculations';
import { getMagicElementRequirements } from '../utils/helpers';
import {
  defaultCharacter,
  defaultShopData,
  defaultDropdowns,
  defaultKlassenKategorien,
  defaultAdjustments
} from '../utils/constants';

const CharacterSheet = () => {
  // State management
  const [character, setCharacter] = useState(defaultCharacter);
  const [wallet, setWallet] = useState(defaultCharacter.geld);
  const [inventory, setInventory] = useState([
    { name: "Schwert", quantity: 1 },
    { name: "Lederrüstung", quantity: 1 },
    { name: "Proviant", quantity: 5 }
  ]);
  const [shopData, setShopData] = useState(defaultShopData);
  const [rassen, setRassen] = useState(defaultDropdowns.rassen);
  const [klassen, setKlassen] = useState(defaultDropdowns.klassen);
  const [klassenKategorien, setKlassenKategorien] = useState(defaultKlassenKategorien);
  const [activeTab, setActiveTab] = useState('character');
  const [showHiddenItems, setShowHiddenItems] = useState(false);
  const [freeSkillUpgrades, setFreeSkillUpgrades] = useState(false);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [diceSettings, setDiceSettings] = useState({
    count: 1,
    sides: 20,
    type: 'd20',
    showDice: false
  });
  const [diceResults, setDiceResults] = useState([]);
  const [shopOpen, setShopOpen] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [loadStatus, setLoadStatus] = useState('');

  // File input reference for loading character data
  const fileInputRef = useRef(null);

  // Theme settings
  const [theme, setTheme] = useState({
    fontFamily: '"Quintessential", serif',
    color: '#36251b'
  });

  // Adjustments for skill costs
  const [adjustments, setAdjustments] = useState(defaultAdjustments);

  // Class selection handler - updates adjustments
  const handleClassChange = (selectedClass) => {
    if (!selectedClass || !klassenKategorien) return;

    // Reset adjustments to default
    const defaultAdjustmentsObj = { ...defaultAdjustments };

    const newAdjustments = { ...defaultAdjustmentsObj };

    // Update adjustments based on class
    Object.keys(klassenKategorien).forEach(category => {
      if (klassenKategorien[category].includes(selectedClass)) {
        switch (category) {
          case "Magische Klassen":
            newAdjustments.modifier_magie = 3;
            newAdjustments.modifier_asp = 5;
            newAdjustments.Magische_Elemente = 20;
            break;
          case "Nahkampf Basierte Klassen":
            newAdjustments.modifier_nahkampf = 3;
            newAdjustments.modifier_lp = 5;
            newAdjustments.attribute_Körperkraft = 3;
            break;
          case "Fernkampf Basierte Klassen":
            newAdjustments.modifier_fernkampf = 3;
            newAdjustments.modifier_stealth = 5;
            break;
          case "Wissenschaftliche Klassen":
            newAdjustments.attribute_Klugheit = 3;
            newAdjustments.Wissenschaftliche_Talente = 2;
            break;
          case "Arbeiterklassen":
            newAdjustments.Handwerkstalente = 2;
            newAdjustments.attribute = 4;
            break;
          case "Halbmagische Klassen":
            newAdjustments.modifier_magie = 8;
            newAdjustments.modifier_asp = 8;
            newAdjustments.modifier_nahkampf = 8;
            newAdjustments.modifier_fernkampf = 8;
            newAdjustments.modifier_lp = 8;
            newAdjustments.Magische_Elemente = 23;
            break;
          case "Stealth Klassen":
            newAdjustments.modifier_stealth = 3;
            newAdjustments.modifier_nahkampf = 8;
            newAdjustments.modifier_fernkampf = 8;
            newAdjustments.modifier_gift = 8;
            newAdjustments.Assassinen_Talente = 1;
            break;
          case "Spezialklassen":
            newAdjustments.modifier_magie = 8;
            newAdjustments.modifier_asp = 8;
            newAdjustments.modifier_nahkampf = 8;
            newAdjustments.modifier_fernkampf = 8;
            newAdjustments.modifier_lp = 8;
            newAdjustments.Magische_Elemente = 23;
            break;
          default:
            break;
        }
      }
    });

    setAdjustments(newAdjustments);

    // Update character class
    if (character && character.charakterInfo) {
      setCharacter({
        ...character,
        charakterInfo: {
          ...character.charakterInfo,
          klasse: selectedClass
        }
      });
    }
  };

  // Effect to recalculate attributes when needed
  useEffect(() => {
    if (character) {
      calculateCharacterAttributes(character, setCharacter);
    }
  }, [character?.fähigkeiten?.attribute, character?.fähigkeiten?.modifier, character?.werte?.xp, character?.werte?.Gesteigerte]);

  // Handle attribute changes with cost calculation
  const handleAttributeChange = (category, key, value) => {
    if (!character) return;

    const numValue = parseFloat(value) || 0;
    let currentValue = 0;

    if (category === 'attribute') {
      currentValue = character.fähigkeiten.attribute[key] || 0;
    } else if (category === 'modifier') {
      currentValue = character.fähigkeiten.modifier[key] || 0;
    } else if (category === 'Magische_Elemente') {
      currentValue = character.Magische_Elemente[key] || 0;
    } else if (category === 'sonderwerte') {
      currentValue = character.fähigkeiten.sonderwerte[key] || 0;
    }

    const diff = numValue - currentValue;

    // Calculate cost based on adjustment
    let adjustmentCategory = category;
    if (category === 'attribute' && key === 'Klugheit') {
      adjustmentCategory = 'attribute_Klugheit';
    } else if (category === 'attribute' && key === 'Körperkraft') {
      adjustmentCategory = 'attribute_Körperkraft';
    }

    const costMultiplier = adjustments[adjustmentCategory] || 1;
    const skillCost = diff * costMultiplier;

    // Update Gesteigerte if free skill upgrades are not enabled
    let updatedGesteigerte = character.werte.Gesteigerte;
    if (!freeSkillUpgrades) {
      updatedGesteigerte += skillCost;
    }

    // Create updated character object
    let updatedCharacter = { ...character };

    // Update the specific attribute
    if (category === 'attribute') {
      updatedCharacter.fähigkeiten.attribute = {
        ...updatedCharacter.fähigkeiten.attribute,
        [key]: numValue
      };
    } else if (category === 'modifier') {
      updatedCharacter.fähigkeiten.modifier = {
        ...updatedCharacter.fähigkeiten.modifier,
        [key]: numValue
      };
    } else if (category === 'Magische_Elemente') {
      updatedCharacter.Magische_Elemente = {
        ...updatedCharacter.Magische_Elemente,
        [key]: numValue
      };
    } else if (category === 'sonderwerte') {
      updatedCharacter.fähigkeiten.sonderwerte = {
        ...updatedCharacter.fähigkeiten.sonderwerte,
        [key]: numValue
      };
    }

    // Update the Gesteigerte value
    updatedCharacter.werte = {
      ...updatedCharacter.werte,
      Gesteigerte: updatedGesteigerte
    };

    setCharacter(updatedCharacter);
  };

  // Handle talent changes
  const handleTalentChange = (talentType, talentIndex, newValue) => {
    if (!character) return;

    // Create a copy of the character
    const updatedCharacter = {...character};
    
    // Get the current talent value
    let currentTalent;
    if (talentType === 'Assassinen_Talente') {
      currentTalent = updatedCharacter.fähigkeiten.Assassinen_Talente[talentIndex];
    } else if (talentType === 'Talente_1') {
      currentTalent = updatedCharacter.fähigkeiten.Talente_1[talentIndex];
    } else if (talentType === 'Talente_2') {
      currentTalent = updatedCharacter.fähigkeiten.Talente_2[talentIndex];
    } else if (talentType === 'Handwerkstalente') {
      currentTalent = updatedCharacter.fähigkeiten.Handwerkstalente[talentIndex];
    } else if (talentType === 'Kampf_Talente') {
      // Handle combat talents differently as they have array values
      return;
    }

    if (!currentTalent) return;

    // Get the old value
    const oldValue = currentTalent.Wert || 0;
    const diff = newValue - oldValue;

    // Calculate cost
    const costMultiplier = adjustments[talentType] || 3; // Default is 3
    const skillCost = diff * costMultiplier;

    // Update Gesteigerte if free skill upgrades are not enabled
    if (!freeSkillUpgrades) {
      updatedCharacter.werte.Gesteigerte += skillCost;
    }

    // Update the talent value
    if (talentType === 'Assassinen_Talente') {
      updatedCharacter.fähigkeiten.Assassinen_Talente[talentIndex].Wert = newValue;
    } else if (talentType === 'Talente_1') {
      updatedCharacter.fähigkeiten.Talente_1[talentIndex].Wert = newValue;
    } else if (talentType === 'Talente_2') {
      updatedCharacter.fähigkeiten.Talente_2[talentIndex].Wert = newValue;
    } else if (talentType === 'Handwerkstalente') {
      updatedCharacter.fähigkeiten.Handwerkstalente[talentIndex].Wert = newValue;
    }

    // Update the character
    setCharacter(updatedCharacter);
  };

  // Handle combat talent changes
  const handleCombatTalentChange = (talentName, valueIndex, newValue) => {
    if (!character) return;

    // Create a copy of the character
    const updatedCharacter = {...character};
    
    // Get the current talent values
    const currentValues = updatedCharacter.fähigkeiten.Kampf_Talente[talentName];
    if (!currentValues) return;

    // Get the old value
    const oldValue = currentValues[valueIndex] || 0;
    const diff = newValue - oldValue;

    // Calculate cost
    const costMultiplier = adjustments['Kampf_Talente_2'] || 5; // Default is 5
    const skillCost = diff * costMultiplier;

    // Update Gesteigerte if free skill upgrades are not enabled
    if (!freeSkillUpgrades) {
      updatedCharacter.werte.Gesteigerte += skillCost;
    }

    // Update the talent value
    updatedCharacter.fähigkeiten.Kampf_Talente[talentName][valueIndex] = newValue;

    // Update the character
    setCharacter(updatedCharacter);
  };

  // Roll dice function
  const rollDice = () => {
    const { count, sides } = diceSettings;
    const results = [];

    for (let i = 0; i < count; i++) {
      const result = Math.floor(Math.random() * sides) + 1;
      results.push({
        value: result,
        isMax: result === sides,
        isMin: result === 1
      });
    }

    setDiceResults(results);
  };

  // Handle dice type selection
  const handleDiceTypeChange = (type) => {
    let sides = 20;

    switch (type) {
      case 'd100':
        sides = 100;
        break;
      case 'd20':
        sides = 20;
        break;
      case 'd10':
        sides = 10;
        break;
      case 'd6':
        sides = 6;
        break;
      case 'custom':
        // Keep current sides
        break;
      default:
        sides = 20;
    }

    setDiceSettings({
      ...diceSettings,
      type,
      sides
    });
  };

  // Wallet functions
  const updateWallet = (currency, amount) => {
    const updatedWallet = { ...wallet };
    updatedWallet[currency] += parseFloat(amount);
    setWallet(updatedWallet);

    // Update character data
    if (character) {
      setCharacter({
        ...character,
        geld: updatedWallet
      });
    }
  };

  const convertWallet = () => {
    let total = wallet.kreuzer + wallet.heller * 10 + wallet.silber * 100 + wallet.dukaten * 1000;

    const dukaten = Math.floor(total / 1000);
    total %= 1000;

    const silber = Math.floor(total / 100);
    total %= 100;

    const heller = Math.floor(total / 10);
    total %= 10;

    const kreuzer = Math.floor(total);

    const updatedWallet = {
      dukaten,
      silber,
      heller,
      kreuzer,
      wInsg: 0
    };

    setWallet(updatedWallet);

    // Update character data
    if (character) {
      setCharacter({
        ...character,
        geld: updatedWallet
      });
    }
  };

  // Inventory functions
  const addToInventory = (itemName, price = 0, currency = '') => {
    // Update wallet if price is provided
    if (price > 0 && currency) {
      const updatedWallet = { ...wallet };
      updatedWallet[currency.toLowerCase()] -= price;
      setWallet(updatedWallet);

      // Update character data
      if (character) {
        setCharacter({
          ...character,
          geld: updatedWallet
        });
      }
    }

    // Update inventory
    const existingItemIndex = inventory.findIndex(item => item.name === itemName);

    if (existingItemIndex >= 0) {
      // Item exists, increment quantity
      const updatedInventory = [...inventory];
      updatedInventory[existingItemIndex].quantity += 1;
      setInventory(updatedInventory);
    } else {
      // New item
      setInventory([...inventory, { name: itemName, quantity: 1 }]);
    }
  };

  const removeFromInventory = (itemName) => {
    const existingItemIndex = inventory.findIndex(item => item.name === itemName);

    if (existingItemIndex >= 0) {
      const updatedInventory = [...inventory];
      if (updatedInventory[existingItemIndex].quantity > 1) {
        updatedInventory[existingItemIndex].quantity -= 1;
      } else {
        updatedInventory.splice(existingItemIndex, 1);
      }
      setInventory(updatedInventory);
    }
  };

  // Hide/show item
  const toggleHideItem = (itemType, itemKey) => {
    const itemId = `${itemType}_${itemKey}`;

    // Check if item is already hidden
    const isHidden = hiddenItems.some(item => item.id === itemId);

    if (isHidden) {
      // Show item
      setHiddenItems(hiddenItems.filter(item => item.id !== itemId));
    } else {
      // Hide item
      let itemValue;
      let label = itemKey;

      if (itemType === 'attribute') {
        itemValue = character.fähigkeiten.attribute[itemKey];
      } else if (itemType === 'modifier') {
        itemValue = character.fähigkeiten.modifier[itemKey];
      } else if (itemType === 'Magische_Elemente') {
        itemValue = character.Magische_Elemente[itemKey];
      } else if (itemType === 'sonderwerte') {
        itemValue = character.fähigkeiten.sonderwerte[itemKey];
      } else if (itemType === 'Kampf_Talente') {
        itemValue = character.fähigkeiten.Kampf_Talente[itemKey].join('/');
      } else if (itemType === 'Assassinen_Talente') {
        const talent = character.fähigkeiten.Assassinen_Talente.find(t => t.Name === itemKey);
        if (talent) {
          itemValue = talent.Wert;
          label = talent.Name;
        }
      } else if (itemType === 'Talente_1') {
        const talent = character.fähigkeiten.Talente_1.find(t => t.Name === itemKey);
        if (talent) {
          itemValue = talent.Wert;
          label = talent.Name;
        }
      } else if (itemType === 'Talente_2') {
        const talent = character.fähigkeiten.Talente_2.find(t => t.Name === itemKey);
        if (talent) {
          itemValue = talent.Wert;
          label = talent.Name;
        }
      } else if (itemType === 'Handwerkstalente') {
        const talent = character.fähigkeiten.Handwerkstalente.find(t => t.Name === itemKey);
        if (talent) {
          itemValue = talent.Wert;
          label = talent.Name;
        }
      }

      setHiddenItems([...hiddenItems, {
        id: itemId,
        type: itemType,
        key: itemKey,
        value: itemValue,
        label: label
      }]);
    }
  };

  // Save character data
  const saveCharacterData = () => {
    try {
      const characterData = {
        charakter: character,
        inventory,
        hiddenItems,
        theme,
        diceSettings,
        adjustments,
        freeSkillUpgrades,
        showHiddenItems
      };

      const characterName = character.charakterInfo.name || 'unbenannt';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${characterName}_${timestamp}.json`;

      const jsonString = JSON.stringify(characterData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSaveStatus('Charakter erfolgreich gespeichert!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      setSaveStatus('Fehler beim Speichern!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Load character data from file
  const loadCharacterData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Load character data
        if (data.charakter) {
          setCharacter(data.charakter);

          // Set wallet if available
          if (data.charakter.geld) {
            setWallet(data.charakter.geld);
          }
        }

        // Load inventory if available
        if (data.inventory) {
          setInventory(data.inventory);
        }

        // Load hidden items if available
        if (data.hiddenItems) {
          setHiddenItems(data.hiddenItems);
        }

        // Load theme if available
        if (data.theme) {
          setTheme(data.theme);
        }

        // Load dice settings if available
        if (data.diceSettings) {
          setDiceSettings(data.diceSettings);
        }

        // Load adjustments if available
        if (data.adjustments) {
          setAdjustments(data.adjustments);
        }

        // Load toggles if available
        if (data.freeSkillUpgrades !== undefined) {
          setFreeSkillUpgrades(data.freeSkillUpgrades);
        }

        if (data.showHiddenItems !== undefined) {
          setShowHiddenItems(data.showHiddenItems);
        }

        // Update calculated attributes
        calculateCharacterAttributes(data.charakter, setCharacter);

        setLoadStatus('Charakter erfolgreich geladen!');
        setTimeout(() => setLoadStatus(''), 3000);
      } catch (error) {
        console.error('Error parsing character data:', error);
        setLoadStatus('Fehler beim Laden der Datei!');
        setTimeout(() => setLoadStatus(''), 3000);
      }
    };
    reader.readAsText(file);
  };

  // Open file dialog for loading character
  const openLoadDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Set all attributes to min or max
  const setAllAttributesToMinOrMax = (isMin) => {
    if (!character) return;

    const { fähigkeiten, Magische_Elemente, werte } = character;
    const { attribute, modifier } = fähigkeiten;

    let totalCost = 0;
    let updatedAttributes = { ...attribute };
    let updatedModifiers = { ...modifier };
    let updatedMagicElements = { ...Magische_Elemente };

    // Helper function to update a value and calculate cost
    const updateValue = (currentValue, newValue, costCategory) => {
      const diff = newValue - currentValue;
      const costMultiplier = adjustments[costCategory] || 1;
      totalCost += diff * costMultiplier;
      return newValue;
    };

    // Update attributes
    Object.keys(attribute).forEach(key => {
      const currentValue = attribute[key];
      const level = werte.level || 1;
      const minValue = 7; // minimum attribute value
      const maxValue = Math.min(21, level + 12); // max depending on level

      const newValue = isMin ? minValue : maxValue;

      let costCategory = 'attribute';
      if (key === 'Klugheit') costCategory = 'attribute_Klugheit';
      if (key === 'Körperkraft') costCategory = 'attribute_Körperkraft';

      updatedAttributes[key] = updateValue(currentValue, newValue, costCategory);
    });

    // Update modifiers
    Object.keys(modifier).forEach(key => {
      const currentValue = modifier[key];
      const level = werte.level || 1;
      const minValue = 0; // minimum modifier value
      const maxValue = level + 2; // max depending on level

      const newValue = isMin ? minValue : maxValue;
      const costCategory = `modifier_${key}`;

      updatedModifiers[key] = updateValue(currentValue, newValue, costCategory);
    });

    // Update magic elements
    Object.keys(Magische_Elemente).forEach(key => {
      const currentValue = Magische_Elemente[key];
      const mb = fähigkeiten.sonderwerte.Magiebegabung || 0;
      const minValue = 0; // minimum element value
      const maxValue = Math.min(21, Math.floor(mb / 2)); // max depending on magic aptitude

      const newValue = isMin ? minValue : maxValue;

      updatedMagicElements[key] = updateValue(currentValue, newValue, 'Magische_Elemente');
    });

    // Update character with new values
    const updatedCharacter = {
      ...character,
      fähigkeiten: {
        ...fähigkeiten,
        attribute: updatedAttributes,
        modifier: updatedModifiers
      },
      Magische_Elemente: updatedMagicElements,
      werte: {
        ...werte,
        Gesteigerte: werte.Gesteigerte + (freeSkillUpgrades ? 0 : totalCost)
      }
    };

    setCharacter(updatedCharacter);
  };

  return (
    <div
      className="app"
      style={{ fontFamily: theme.fontFamily, color: theme.color }}
    >
      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container">
        {/* File operations and toggles */}
        <div className="card mb-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="toggleListenersCheckbox"
                  className="input-checkbox"
                  checked={freeSkillUpgrades}
                  onChange={e => setFreeSkillUpgrades(e.target.checked)}
                />
                <label htmlFor="toggleListenersCheckbox" className="text-sm">
                  Kostenloses Steigern
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="toggleHiddenCheckbox"
                  className="input-checkbox"
                  checked={showHiddenItems}
                  onChange={e => setShowHiddenItems(e.target.checked)}
                />
                <label htmlFor="toggleHiddenCheckbox" className="text-sm">
                  Ausgeblendete Items anzeigen
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-primary flex items-center"
                onClick={openLoadDialog}
              >
                <UploadIcon />
                <span>Datei laden</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".json"
                  onChange={loadCharacterData}
                  ref={fileInputRef}
                />
              </button>

              <button
                onClick={saveCharacterData}
                className="btn btn-primary flex items-center"
              >
                <SaveIcon /> Speichern
              </button>
              
              <button
                onClick={() => {
                  // Create a new empty character
                  setCharacter(defaultCharacter);
                  setWallet(defaultCharacter.geld);
                  setInventory([
                    { name: "Schwert", quantity: 1 },
                    { name: "Lederrüstung", quantity: 1 },
                    { name: "Proviant", quantity: 5 }
                  ]);
                  setHiddenItems([]);
                }}
                className="btn btn-danger flex items-center"
              >
                <BookIcon /> Neuer Charakter
              </button>
            </div>
          </div>
          
          {/* Save/Load Status Messages */}
          {(saveStatus || loadStatus) && (
            <div className={`mt-2 p-2 text-center rounded ${saveStatus.includes('Fehler') || loadStatus.includes('Fehler') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {saveStatus || loadStatus}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="card">
          {/* Character Tab */}
          {activeTab === 'character' && (
            <div className="space-y-4">
              {/* Character Info and Wallet */}
              <div className="grid grid-2 gap-4">
                {/* Character Info */}
                <CharacterInfo
                  character={character}
                  setCharacter={setCharacter}
                  rassen={rassen}
                  klassen={klassen}
                  handleClassChange={handleClassChange}
                />

                {/* Wallet */}
                <Wallet
                  wallet={wallet}
                  updateWallet={updateWallet}
                  convertWallet={convertWallet}
                  setWallet={setWallet}
                />
              </div>

              {/* XP and Combat Values */}
              <div className="grid grid-2 gap-4">
                <Experience
                  character={character}
                  setCharacter={setCharacter}
                />

                <CombatValues
                  character={character}
                />
              </div>

              {/* Attributes and Special Values */}
              <div className="grid grid-2 gap-4">
                <Attributes
                  character={character}
                  handleAttributeChange={handleAttributeChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                  setAllAttributesToMinOrMax={setAllAttributesToMinOrMax}
                />

                <SpecialValues
                  character={character}
                  handleAttributeChange={handleAttributeChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
              </div>

              {/* Modifiers and Magic System */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Modifiers
                  character={character}
                  handleAttributeChange={handleAttributeChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />

                <MagicSystem
                  character={character}
                  setCharacter={setCharacter}
                />
              </div>
              
              {/* Combat Talents */}
              <div className="grid grid-cols-1 gap-6">
                <CombatTalents
                  character={character}
                  handleCombatTalentChange={handleCombatTalentChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
              </div>
              
              {/* Other Talents */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TalentSection
                  title="Assassinen-Talente"
                  talents={character.fähigkeiten.Assassinen_Talente}
                  talentType="Assassinen_Talente"
                  character={character}
                  handleTalentChange={handleTalentChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
                
                <TalentSection
                  title="Allgemeine Talente"
                  talents={character.fähigkeiten.Talente_1}
                  talentType="Talente_1"
                  character={character}
                  handleTalentChange={handleTalentChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TalentSection
                  title="Wissenstalente"
                  talents={character.fähigkeiten.Talente_2}
                  talentType="Talente_2"
                  character={character}
                  handleTalentChange={handleTalentChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
                
                <TalentSection
                  title="Handwerkstalente"
                  talents={character.fähigkeiten.Handwerkstalente}
                  talentType="Handwerkstalente"
                  character={character}
                  handleTalentChange={handleTalentChange}
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
              </div>

              {/* Hidden Items */}
              {showHiddenItems && hiddenItems.length > 0 && (
                <HiddenItems
                  hiddenItems={hiddenItems}
                  toggleHideItem={toggleHideItem}
                />
              )}
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <Inventory
              inventory={inventory}
              addToInventory={addToInventory}
              removeFromInventory={removeFromInventory}
            />
          )}

          {/* Shop Tab */}
          {activeTab === 'shop' && (
            <Shop
              shopData={shopData}
              shopOpen={shopOpen}
              setShopOpen={setShopOpen}
              addToInventory={addToInventory}
            />
          )}

          {/* Dice Tab */}
          {activeTab === 'dice' && (
            <DiceRoller
              diceSettings={diceSettings}
              diceResults={diceResults}
              setDiceSettings={setDiceSettings}
              handleDiceTypeChange={handleDiceTypeChange}
              rollDice={rollDice}
            />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Settings
              theme={theme}
              setTheme={setTheme}
              setAllAttributesToMinOrMax={setAllAttributesToMinOrMax}
              freeSkillUpgrades={freeSkillUpgrades}
              setFreeSkillUpgrades={setFreeSkillUpgrades}
              showHiddenItems={showHiddenItems}
              setShowHiddenItems={setShowHiddenItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;