// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button


const totalAmountDiv = document.getElementById("total-amount");

let userCart= [];
let totalAmount = 0;

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
  if(getCartItems.length <= 0){
    alert("there are no items in cart! click to redirect.")
    window.location.href = "../shop";
    return;
  }

  userCart = JSON.parse(JSON.stringify(getCartItems));
  console.log(userCart);
  displayInfo();
});

const displayInfo = () => {
  userCart.forEach((val) => {
    totalAmount += val["price"];
  });
  totalAmountDiv.innerText = `Total: $${totalAmount.toFixed(2)}`;
}


document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_xV39ZNbgU1Du4V", 
    amount: Math.floor(totalAmount) * 100 ,//check this out if this is paisa or INR // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MeShop. Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#122620",
    },
    image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
    handler: function () { // run a function when your payment is successfull
      // alert("Payment Successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      location.href = "../cart";
    },
    options: {
      checkout: {
        method: {
          netbanking: 0,
          card: 0,
          upi: 1,
          wallet: 0,
        },
      },
    },
    prefill: {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+919886660660", // Dummy phone number for testing
    },
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  
  e.preventDefault();
};
