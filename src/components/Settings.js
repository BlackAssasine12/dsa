import React from 'react';

const Settings = ({ 
  theme, 
  setTheme, 
  setAllAttributesToMinOrMax, 
  freeSkillUpgrades, 
  setFreeSkillUpgrades, 
  showHiddenItems, 
  setShowHiddenItems 
}) => {
  return (
    <div className="card">
      <h2>Einstellungen</h2>
      
      <div className="space-y-6">
        <div>
          <h3>Design-Anpassungen</h3>
          
          <div className="grid grid-2 gap-4">
            <div className="form-group">
              <label htmlFor="fontFamily" className="label">Schriftart</label>
              <input 
                id="fontFamily" 
                type="text" 
                className="input"
                value={theme.fontFamily}
                onChange={(e) => setTheme({...theme, fontFamily: e.target.value})}
                placeholder="z.B. Arial, Verdana, Times New Roman"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="textColor" className="label">Textfarbe</label>
              <input 
                id="textColor" 
                type="color" 
                className="input h-10"
                value={theme.color.startsWith('#') ? theme.color : '#36251b'}
                onChange={(e) => setTheme({...theme, color: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3>Attribute</h3>
          
          <div className="flex gap-2">
            <button 
              className="btn btn-primary"
              onClick={() => setAllAttributesToMinOrMax(true)}
            >
              Alle auf Min setzen
            </button>
            
            <button 
              className="btn btn-primary"
              onClick={() => setAllAttributesToMinOrMax(false)}
            >
              Alle auf Max setzen
            </button>
          </div>
        </div>
        
        <div>
          <h3>Weitere Optionen</h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="freeSkillToggle"
                className="input-checkbox"
                checked={freeSkillUpgrades}
                onChange={e => setFreeSkillUpgrades(e.target.checked)}
              />
              <label htmlFor="freeSkillToggle">
                Kostenloses Steigern
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="hiddenItemsToggle"
                className="input-checkbox"
                checked={showHiddenItems}
                onChange={e => setShowHiddenItems(e.target.checked)}
              />
              <label htmlFor="hiddenItemsToggle">
                Ausgeblendete Items anzeigen
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;