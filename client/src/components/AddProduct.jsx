import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT_TO_INVENTORY } from '../util/mutations'; 

function AddProduct({inventoryId}) {
  const [upc, setUpc] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(''); // New state for Quantity
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);


  // Use the useMutation hook from Apollo Client to execute the mutation
  const [saveProduct] = useMutation(ADD_PRODUCT_TO_INVENTORY);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the saveProduct mutation and pass the form data
      const { data } = await saveProduct({
        variables: {
          inventoryId : inventoryId,
          productInput: { 
            UPC: upc,
            brand : brand,
            category : category,
            description : description,
            name : name,
            price: parseFloat(price),
            //quantity: parseInt(quantity), // Convert quantity to an integer
        }
      },
      });

      if (data) {
        // Product saved successfully
        s
        setShowSuccessMessage(true);
        // Reset the form
        setUpc('');
        setBrand('');
        setCategory('');
        setDescription('');
        setName('');
        setPrice('');
        setQuantity(''); // Reset the Quantity field
      }
    } catch (error) {
      // Handle any errors, such as displaying an error message
      setShowErrorMessage(true);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>UPC</Form.Label>
          <Form.Control
            type="text"
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Add Product</Button>
      </Form>

      {showSuccessMessage && (
        <Alert variant="success">Product added successfully!</Alert>
      )}

      {showErrorMessage && (
        <Alert variant="danger">Error adding product. Please try again.</Alert>
      )}
    </div>
  );
}

export default AddProduct;