import React from 'react';
import { PlusIcon, MinusIcon } from './Icons';

const Shop = ({ shopData, shopOpen, setShopOpen, addToInventory }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="m-0">Reise-Shop</h2>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShopOpen(!shopOpen)}
        >
          {shopOpen ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div>
      
      {shopOpen && (
        <div className="max-h-96 overflow-y-auto pr-2">
          {Object.keys(shopData).length === 0 ? (
            <p className="italic">Lade Shop-Daten...</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(shopData).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-2 divider">{category}</h3>
                  <ul className="divide">
                    {items.map((item, index) => (
                      <li key={index} className="py-2 flex justify-between items-center">
                        <div>
                          <span className="font-medium">{item.Item}</span>
                          <span className="ml-2">{item.Preis} {item.Währung}</span>
                        </div>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => addToInventory(item.Item, item.Preis, item.Währung)}
                        >
                          Kaufen
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;