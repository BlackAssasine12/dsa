import React from 'react';
import { XIcon } from './Icons';

const Modifiers = ({ character, handleAttributeChange, hiddenItems, toggleHideItem }) => {
  return (
    <div className="card">
      <h2>Modifikatoren</h2>
      
      <div className="grid grid-2 gap-4">
        {Object.entries(character.fähigkeiten.modifier)
          .filter(([key]) => !hiddenItems.some(item => item.id === `modifier_${key}`))
          .map(([key, value]) => (
            <div key={key} className="flex items-center">
              <label htmlFor={`modifier_${key}`} className="flex-1 text-sm font-semibold">{key}</label>
              <input 
                id={`modifier_${key}`} 
                type="number" 
                className="input-number"
                value={value || 0}
                onChange={(e) => handleAttributeChange('modifier', key, e.target.value)}
                min={0}
                max={(character.werte.level || 0) + 2}
              />
              <button 
                className="ml-2 btn-sm"
                onClick={() => toggleHideItem('modifier', key)}
              >
                <XIcon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Modifiers;