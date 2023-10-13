import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  ListGroup
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_INVENTORY, ADD_PRODUCT_TO_INVENTORY, REMOVE_PRODUCT_FROM_INVENTORY } from '../util/mutations';
import { QUERY_ME } from '../util/queries';
import Bar from './inventories/Toolbar.component';
import InventoryCard from './inventories/InventoryCard.component';



const Inventories = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [ userData, setUserData ] = useState({});
  const [ decreaseProductQuantity ] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);
  const [ increaseProductQuantity ] = useMutation(ADD_PRODUCT_TO_INVENTORY);
  const [ removeInventory ] = useMutation(REMOVE_INVENTORY);


  useEffect(() => {
    if (data?.me) {
      setUserData(data.me)
 
    }
  }, [data]);
  
  
  const increaseProduct = async (inventoryId, productId) => {
    try {
      await increaseProductQuantity({
        variables: { inventoryId, productId }
      });
      // saveInventory(data.addProductToInventory);
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseProduct = async (inventoryId, productId, quantity) => {
    try {
      quantity = quantity - 1
      await decreaseProductQuantity({
        variables: { inventoryId, productId, quantity }
      });

      // saveInventory(data.removeProductFromInventory);
    } catch (err) {
      console.error(err);
    }
  };


  const handleRemoveInventory = async (inventoryId) => {
    try {
      await removeInventory({
        variables: { inventoryId }
      });
      // saveInventory(data.removeProductFromInventory);
    } catch (err) {
      console.error(err);
    }
  };


  const countAndMergeProducts = (products) => {
    const mergedProducts = [];
    products.forEach((product) => {
      const existingProduct = mergedProducts.find(
        (mergedProduct) => mergedProduct._id === product._id
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        mergedProducts.push({ ...product });
      }
    });
    return mergedProducts;
  };

  const mergedInventories = userData.inventories?.map((inventory) => {
    return {
      ...inventory,
      products: countAndMergeProducts(inventory.products),
    };
  });

  console.log(mergedInventories)


  
  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (userData.inventories?.length === 0) ? (
        <div>
          <h2 className="text-center">You have no saved Inventories!</h2>
        </div>
      ) : (    
        mergedInventories?.map((inventory) => {
          return(
            <InventoryCard key={inventory._id} inventory={inventory} increaseProduct={increaseProduct} decreaseProduct={decreaseProduct} removeInventory={handleRemoveInventory}/>
          )
        })
      )}
      <Bar />
    </Container>
  );
};

export default Inventories;
