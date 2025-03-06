import React from 'react';
import { XIcon } from './Icons';

const CombatTalents = ({
  character,
  handleCombatTalentChange,
  hiddenItems,
  toggleHideItem
}) => {
  if (!character || !character.fähigkeiten || !character.fähigkeiten.Kampf_Talente) {
    return <div className="card"><p>Keine Kampf-Talente verfügbar</p></div>;
  }

  return (
    <div className="card">
      <h2>Kampf-Talente</h2>
      
      <div className="max-h-96 overflow-y-auto pr-2">
        {Object.entries(character.fähigkeiten.Kampf_Talente)
          .filter(([key]) => !hiddenItems || !hiddenItems.some(item => item.id === `Kampf_Talente_${key}`))
          .map(([talentName, values]) => (
            <div key={talentName} className="mb-2 pb-2 border-b border-amber-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{talentName}</span>
                
                <div className="flex items-center gap-2">
                  {values.map((value, index) => (
                    <input
                      key={index}
                      type="number"
                      className="input-number w-14"
                      value={value || 0}
                      onChange={(e) => {
                        if (handleCombatTalentChange) {
                          handleCombatTalentChange(talentName, index, parseInt(e.target.value) || 0);
                        }
                      }}
                      min={0}
                      max={20}
                    />
                  ))}
                  
                  {toggleHideItem && (
                    <button
                      className="ml-2 btn-sm"
                      onClick={() => toggleHideItem('Kampf_Talente', talentName)}
                    >
                      <XIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CombatTalents;