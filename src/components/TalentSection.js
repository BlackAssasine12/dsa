import React from 'react';
import { XIcon } from './Icons';

const TalentSection = ({ 
  title, 
  talents, 
  character,
  handleTalentChange, 
  hiddenItems, 
  toggleHideItem,
  talentType 
}) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      
      <div className="max-h-96 overflow-y-auto pr-2">
        {talents && talents.map((talent, index) => {
          const talentId = `${talentType}_${talent.Name}`;
          const isHidden = hiddenItems && hiddenItems.some(item => item.id === talentId);
          
          if (isHidden) return null;
          
          return (
            <div key={index} className="mb-2 pb-2 border-b border-amber-200">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-semibold">{talent.Name}</span>
                    {talent.Attribute && (
                      <span className="ml-2 text-sm text-amber-800">({talent.Attribute})</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="number" 
                    className="input-number w-16"
                    value={talent.Wert || 0}
                    onChange={(e) => {
                      if (handleTalentChange) {
                        handleTalentChange(talentType, index, parseInt(e.target.value) || 0);
                      }
                    }}
                    min={0}
                    max={20}
                  />
                  
                  {toggleHideItem && (
                    <button 
                      className="ml-2 btn-sm"
                      onClick={() => toggleHideItem(talentType, talent.Name)}
                    >
                      <XIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TalentSection;