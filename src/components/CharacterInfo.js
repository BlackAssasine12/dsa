import React from 'react';

const CharacterInfo = ({ character, setCharacter, rassen, klassen, handleClassChange }) => {
  const handleInfoChange = (e) => {
    const { id, value } = e.target;
    setCharacter({
      ...character,
      charakterInfo: {
        ...character.charakterInfo,
        [id]: value
      }
    });
  };

  return (
    <div className="card">
      <h2>Charakterinformation</h2>
      
      <div className="grid grid-2 gap-4">
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="label">Name</label>
            <input 
              id="name" 
              type="text" 
              className="input"
              value={character.charakterInfo.name || ''}
              onChange={handleInfoChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="alter" className="label">Alter</label>
            <input 
              id="alter" 
              type="text" 
              className="input"
              value={character.charakterInfo.alter || ''}
              onChange={handleInfoChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="geschlecht" className="label">Geschlecht</label>
            <input 
              id="geschlecht" 
              type="text" 
              className="input"
              value={character.charakterInfo.geschlecht || ''}
              onChange={handleInfoChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="größe" className="label">Größe</label>
            <input 
              id="größe" 
              type="text" 
              className="input"
              value={character.charakterInfo.größe || ''}
              onChange={handleInfoChange}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="gewicht" className="label">Gewicht</label>
            <input 
              id="gewicht" 
              type="text" 
              className="input"
              value={character.charakterInfo.gewicht || ''}
              onChange={handleInfoChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="haarfarbe" className="label">Haarfarbe</label>
            <input 
              id="haarfarbe" 
              type="text" 
              className="input"
              value={character.charakterInfo.haarfarbe || ''}
              onChange={handleInfoChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="augenfarbe" className="label">Augenfarbe</label>
            <input 
              id="augenfarbe" 
              type="text" 
              className="input"
              value={character.charakterInfo.augenfarbe || ''}
              onChange={handleInfoChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="titel" className="label">Titel</label>
            <input 
              id="titel" 
              type="text" 
              className="input"
              value={character.charakterInfo.titel || ''}
              onChange={handleInfoChange}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-2 gap-4 mt-4">
        <div className="form-group">
          <label htmlFor="rasse" className="label">Rasse</label>
          <select 
            id="rasse"
            className="select"
            value={character.charakterInfo.rasse || ''}
            onChange={(e) => {
              setCharacter({
                ...character,
                charakterInfo: {
                  ...character.charakterInfo,
                  rasse: e.target.value
                }
              });
            }}
          >
            <option value="">Rasse auswählen</option>
            {rassen.map((group, index) => (
              <optgroup key={index} label={group.label}>
                {group.options.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="klasse" className="label">Klasse</label>
          <select 
            id="klasse"
            className="select"
            value={character.charakterInfo.klasse || ''}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="">Klasse auswählen</option>
            {klassen.map((group, index) => (
              <optgroup key={index} label={group.label}>
                {group.options.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;