// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_INVENTORY } from '../../util/mutations';



const AddInventoryForm = () => {
  const [userFormData, setUserFormData] = useState({ inventoryName: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [createInventory, { error }] = useMutation(CREATE_INVENTORY);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const user = await createInventory({
        variables: { ...userFormData }
      });

    } catch (e) {
      console.error(e);
    }

    setUserFormData({
        inventoryName: '',
    });
    location.reload();
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with inventory creation!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='inventoryName'>Inventory Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='inventory name'
            name='inventoryName'
            onChange={handleInputChange}
            value={userFormData.inventoryName}
            required
          />
          <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.inventoryName)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddInventoryForm;
