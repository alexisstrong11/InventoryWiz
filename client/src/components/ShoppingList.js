import React, { useState } from 'react';

const ShoppingList = () => {
  // Sample shopping list data (you should replace this with your data)
  const initialShoppingList = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Bread' },
    { id: 3, name: 'Eggs' },
  ];

  // State to manage the shopping list
  const [shoppingList, setShoppingList] = useState(initialShoppingList);

  // Function to clear the shopping list
  const clearShoppingList = () => {
    setShoppingList([]);
  };

  return (
    <div>
      <h2>Your Shopping List</h2>
      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={clearShoppingList}>Clear List</button>
    </div>
  );
};

export default ShoppingList;