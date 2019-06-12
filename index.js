const STORE= {
  items: [
    {id: cuid(), name: "apples", checked: false},
    {id: cuid(), name: "oranges", checked: false},
    {id: cuid(), name: "milk", checked: true},
    {id: cuid(), name: "bread", checked: false}
  ],
  hideCompleted: false,
  searchTerm: null
}

function generateItemElement(item){
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
function generateShoppingItemsString(){
  console.log("`renderShoppingList` ran");
  const items = STORE.items.map((item, index) => {
    return generateItemElement(item);
  });
  // console.log(items);
  return items.join("");
}

// Renders the items in the STORE in the <ul> tag
function renderShoppingList(){
  const itemsString = generateShoppingItemsString();
  $('.shopping-list').html(itemsString);
}

// This function returns the Id attribute of the <li> tag in which the buttons are clicked
function getItemID(e){
  return $(e.target).closest('li').attr('id');
}

// This function returns the index of the item whose ID is passed as the parameter
function findItemIndex(id){
  let itemIndex = null;
  STORE.items.find((item, index) => {
    if(item.id === id){
      itemIndex = index;
    }
  });
  return itemIndex;
}

// Toggle the checked property for the item whose id is passed as the argument
function checkUncheckItem(id){
  const index = findItemIndex(id);
  STORE.items[index].checked = !STORE.items[index].checked;
}

// This function handles the check button click functionality done by the user 
// to check/uncheck an item in the shopping list.
function handleCheckItem(){
    
    // Event Listener for the click button on an item
    $('.shopping-list').on('click', '.shopping-item-toggle', function(e){
        
        // get of the item for which the user wants to check / uncheck
        const itemID = getItemID(e);

        // callback for the function that does the check/uncheck function
        checkUncheckItem(itemID);
        
        // Render the shopping list once the check/uncheck is complete
        renderShoppingList();

    });
}

function deleteItemFromStore(id){
  // Find the item in the STORE.items and delete it.
  let itemIndex = 0;
  STORE.items.find((item,index) => {
    if(item.id === id){
      itemIndex = index;
    }
  });
  
  // console.log(deleteItemIndex);

  STORE.items.splice(itemIndex,1);
}

function handleDeleteItem(){
    // Delete Button Click Listener
    // Remove the <li> tag for the clicked delete button from the <ul> shopping list.
    $('.shopping-list').on('click', '.shopping-item-delete', function(e){
      console.log("delete item button clicked");

        const itemID = $(e.target).closest('li').attr('id');

        deleteItemFromStore(itemID);
        renderShoppingList();
    });
}

// Adding an Item to the STORE.items 
function addItemToStore(item){
  STORE.items.push({name: item, checked: false});
}

function handleAddItem(){
    // add and button click event listener to the add item.
    // get value from the input 
    // call our addingItem() to append the html to the shopping list.

    $("#js-shopping-list-form").on("submit", function(e) {
      e.preventDefault();
      
      //getting the value input by the user
      const value = $("#shopping-list-entry").val();
      
      addItemToStore(value);
      renderShoppingList();

      // clearing the input field once add item is completed
      $('#shopping-list-entry').val('');
    })
}

//main function that does call backs for the complete shopping list
function handleShoppingList(){
    renderShoppingList();
    handleCheckItem();
    handleDeleteItem();
    handleAddItem();
}


$(handleShoppingList);