import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Container, NavDropdown } from 'react-bootstrap';

import AddProduct from '../AddProduct'
import { useMutation } from '@apollo/client';
import { REMOVE_PRODUCT_FROM_INVENTORY, ADD_PRODUCT_TO_INVENTORY } from '../../util/mutations';


const InventoryCard = ({ inventory }) => {
  const [ decreaseProductQuantity ] = useMutation(REMOVE_PRODUCT_FROM_INVENTORY);
  const [ increaseProductQuantity ] = useMutation(ADD_PRODUCT_TO_INVENTORY);

  const increaseProduct = async (inventoryId, productId) => {
    try {
      await increaseProductQuantity({
        variables: { inventoryId, productId }
      });
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
    } catch (err) {
      console.error(err);
    }
  };




return(
    <Card bg='dark' text='light' className='w-100 my-5' key={inventory._id}>
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
    <NavDropdown
        title="Add New Products"
        id={`offcanvasNavbarDropdown-expand-${false}`}
        >
        <AddProduct inventoryId={inventory._id}/>
        </NavDropdown>
    </Card>
)
  };

export default InventoryCard;