import React from 'react';

const Experience = ({ character, setCharacter }) => {
  return (
    <div className="card">
      <h2>Erfahrung</h2>
      
      <div className="grid grid-2 gap-4">
        <div className="form-group">
          <label htmlFor="xp" className="label">Erfahrungspunkte (XP)</label>
          <input 
            id="xp" 
            type="number" 
            className="input"
            value={character.werte.xp || 0}
            onChange={(e) => {
              setCharacter({
                ...character,
                werte: {
                  ...character.werte,
                  xp: parseInt(e.target.value) || 0
                }
              });
            }}
            step="100"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="level" className="label">Level</label>
          <input 
            id="level" 
            type="number" 
            className="input"
            value={character.werte.level || 0}
            readOnly
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gesteigerte" className="label">Gesteigerte Punkte</label>
          <input 
            id="gesteigerte" 
            type="number" 
            className="input"
            value={character.werte.Gesteigerte || 0}
            onChange={(e) => {
              setCharacter({
                ...character,
                werte: {
                  ...character.werte,
                  Gesteigerte: parseInt(e.target.value) || 0
                }
              });
            }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="steigerungspunkte" className="label">Steigerungspunkte</label>
          <input 
            id="steigerungspunkte" 
            type="number" 
            className="input"
            value={character.werte.Steigerungspunkte || 0}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;