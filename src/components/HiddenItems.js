import React from 'react';
import { ChevronLeftIcon } from './Icons';

const HiddenItems = ({ hiddenItems, toggleHideItem }) => {
  return (
    <div className="card">
      <h2>Ausgeblendete Items</h2>
      
      <div className="grid grid-2 gap-4">
        {hiddenItems.length === 0 ? (
          <p className="italic">Keine ausgeblendeten Items vorhanden.</p>
        ) : (
          hiddenItems.map(item => (
            <div key={item.id} className="flex items-center">
              <label className="flex-1 text-sm font-semibold">{item.label}</label>
              <input 
                type="number" 
                className="input-number"
                value={item.value || 0}
                readOnly
              />
              <button 
                className="ml-2 btn-sm"
                onClick={() => toggleHideItem(item.type, item.key)}
              >
                <ChevronLeftIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HiddenItems;