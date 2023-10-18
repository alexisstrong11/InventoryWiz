import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Container, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddProduct from '../AddProduct'
const InventoryCard = ({ inventory, increaseProduct, decreaseProduct }) => {



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

        InventoryCard.propTypes = {
            inventory: PropTypes.shape({
              _id: PropTypes.string.isRequired,
              inventoryName: PropTypes.string.isRequired,
              priceTotal: PropTypes.number.isRequired,
              products: PropTypes.arrayOf(PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
              })).isRequired,
            }).isRequired,
            increaseProduct: PropTypes.func.isRequired,
            decreaseProduct: PropTypes.func.isRequired,
            removeInventory: PropTypes.func.isRequired,
          };

export default InventoryCard;