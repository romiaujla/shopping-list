const STORE = {
  items: [
    { id: cuid(), name: "apples", checked: false },
    { id: cuid(), name: "oranges", checked: false },
    { id: cuid(), name: "milk", checked: true },
    { id: cuid(), name: "bread", checked: false }
  ],
  hideCompleted: false,
  searchTerm: null
}

function generateItemElement(item) {
  // return the list of html for the shipping item
  return `<li id="${item.id}">
    <span class="shopping-item 
    ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

// This function returns the string for the Shopping List HTML 
// which will be rendered to the Page
function generateShoppingItemsString() {

  const items = STORE.items.map((item, index) => {
    return generateItemElement(item);
  });
  // console.log(items);
  return items.join("");
}

// Renders the items in the STORE in the <ul> tag
function renderShoppingList() {
  const itemsString = generateShoppingItemsString();
  $('.shopping-list').html(itemsString);
}

// This function returns the Id attribute of the <li> tag in which the buttons are clicked
function getItemID(e) {
  return $(e.target).closest('li').attr('id');
}

// This function returns the index of the item whose ID is passed as the parameter
function findItemIndex(id) {
  let itemIndex = null;
  STORE.items.find((item, index) => {
    if (item.id === id) {
      itemIndex = index;
    }
  });
  return itemIndex;
}

// Toggle the checked property for the item whose id is passed as the argument
function checkUncheckItem(id) {
  const index = findItemIndex(id);
  STORE.items[index].checked = !STORE.items[index].checked;
}

// This function handles the check button click functionality done by the user 
// to check/uncheck an item in the shopping list.
function handleCheckItem() {

  // Event Listener for the click button on an item
  $('.shopping-list').on('click', '.shopping-item-toggle', function (e) {

    // get id of the item for which the user wants to check / uncheck
    const itemID = getItemID(e);

    // callback for the function that does the check/uncheck function
    checkUncheckItem(itemID);

    // Render the shopping list once the check/uncheck is complete
    renderShoppingList();

  });
}

function deleteItemFromStore(id) {
  // Find the item in the STORE.items and delete it.
  const itemIndex = findItemIndex(id); 

  // Remove the item using the .splice(starIndexToRemove, 1 = the number of items to remove from the start index)
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItem() {
  // Delete Button Click Listener
  // Remove the <li> tag for the clicked delete button from the <ul> shopping list.
  $('.shopping-list').on('click', '.shopping-item-delete', function (e) {

    // get id of the item that user wants to delete
    const itemID = getItemID(e);

    // deletes the Item from the STORE
    deleteItemFromStore(itemID);

    // Renders the shopping list once the Item is Removed from the STORE
    renderShoppingList();
  });
}

// Adding an Item to the STORE.items 
function addItemToStore(item) {
  STORE.items.push({ id: cuid(), name: item, checked: false });
}

function handleAddItem() {
  
  // Handles the Add Item button click 
  $("#js-shopping-list-form").on("submit", function (e) {
    // Prevents page from submitting and refreshing automatically
    e.preventDefault();

    // getting the value input by the user
    const value = $("#shopping-list-entry").val();

    // callback to the function that adds item to the STORE
    addItemToStore(value);

    // Once the item is added, render the updated shopping list
    renderShoppingList();

    // clearing the input field once add item is completed
    $('#shopping-list-entry').val('');
  })
}

// Main function that does call backs for the handling all the operations of shopping list
function handleShoppingList() {
  renderShoppingList();
  handleCheckItem();
  handleDeleteItem();
  handleAddItem();
}

// callback our main function once DOM is ready.
$(handleShoppingList);