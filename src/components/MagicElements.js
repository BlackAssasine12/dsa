import React from 'react';
import { XIcon } from './Icons';

const MagicElements = ({ character, handleAttributeChange, hiddenItems, toggleHideItem, getMagicElementRequirements }) => {
  return (
    <div className="card">
      <h2>Magische Elemente</h2>
      
      <div className="grid grid-2 gap-4">
        {Object.entries(character.Magische_Elemente)
          .filter(([key]) => !hiddenItems.some(item => item.id === `Magische_Elemente_${key}`))
          .map(([key, value]) => (
            <div key={key} className="flex items-center">
              <label 
                htmlFor={`magicElement_${key}`} 
                className="flex-1 text-sm font-semibold"
                title={getMagicElementRequirements(key)}
              >
                {key}
              </label>
              <input 
                id={`magicElement_${key}`} 
                type="number" 
                className="input-number"
                value={value || 0}
                onChange={(e) => handleAttributeChange('Magische_Elemente', key, e.target.value)}
                min={0}
                max={Math.min(21, Math.floor((character.fähigkeiten.sonderwerte.Magiebegabung || 0) / 2))}
              />
              <button 
                className="ml-2 btn-sm"
                onClick={() => toggleHideItem('Magische_Elemente', key)}
              >
                <XIcon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MagicElements;