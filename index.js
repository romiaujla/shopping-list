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

function handleDeleteItem(){
    // Delete Button Click Listener
    // Remove the <li> tag for the clicked delete button from the <ul> shopping list.
    $('.shopping-list').on('click', '.shopping-item-delete', function(e){
      console.log("delete item button clicked");
        
        $(e.target).closest('li').remove();
    });
}

function handleAddItem(){
    // add and button click event listener to the add item.
    // get value from the input 
    // call our addingItem() to append the html to the shopping list.

    $("#js-shopping-list-form").on("submit", function(e) {
      e.preventDefault();
      console.log("add button item clicked");
      const value = $("#shopping-list-entry").val();
      console.log(value);
      $(".shopping-list").append(generateItemElement(value,false));
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