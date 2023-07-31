// Write your script here

const firstName = document.getElementById("fName");
const lastName = document.getElementById("lName");


let user = [];

document.addEventListener("DOMContentLoaded", function () {
    const getCurrentUser =JSON.parse(localStorage.getItem("currentUser"));
    // if (getCartItems.length <= 0 ) {
    //   console.log("no items")
    //   // alert("unauthorized access! redirect to login page."); //add toster
    //   cartItemsDiv.innerHTML = `No cart Items!`
    //   return;
    // };

    user.push(getCurrentUser); 

    displayDetails();
});


