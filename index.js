const STORE = {
  items:[
    {id: cuid(), name: "apples", checked: false},
    {id: cuid(), name: "oranges", checked: false},
    {id: cuid(), name: "milk", checked: true},
    {id: cuid(), name: "bread", checked: false}
  ],
  hideCompleted: false,
  searchTerm: null,
};

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

function generateShoppingItemsString(){

  console.log("`renderShoppingList` ran");
  const items = STORE.items.map((item, index) => {
    return generateItemElement(item);
  });
  // console.log(items);
  return items.join("");
}

function renderShoppingList(){
  const itemsString = generateShoppingItemsString();
  $('.shopping-list').html(itemsString);
}

function findItemIndexInStore(itemName) {
  let itemIndex = 0;
  STORE.items.find((item,index) => {
    if(item.name === itemName){
      itemIndex = index;
    }
  });
  return itemIndex;
}

function changeCheckedProperty(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function handleCheckItem(){
    // Check button click
    // Toggleclass (shopping-item__checked) on the <span> of the list item
    $('.shopping-list').on('click', '.shopping-item-toggle', function(e){
        
        $(e.target).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
        console.log('Check Button Clicked');

        const itemName = $(e.target).closest('li').find('.shopping-item').html();
        const index = findItemIndexInStore(itemName);
        changeCheckedProperty(index);
        renderShoppingList();
    });
}


function deleteItemFromStore(itemName){
  // Find the item in the store and delete it.
  let deleteItemIndex = 0;
  STORE.items.find((item,index) => {
    if(item.name === itemName){
      deleteItemIndex = index;
    }
  });
  
  // console.log(deleteItemIndex);

  STORE.items.splice(deleteItemIndex,1);
}

function handleDeleteItem(){
    // Delete Button Click Listener
    // Remove the <li> tag for the clicked delete button from the <ul> shopping list.
    $('.shopping-list').on('click', '.shopping-item-delete', function(e){
      console.log("delete item button clicked");

        const itemToBeDeleted = $(e.target).closest('li').find('.shopping-item').html();

        deleteItemFromStore(itemToBeDeleted);
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