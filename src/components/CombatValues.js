import React from 'react';

const CombatValues = ({ character }) => {
  return (
    <div className="card">
      <h2>Kampf Basiswerte</h2>
      
      <div className="grid grid-2 gap-4">
        {Object.entries(character.fähigkeiten.KampfBasiswerte).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={`combat_${key}`} className="label">{key}</label>
            <input 
              id={`combat_${key}`} 
              type="number" 
              className="input"
              value={value || 0}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombatValues;