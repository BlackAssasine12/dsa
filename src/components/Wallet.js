import React from 'react';

const Wallet = ({ wallet, updateWallet, convertWallet, setWallet }) => {
  return (
    <div className="card">
      <h2>Geldbeutel</h2>
      
      <div className="grid grid-2 gap-4 mb-4">
        <div className="form-group">
          <label htmlFor="walletAmount" className="label">Betrag</label>
          <input 
            id="walletAmount" 
            type="number" 
            className="input"
            defaultValue={0}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="walletCurrency" className="label">Währung</label>
          <select 
            id="walletCurrency"
            className="select"
            defaultValue="dukaten"
          >
            <option value="dukaten">Dukaten</option>
            <option value="silber">Silberlinge</option>
            <option value="heller">Heller</option>
            <option value="kreuzer">Kreuzer</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <button 
          className="btn btn-primary flex-1"
          onClick={() => {
            const amount = document.getElementById('walletAmount').value;
            const currency = document.getElementById('walletCurrency').value;
            updateWallet(currency, parseFloat(amount));
          }}
        >
          Hinzufügen
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={convertWallet}
        >
          Umrechnen
        </button>
      </div>
      
      <div className="grid grid-2 gap-y-2">
        <div className="font-semibold">Dukaten:</div>
        <div>{wallet.dukaten || 0}</div>
        
        <div className="font-semibold">Silberlinge:</div>
        <div>{wallet.silber || 0}</div>
        
        <div className="font-semibold">Heller:</div>
        <div>{wallet.heller || 0}</div>
        
        <div className="font-semibold">Kreuzer:</div>
        <div>{wallet.kreuzer || 0}</div>
      </div>
      
      <button 
        className="btn btn-danger w-full mt-4"
        onClick={() => {
          if (window.confirm('Möchtest du wirklich den Geldbeutel zurücksetzen?')) {
            setWallet({ dukaten: 0, silber: 0, heller: 0, kreuzer: 0, wInsg: 0 });
          }
        }}
      >
        Geldbeutel zurücksetzen
      </button>
    </div>
  );
};

export default Wallet;