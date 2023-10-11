import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  ListGroup
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PRODUCT_TO_INVENTORY, REMOVE_PRODUCT_FROM_INVENTORY } from '../util/mutations';
import { QUERY_ME } from '../util/queries';


import Auth from '../util/auth';
//import { removeProductId } from '../util/localStorage';


const Inventories = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  const [ decreaseProductQuantity ] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);
  const [ increaseProductQuantity ] = useMutation(ADD_PRODUCT_TO_INVENTORY);
  const [ inventories, setInventories ] = useState([{}]);


  useEffect(() => {
    if (data?.me) {
      setUserData(data.me)
      setInventories(data.me.inventories)
    }
  }, [data]);
  
  
  const increaseProduct = async (inventoryId, productId) => {
    try {
      const inventory = await increaseProductQuantity({
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
      const inventory = await decreaseProductQuantity({
        variables: { inventoryId, productId, quantity }
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
          <Card bg='dark' text='light' style={{ width: '28rem' }} key={inventory._id}>
            <Card.Header><h3>{inventory.inventoryName} {`$${inventory.priceTotal.toFixed(2)}`}</h3></Card.Header>
            
            <h5>Products:</h5>
            <ListGroup variant='flush' >
            {inventory.products?.map((product) => {
              return(
              <ListGroup.Item key={product._id + product.quantity } style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h4>{product.quantity} {product.name}</h4>
                  <Container fluid='true' >{`$${product.quantity * product.price.toFixed(2)}`}
                  <Button color='dark' style={{width: '2rem' }} onClick={() => increaseProduct(inventory._id, product._id)}>+</Button>
                  <Button color='dark' style={{width: '2rem' }} onClick={() => decreaseProduct(inventory._id, product._id, product.quantity)}>-</Button>
                  
                  </Container>
                  


              </ListGroup.Item>)
              
            })}
            </ListGroup>

          </Card>
      
          )
        }
        )
      )}

    </Container>

  );
};

export default Inventories;
