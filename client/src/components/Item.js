import { useState } from 'react';

const Item = ({ id, name, quantity, onEdit, onDelete }) => {
  // State to manage item editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  // Function to toggle item editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing); 
  };

  // Function to save edited item
  const saveEditedItem = () => {
    // Perform validation if needed
    if (editedName && editedQuantity) {
      onEdit(id, editedName, editedQuantity);
      setIsEditing(false);
    }
  };

  function removeItem(button) {
    const listItem = button.parentElement;
    listItem.remove();
}

function addItem() {
  if (itemText === "") {
      alert("Please enter an item.");
      return;
  }


  //<button onclick="removeItem(this)">Delete</button>

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
          />
          <button onClick={saveEditedItem}>Save</button>
          <button onClick={toggleEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{name} (Quantity: {quantity})</span>
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </li>
  );
}};
export default Item;