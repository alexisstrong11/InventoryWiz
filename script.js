document.addEventListener("DOMContentLoaded", () => {
    const shoppingList = document.getElementById("shoppingList");
    const itemInput = document.getElementById("item");
    const addItemButton = document.getElementById("addItem");

    // Function to add a new item to the shopping list
    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName !== "") {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${itemName}
                <button class="delete-button">Delete</button>
            `;
            shoppingList.appendChild(listItem);
            itemInput.value = "";
            addDeleteListener(listItem);
        }
    }

    // Function to delete an item from the shopping list
    function deleteItem(item) {
        item.remove();
    }

    // Function to add a click event listener for deleting items
    function addDeleteListener(item) {
        const deleteButton = item.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            deleteItem(item);
        });
    }

    // Add item when the "Add" button is clicked
    addItemButton.addEventListener("click", () => {
        addItem();
    });

    // Add item when Enter key is pressed in the input field
    itemInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addItem();
        }
    });

    // Add click event listeners to existing items
    const existingItems = shoppingList.querySelectorAll("li");
    existingItems.forEach((item) => {
        addDeleteListener(item);
    });
});
