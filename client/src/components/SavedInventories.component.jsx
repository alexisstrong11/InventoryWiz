import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_PRODUCT_FROM_INVENTORY } from '../util/mutations';
import { QUERY_ME } from '../util/queries';


import Auth from '../util/auth';
//import { removeProductId } from '../util/localStorage';


const Inventories = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  const [ removeProductFromInventory ] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);

  useEffect(() => {
    if (data?.me) {
      setUserData(data.me)
      
    }
  }, [data]);
  
  const removeProduct = (inventoryId, productId) => {
    let newData = removeProductFromInventory({
      variables: { inventoryId, productId }
    });
    console.log(newData)
    setUserData(newData)
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
          <Card style={{ width: '18rem' }} key={inventory._id}>
            <h2>{inventory.inventoryName}</h2>
            <h4>Inventory Total: {`$${inventory.priceTotal.toFixed(2)}`}</h4>
            <h3>Products:</h3>
            {inventory.products?.map((product) => {
              return(<li key="product._id">{product.name} - {product.quantity} Price: {`$${product.quantity * product.price.toFixed(2)}`}
              <Button color='dark' onClick={() => removeProduct(inventory._id, product._id)}>X</Button>
              </li>)
            })}
          </Card>
      
          )
        }
        )
      )}

    </Container>

  );
};

export default Inventories;
