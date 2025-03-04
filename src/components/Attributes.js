import React from 'react';
import { XIcon } from './Icons';

const Attributes = ({ character, handleAttributeChange, hiddenItems, toggleHideItem, setAllAttributesToMinOrMax }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="m-0">Attribute</h2>
        <div className="flex gap-2">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setAllAttributesToMinOrMax(true)}
          >
            Min
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setAllAttributesToMinOrMax(false)}
          >
            Max
          </button>
        </div>
      </div>
      
      <div className="grid grid-2 gap-4">
        {Object.entries(character.fähigkeiten.attribute)
          .filter(([key]) => !hiddenItems.some(item => item.id === `attribute_${key}`))
          .map(([key, value]) => (
            <div key={key} className="flex items-center">
              <label htmlFor={`attribute_${key}`} className="flex-1 text-sm font-semibold">{key}</label>
              <input 
                id={`attribute_${key}`} 
                type="number" 
                className="input-number"
                value={value || 0}
                onChange={(e) => handleAttributeChange('attribute', key, e.target.value)}
                min={7}
                max={Math.min(21, (character.werte.level || 0) + 12)}
              />
              <button 
                className="ml-2 btn-sm"
                onClick={() => toggleHideItem('attribute', key)}
              >
                <XIcon />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Attributes;