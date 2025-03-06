import React from 'react';
import { XIcon } from './Icons';

const SpecialValues = ({ character, handleAttributeChange, hiddenItems, toggleHideItem }) => {
  return (
    <div className="card">
      <h2>Sonderwerte</h2>
      
      <div className="grid grid-2 gap-4">
        {Object.entries(character.fähigkeiten.sonderwerte)
          .filter(([key]) => !hiddenItems.some(item => item.id === `sonderwerte_${key}`))
          .map(([key, value]) => (
            <div key={key} className="flex items-center">
              <label htmlFor={`sonderwert_${key}`} className="flex-1 text-sm font-semibold">{key}</label>
              <input 
                id={`sonderwert_${key}`} 
                type="number" 
                className="input-number"
                value={value || 0}
                onChange={handleAttributeChange ? (e) => handleAttributeChange('sonderwerte', key, e.target.value) : undefined}
                readOnly={!handleAttributeChange}
              />
              {toggleHideItem && (
                <button 
                  className="ml-2 btn-sm"
                  onClick={() => toggleHideItem('sonderwerte', key)}
                >
                  <XIcon />
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialValues;