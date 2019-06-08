$(function (){

    function addingItem(val){
        // return the list of html for the shipping item
        return `<li>
        <span class="shopping-item">${val}</span>
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
    
    

    function lineThruItem(){
        // Check button click
        // Toggleclass (shopping-item__checked) on the <span> of the list item
        $('.shopping-list').on('click', '.shopping-item-toggle', function(e){
            
            $(e.target).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
            console.log('Check Button Clicked');
        });
    }

    function deleteItem(){
        // Delete Button Click Listener
        // Remove the <li> tag for the clicked delete button from the <ul> shopping list.
        $('.shopping-list').on('click', '.shopping-item-delete', function(e){
            
            $(e.target).closest('li').remove();
        });
    }
    
    function createShoppingList(){
        // Prevent Default
        // add and button click event listener to the add item.
        // get value from the input 
        // call our addingItem() to append the html to the shopping list.
    }

    $(lineThruItem);
    $(deleteItem);

});