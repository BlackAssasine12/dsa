// src/components/MagicSystem.js
import React, { useState, useEffect, useRef } from 'react';
import { magicData, levelUpCosts, elementIcons, magicTypeIcons } from '../utils/magicData';
import '../styles/magicSystem.css';

const MagicSystem = ({ character, setCharacter }) => {
  // State for managing magic
  const [characterMagic, setCharacterMagic] = useState([]);
  const [advancementPoints, setAdvancementPoints] = useState(20);
  const [selectedElement, setSelectedElement] = useState('');
  const [customElement, setCustomElement] = useState('');
  const [selectedMagicType, setSelectedMagicType] = useState('');
  const [magicLevel, setMagicLevel] = useState(1);
  const [levelError, setLevelError] = useState('');
  const [showCustomElement, setShowCustomElement] = useState(false);
  const [characterName, setCharacterName] = useState('');

  // Refs for file handling
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Initialize with character data if available
    if (character) {
      setCharacterName(character.charakterInfo?.name || '');
      
      // If the character has magic data, use it
      if (character.Magische_Elemente) {
        const initialMagic = [];
        // Convert the existing magic structure to the new format
        Object.entries(character.Magische_Elemente).forEach(([element, level]) => {
          if (level > 0) {
            initialMagic.push({
              element,
              type: 'Angriff', // Default type since old system doesn't have types
              level
            });
          }
        });
        setCharacterMagic(initialMagic);
      }
    }
  }, [character]);

  // Function to get icon for element or magic type
  const getIcon = (type, key) => {
    const iconMap = type === 'element' ? elementIcons : magicTypeIcons;
    const iconName = iconMap[key] || 'sparkles';
    return <i className={`fas fa-${iconName}`}></i>;
  };

  // Function to calculate level up cost
  const getLevelUpCost = (currentLevel) => {
    if (currentLevel < 1 || currentLevel >= levelUpCosts.length) {
      return Infinity;
    }
    return levelUpCosts[currentLevel];
  };

  // Add magic to character
  const addMagic = () => {
    let elementToAdd = selectedElement;
    
    // Validate inputs
    if (selectedElement === 'custom') {
      elementToAdd = customElement.trim();
      if (!elementToAdd) {
        alert('Bitte gib ein eigenes Element ein');
        return;
      }
    }
    
    if (!elementToAdd) {
      alert('Bitte wähle ein Element aus');
      return;
    }
    
    if (!selectedMagicType) {
      alert('Bitte wähle eine Magie-Art aus');
      return;
    }
    
    if (magicLevel < 1 || magicLevel > 21) {
      setLevelError('Level muss zwischen 1 und 21 liegen');
      return;
    } else {
      setLevelError('');
    }
    
    // Add new magic
    const newMagic = {
      element: elementToAdd,
      type: selectedMagicType,
      level: parseInt(magicLevel)
    };
    
    const updatedMagic = [...characterMagic, newMagic];
    setCharacterMagic(updatedMagic);
    
    // Reset magic level input
    setMagicLevel(1);
    
    // Update character state with new magic data
    updateCharacterWithMagic(updatedMagic);
  };
  
  // Remove magic from character
  const removeMagic = (index) => {
    const updatedMagic = [...characterMagic];
    updatedMagic.splice(index, 1);
    setCharacterMagic(updatedMagic);
    
    // Update character state with updated magic
    updateCharacterWithMagic(updatedMagic);
  };
  
  // Level up magic
  const levelUpMagic = (index) => {
    const magic = characterMagic[index];
    
    if (magic.level >= 21) {
      alert('Maximales Level (21) bereits erreicht!');
      return;
    }
    
    const cost = getLevelUpCost(magic.level);
    
    if (advancementPoints < cost) {
      alert(`Nicht genügend Steigerungspunkte! Du brauchst ${cost} Punkte, um auf Level ${magic.level + 1} zu steigern.`);
      return;
    }
    
    // Increase level and deduct points
    const updatedMagic = [...characterMagic];
    updatedMagic[index].level++;
    setCharacterMagic(updatedMagic);
    
    setAdvancementPoints(prevPoints => prevPoints - cost);
    
    // Update character state with updated magic
    updateCharacterWithMagic(updatedMagic);
  };
  
  // Update character state with magic data
  const updateCharacterWithMagic = (magicList) => {
    if (!character || !setCharacter) return;
    
    // Convert to the format used by the character sheet
    const magicElements = {};
    
    // Initialize all elements to 0
    magicData.elements.forEach(element => {
      magicElements[element] = 0;
    });
    
    // Add custom elements with value 0
    magicList.forEach(magic => {
      if (!magicElements.hasOwnProperty(magic.element)) {
        magicElements[magic.element] = 0;
      }
    });
    
    // Update with actual values (using highest level if multiple of same element)
    magicList.forEach(magic => {
      if (magicElements[magic.element] < magic.level) {
        magicElements[magic.element] = magic.level;
      }
    });
    
    // Update character state
    setCharacter({
      ...character,
      Magische_Elemente: magicElements
    });
  };
  
  // Add advancement points
  const addPoints = () => {
    const pointsToAdd = parseInt(prompt('Wie viele Steigerungspunkte möchtest du hinzufügen?', '5'));
    
    if (!isNaN(pointsToAdd) && pointsToAdd > 0) {
      setAdvancementPoints(prev => prev + pointsToAdd);
    }
  };
  
  // Save character data
  const saveCharacter = () => {
    if (characterMagic.length === 0) {
      alert('Füge mindestens eine Magie hinzu, bevor du speicherst');
      return;
    }
    
    const characterData = {
      name: characterName || 'Unbenannter Charakter',
      advancementPoints,
      magic: characterMagic
    };
    
    const jsonString = JSON.stringify(characterData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterData.name.replace(/\s+/g, '_')}_magie.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Magie-Daten erfolgreich gespeichert!');
  };
  
  // Load character data
  const loadCharacter = () => {
    fileInputRef.current.click();
  };
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const loadedData = JSON.parse(e.target.result);
        
        // Validate loaded data
        if (!loadedData.name || !Array.isArray(loadedData.magic)) {
          throw new Error('Ungültiges Dateiformat');
        }
        
        // Set character name
        setCharacterName(loadedData.name);
        
        // Set magic data
        setCharacterMagic(loadedData.magic);
        
        // Set advancement points if available
        if (loadedData.advancementPoints !== undefined) {
          setAdvancementPoints(loadedData.advancementPoints);
        }
        
        // Update character with loaded magic
        updateCharacterWithMagic(loadedData.magic);
        
        alert('Magie-Daten erfolgreich geladen!');
      } catch (error) {
        alert('Fehler beim Laden der Datei: ' + error.message);
      }
    };
    
    reader.readAsText(file);
    event.target.value = null; // Reset file input
  };
  
  // Render the magic list
  const renderMagicList = () => {
    if (characterMagic.length === 0) {
      return <p>Noch keine Magien hinzugefügt. Füge oben deine erste Magie hinzu!</p>;
    }
    
    return characterMagic.map((magic, index) => {
      const elementIcon = getIcon('element', magic.element);
      const typeIcon = getIcon('magicType', magic.type);
      
      // Calculate cost for next level
      const nextLevelCost = magic.level < 21 ? getLevelUpCost(magic.level) : null;
      const levelUpDisabled = nextLevelCost > advancementPoints || magic.level >= 21;
      
      return (
        <div key={index} className="added-magic">
          <div className="magic-info">
            <span className="magic-icon">{elementIcon}</span>
            <strong>{magic.element}</strong> - 
            <span className="magic-icon">{typeIcon}</span>
            <span className="magic-type">{magic.type}</span>
            <span>Level <strong>{magic.level}</strong></span>
            {nextLevelCost ? (
              <span className="level-cost tooltip">
                <i className="fas fa-info-circle"></i>
                <span className="tooltip-content">Nächstes Level: {nextLevelCost} Punkte</span>
              </span>
            ) : null}
          </div>
          <div className="magic-controls">
            <button 
              className="btn btn-level-up" 
              onClick={() => levelUpMagic(index)}
              disabled={levelUpDisabled}
            >
              <i className="fas fa-arrow-up"></i> Level
            </button>
            <button 
              className="btn btn-remove" 
              onClick={() => removeMagic(index)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      );
    });
  };
  
  // Render the character preview
  const renderCharacterPreview = () => {
    if (characterMagic.length === 0) {
      return <p>Füge Magien hinzu, um die Vorschau zu sehen.</p>;
    }
    
    // Group magic by element
    const elementGroups = {};
    characterMagic.forEach(magic => {
      if (!elementGroups[magic.element]) {
        elementGroups[magic.element] = [];
      }
      elementGroups[magic.element].push(magic);
    });
    
    return (
      <>
        <h2>{characterName || 'Unbenannter Charakter'}</h2>
        <div className="stats-box">
          <div className="stat-item">
            <span className="stat-label">Steigerungspunkte:</span>
            <span className="stat-value">{advancementPoints}</span>
          </div>
        </div>
        <div className="magic-abilities">
          {Object.entries(elementGroups).map(([element, magicList]) => {
            const elementIcon = getIcon('element', element);
            
            return (
              <div key={element} className="element-section">
                <h3 className="element-title">
                  {elementIcon} {element}
                </h3>
                <div className="magic-items">
                  {magicList.map((magic, idx) => {
                    const typeIcon = getIcon('magicType', magic.type);
                    
                    return (
                      <div key={idx} className="magic-item">
                        <div className="magic-info">
                          <span className="magic-icon">{typeIcon}</span>
                          <span className="magic-type">{magic.type}</span>
                        </div>
                        <span className="magic-level">{magic.level}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  
  return (
    <div className="magic-system">
      <div className="card">
        <div className="scroll-decoration scroll-left"></div>
        <div className="scroll-decoration scroll-right"></div>
        <h2>Magie-Charakterbogen</h2>
        
        <div className="info-box">
          <div className="info-box-title">Hinweis</div>
          <p>Füge mehrere Magie-Elemente und -Arten hinzu, um einen mächtigen Charakterbogen zu erstellen. Jedes Element kann mehrere Magiearten beherrschen!</p>
        </div>
        
        <div className="stats-box">
          <div className="stat-item">
            <span className="stat-label">Steigerungspunkte:</span>
            <span id="advancement-points" className="stat-value">{advancementPoints}</span>
          </div>
          <button onClick={addPoints} className="btn btn-small">
            <i className="fas fa-plus-circle"></i> Punkte hinzufügen
          </button>
        </div>
        
        <div className="form-group">
          <label htmlFor="characterName">Charaktername</label>
          <input 
            type="text" 
            id="characterName" 
            placeholder="Gib deinen Charakternamen ein"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
          />
        </div>
        
        <div className="magic-title">
          <i className="fas fa-magic"></i>
          <h2>Magieauswahl</h2>
          <i className="fas fa-magic"></i>
        </div>
        
        <div className="form-group">
          <label htmlFor="elementSelect">Magie-Element</label>
          <select 
            id="elementSelect"
            value={selectedElement}
            onChange={(e) => {
              setSelectedElement(e.target.value);
              setShowCustomElement(e.target.value === 'custom');
            }}
          >
            <option value="">-- Element wählen --</option>
            {magicData.elements.map((element) => (
              <option key={element} value={element}>{element}</option>
            ))}
            <option value="custom">Eigenes Element eingeben</option>
          </select>
          
          {showCustomElement && (
            <div id="customElementContainer" style={{display: 'block'}}>
              <input 
                type="text" 
                id="customElement" 
                placeholder="Eigenes Element eingeben"
                value={customElement}
                onChange={(e) => setCustomElement(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="magicTypeSelect">Magie-Art</label>
          <select 
            id="magicTypeSelect"
            value={selectedMagicType}
            onChange={(e) => setSelectedMagicType(e.target.value)}
          >
            <option value="">-- Magie-Art wählen --</option>
            {magicData.magicTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="magicLevel">Magie-Level (1-21)</label>
          <input 
            type="number" 
            id="magicLevel" 
            min="1" 
            max="21" 
            value={magicLevel}
            onChange={(e) => setMagicLevel(e.target.value)}
          />
          {levelError && <div id="levelError" className="error">{levelError}</div>}
        </div>
        
        <button id="addMagicBtn" className="btn" onClick={addMagic}>
          <i className="fas fa-plus-circle"></i> Magie hinzufügen
        </button>
        
        <div className="magic-list">
          {renderMagicList()}
        </div>
        
        <div className="btn-group">
          <button onClick={saveCharacter} className="btn">
            <i className="fas fa-save"></i> Magie speichern
          </button>
          <button onClick={loadCharacter} className="btn">
            <i className="fas fa-upload"></i> Magie laden
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleFileUpload}
            accept=".json"
          />
        </div>
      </div>
      
      <div className="card character-preview">
        <div className="scroll-decoration scroll-left"></div>
        <div className="scroll-decoration scroll-right"></div>
        <h3>Charaktervorschau</h3>
        <div id="previewContent">
          {renderCharacterPreview()}
        </div>
      </div>
    </div>
  );
};

export default MagicSystem;