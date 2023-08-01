

const cartItemsDiv = document.getElementById("cart-items");
const checkoutContent = document.getElementById("checkout-content");
const totalPriceDiv = document.getElementById("total-price");
const userNav = document.getElementById("user-nav");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

let cartItems = [];

document.addEventListener("DOMContentLoaded", function () {
  const getCurrentUser =JSON.parse(localStorage.getItem("currentUser"));
  const getCartItems =JSON.parse(localStorage.getItem("cartItems"));

  const token = localStorage.getItem("userToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "false" || !token) {
    // alert("unauthorized access! redirect to login page."); //add toster
    window.location.href = "../index.html";
    return;
  }


  if (getCartItems.length <= 0 ) {
    console.log("no items")
    // alert("unauthorized access! redirect to login page."); //add toster
    cartItemsDiv.innerHTML = `No cart Items!`
    return;
  };
  userNav.innerText = `Hello! ${getCurrentUser.firstName}`;
  if (getCartItems) {
    cartCount.innerText = getCartItems.length;
    }
  cartItems = JSON.parse(JSON.stringify(getCartItems));
  renderCartItems();
  renderCheckoutItems();
});


const renderCartItems = (getCartItems) => {
  
    let list = "";
    cartItems.map((val) => {
         list += `<div class="item">
         <img src=${val["image"]} alt="Item" />
         <div class="info">
         <div>Title: ${val["title"]}</div>
         <div>Price: ${val["price"]}</div>
         </div>
         <button id="removeBtn" value=${val["id"]} onClick="removeBtnHandler(this)">Remove From Cart</button>
       </div>`;

    });
    cartItemsDiv.innerHTML = list;
}



// remove btn handler
const removeBtnHandler = (ev) => {
  const id = ev.value;

  const toRemove = cartItems.find((val) => {
    if(+id === +val["id"]){
      return val;
    }
  });
  const newCart = cartItems.filter((val) => {
    if(+toRemove["id"] !== +val["id"]){
      return val;
    }
  });

  cartItems = JSON.parse(JSON.stringify(newCart));
  
    cartCount.innerText = newCart.length;
    

  renderCartItems();
  renderCheckoutItems();
  

 localStorage.setItem("cartItems", JSON.stringify(cartItems));

  
}


// proceed to checkout
const checkoutBtnHandler =() => {
  if(cartItems.length <= 0) {
    alert("Please add items to cart before payment!");
    return;
  }

  window.location.href = "../razorpay";
}



// checkout cart 
const renderCheckoutItems = (getCheckoutItems) => {
  let list = "";
  let totalPrice = 0;
  cartItems.map((val) => {
         list += `<div class="checkout-items">
         <div class="checkout-title">1. ${val["title"]}</div>
         <div class="checkout-price">$${val["price"]}</div>
       </div>`;
      totalPrice += val["price"];
    });
    totalPriceDiv.innerHTML = `$ ${totalPrice.toFixed(2)}`;
    checkoutContent.innerHTML = list;
}

checkoutBtn.addEventListener("click", checkoutBtnHandler);
