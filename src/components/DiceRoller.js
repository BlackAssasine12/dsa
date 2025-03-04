import React from 'react';

const DiceRoller = ({ diceSettings, diceResults, setDiceSettings, handleDiceTypeChange, rollDice }) => {
  return (
    <div className="card">
      <h2>Würfel</h2>
      
      <div className="grid grid-2 gap-4 mb-4">
        <div className="form-group">
          <label htmlFor="diceCount" className="label">Anzahl der Würfel</label>
          <input 
            id="diceCount" 
            type="number" 
            className="input"
            value={diceSettings.count}
            onChange={(e) => setDiceSettings({...diceSettings, count: parseInt(e.target.value) || 1})}
            min="1"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="diceType" className="label">Würfeltyp</label>
          <select 
            id="diceType"
            className="select"
            value={diceSettings.type}
            onChange={(e) => handleDiceTypeChange(e.target.value)}
          >
            <option value="d100">d100</option>
            <option value="d20">d20</option>
            <option value="d10">d10</option>
            <option value="d6">d6</option>
            <option value="custom">Benutzerdefiniert</option>
          </select>
        </div>
        
        {diceSettings.type === 'custom' && (
          <div className="form-group">
            <label htmlFor="diceSides" className="label">Würfelseiten</label>
            <input 
              id="diceSides" 
              type="number" 
              className="input"
              value={diceSettings.sides}
              onChange={(e) => setDiceSettings({...diceSettings, sides: parseInt(e.target.value) || 2})}
              min="2"
            />
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <button 
          className="btn btn-primary w-full"
          onClick={rollDice}
        >
          Würfeln
        </button>
      </div>
      
      {diceResults.length > 0 && (
        <div className="card flex flex-wrap gap-2">
          {diceResults.map((result, index) => (
            <div 
              key={index}
              className={`
                w-12 h-12 flex items-center justify-center rounded-lg font-bold text-lg
                ${result.isMax ? 'bg-red-500 text-white' : 
                  result.isMin ? 'bg-green-500 text-white' : 'bg-white text-amber-900'}
                border-2 ${result.isMax ? 'border-red-600' : 
                  result.isMin ? 'border-green-600' : 'border-amber-300'}
              `}
            >
              {result.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;