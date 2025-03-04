import React from 'react';

const Inventory = ({ inventory, addToInventory, removeFromInventory }) => {
  return (
    <div>
      <h2>Inventar</h2>
      
      <div className="mb-4">
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            id="inventoryItemName"
            className="input flex-1"
            placeholder="Artikelname"
          />
          
          <button 
            className="btn btn-primary"
            onClick={() => {
              const itemName = document.getElementById('inventoryItemName').value;
              if (itemName.trim()) {
                addToInventory(itemName);
                document.getElementById('inventoryItemName').value = '';
              }
            }}
          >
            Hinzufügen
          </button>
          
          <button 
            className="btn btn-danger"
            onClick={() => {
              const itemName = document.getElementById('inventoryItemName').value;
              if (itemName.trim()) {
                removeFromInventory(itemName);
                document.getElementById('inventoryItemName').value = '';
              }
            }}
          >
            Entfernen
          </button>
        </div>
      </div>
      
      <div className="card">
        {inventory.length === 0 ? (
          <p className="italic">Dein Inventar ist leer.</p>
        ) : (
          <ul className="divide">
            {inventory.map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <span>{item.name}</span>
                <span className="bg-amber-200 px-2 py-1 rounded-full text-sm">{item.quantity}x</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Inventory;