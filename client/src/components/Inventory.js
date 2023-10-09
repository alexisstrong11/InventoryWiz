import { useState } from 'react';

const Inventory = () => {
  // Sample inventory data (you should replace this with your data)
  const initialInventory = [
    { id: 1, name: 'Apples', quantity: 5 },
    { id: 2, name: 'Bananas', quantity: 3 },
    { id: 3, name: 'Oranges', quantity: 2 },
  ];

  // State to manage the inventory items
  const [inventory, setInventory] = useState(initialInventory);

  // State to manage form input fields
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  // Function to add an item to the inventory
  const addItemToInventory = () => {
    if (itemName && itemQuantity) {
      const newItem = {
        id: Date.now(), // You can use a unique ID generation method
        name: itemName,
        quantity: parseInt(itemQuantity),
      };

      setInventory([...inventory, newItem]);
      setItemName('');
      setItemQuantity('');
    }
  };

  // Function to edit an inventory item
  const editInventoryItem = (itemId, newName, newQuantity) => {
    const updatedInventory = inventory.map((item) =>
      item.id === itemId
        ? {
            ...item,
            name: newName,
            quantity: parseInt(newQuantity),
          }
        : item
    );
 
    


    setInventory(updatedInventory);
  };

  // Function to delete an inventory item
  const deleteInventoryItem = (itemId) => {
    const updatedInventory = inventory.filter((item) => item.id !== itemId);
    setInventory(updatedInventory);
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <div>
        
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />


          Quantity:
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />

        <button onClick={addItemToInventory}>Add Item</button>
      </div>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            <span>{item.name} (Quantity: {item.quantity})</span>
            <button onClick={() => editInventoryItem(item.id, 'New Name', 10)}>
              Edit
            </button>
            <button onClick={() => deleteInventoryItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;


