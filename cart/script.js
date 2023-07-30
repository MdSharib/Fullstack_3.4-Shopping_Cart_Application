

const cartItemsDiv = document.getElementById("cart-items");

document.addEventListener("DOMContentLoaded", function () {
  const getCartItems =JSON.parse(localStorage.getItem("cartItems"));
  console.log(getCartItems);
  if (getCartItems.length <= 0 ) {
    console.log("no items")
    // alert("unauthorized access! redirect to login page."); //add toster
    cartItemsDiv.innerHTML = `No cart Items!`
    return;
  };
  renderCartItems(getCartItems);
});


const renderCartItems = (getCartItems) => {
    let list = "";
    getCartItems.map((val) => {
         list += `<div class="item">
         <img src=${val["image"]} alt="Item" />
         <div class="info">
         <div>Title: ${val["title"]}</div>
         <div>Price: ${val["price"]}</div>
         </div>
         <button id="addBtn">Remove from Cart</button>
       </div>`;

    });
    cartItemsDiv.innerHTML = list;
}


