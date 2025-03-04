import React from 'react';
import { BookIcon, PackageIcon, ShoppingBagIcon, DiceIcon, SettingsIcon } from './Icons';

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="nav-header">
      <div className="container flex flex-wrap items-center justify-between">
        <h1>DSA Charakterbogen</h1>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('character')}
            className={`nav-btn ${activeTab === 'character' ? 'active' : ''}`}
          >
            <BookIcon /> Charakter
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          >
            <PackageIcon /> Inventar
          </button>
          <button 
            onClick={() => setActiveTab('shop')}
            className={`nav-btn ${activeTab === 'shop' ? 'active' : ''}`}
          >
            <ShoppingBagIcon /> Shop
          </button>
          <button 
            onClick={() => setActiveTab('dice')}
            className={`nav-btn ${activeTab === 'dice' ? 'active' : ''}`}
          >
            <DiceIcon /> Würfel
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <SettingsIcon /> Einstellungen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;