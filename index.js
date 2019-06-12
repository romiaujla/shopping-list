const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

function generateItemElement(val,checked){
    // return the list of html for the shipping item
    return `<li>
    <span class="shopping-item 
    ${checked ? 'shopping-item__checked' : ''}">${val}</span>
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
  const items = STORE.map((item, index) => {
    return generateItemElement(item.name, item.checked);
  });
  // console.log(items);
  return items.join("");
}

function renderShoppingList(){
  const itemsString = generateShoppingItemsString();
  $('.shopping-list').html(itemsString);
}

function handleCheckItem(){
    // Check button click
    // Toggleclass (shopping-item__checked) on the <span> of the list item
    $('.shopping-list').on('click', '.shopping-item-toggle', function(e){
        
        $(e.target).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
        console.log('Check Button Clicked');
    });
}

function deleteItemFromStore(itemName){
  // Find the item in the store and delete it.
  let deleteItemIndex = 0;
  STORE.find((item,index) => {
    if(item.name === itemName){
      deleteItemIndex = index;
    }
  });
  
  // console.log(deleteItemIndex);

  STORE.splice(deleteItemIndex,1);
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

// Adding an Item to the STORE 
function addItemToStore(item){
  STORE.push({name: item, checked: false});
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