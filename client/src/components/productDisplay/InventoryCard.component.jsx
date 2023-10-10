import { useState } from 'react';
import { removeProductId } from '../../util/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_PRODUCT_FROM_INVENTORY } from '../../util/mutations';0

const Inventory = (products) => {
  const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);

  // Sample inventory data (you should replace this with your data)
  const initialInventory = [
    { id: 1, name: 'Apples', quantity: 5 },
    { id: 2, name: 'Bananas', quantity: 3 },
    { id: 3, name: 'Oranges', quantity: 2 },
  ];

  // State to manage the inventory products
  const [inventory, setInventory] = useState(initialInventory);

  // State to manage form input fields
  const [productName, setProductName] = useState('');
  const [inventoryProductQuantity, setInventoryProductQuantity] = useState('');

  // Function to add an product to the inventory
  const addProductToInventory = () => {
    if (productName && inventoryProductQuantity) {
      const newProduct = {
        id: Date.now(), // You can use a unique ID generation method
        name: productName,
        quantity: parseInt(inventoryProductQuantity),
      };

      setInventory([...inventory, newProduct]);
      setProductName('');
      setInventoryProductQuantity('');
    }
  };

  // Function to edit an inventory product
  const editInventoryProduct = (productId, newName, newQuantity) => {
    const updatedInventory = inventory.map((product) =>
      product.id === productId
        ? {
            ...product,
            name: newName,
            quantity: parseInt(newQuantity),
          }
        : product
    );
 
  const handleRemoveInventoryProduct = async (productId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeProduct({
        variables: {
          productId: productId }
        });

      // upon success, remove product's id from localStorage
      
      removeProductId(productId);
      setUserData(response.data.removeProduct)
    } catch (err) {
      console.error(err);
    }
  };



    setInventory(updatedInventory);
  };

  // Function to delete an inventory product
  const handleRemoveInventoryProduct = (productId) => {
    const updatedInventory = inventory.filter((product) => product.id !== productId);
    setInventory(updatedInventory);
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <div>
        
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />


          Quantity:
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setInventoryProductQuantity(e.target.value)}
          />

        <button onClick={addProductToInventory}>Add Product</button>
      </div>
      <ul>
        {inventory.map((product) => (
          <li key={product.id}>
            <span>{product.name} (Quantity: {product.quantity})</span>
            <button onClick={() => editInventoryProduct(product.id, 'New Name', 10)}>
              Edit
            </button>
            <button onClick={() => handleRemoveInventoryProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;


