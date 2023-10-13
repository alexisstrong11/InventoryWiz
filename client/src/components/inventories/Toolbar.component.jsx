import React, { useState } from 'react';
import { ButtonToolbar, Modal, Button } from 'react-bootstrap';
import AddInventoryForm from './AddInventoryModal.component';


const Bar = () => {
    const [ showAddInventoryModal, setShowAddInventoryModal ] = useState(false);

    return (
        <>
        <ButtonToolbar className="justify-content-between">
            <Button variant="primary" onClick={() => setShowAddInventoryModal(true)}>Add new inventory</Button>
            <Button variant="secondary">Button 2</Button>
        </ButtonToolbar>
        <Modal
        size='lg'
        show={showAddInventoryModal}
        onHide={() => setShowAddInventoryModal(false)}
        aria-labelledby='signup-modal'>
        <Modal.Header closeButton>
            <Modal.Title id='add-inventory-modal'>
             Add new inventory
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddInventoryForm handleModalClose={() => setShowAddInventoryModal(false)} />
        </Modal.Body>
      </Modal>
      </>
    );
};

export default Bar;
