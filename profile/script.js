// Write your script here

const firstName = document.getElementById("fName");
const lastName = document.getElementById("lName");
const saveInfoBtn = document.getElementById("save-info-btn");
const changePasswordBtn = document.getElementById("change-pass-btn");
const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-new-password");
const userNav = document.getElementById("user-nav");
const cartCount = document.getElementById("cart-count");


let user = [];

document.addEventListener("DOMContentLoaded", function () {
    const getCurrentUser =JSON.parse(localStorage.getItem("currentUser"));
    const itemCart = JSON.parse(localStorage.getItem("cartItems"));
    // if (getCartItems.length <= 0 ) {
    //   console.log("no items")
    //   // alert("unauthorized access! redirect to login page."); //add toster
    //   cartItemsDiv.innerHTML = `No cart Items!`
    //   return;
    // };

    if (itemCart) {
        cartCount.innerText = itemCart.length;
    }
    userNav.innerText = `Hello! ${getCurrentUser.firstName}`;

    user.push(getCurrentUser); 

    displayDetails();
});



const displayDetails = () => {
    firstName.value = user[0]["firstName"];
    lastName.value = user[0]["lastName"];
    console.log(user)
}



// catching and saving first and last name
const saveInfoBtnHandler = () => {

    const newFirstName = firstName.value ;
    const newLastName = lastName.value;
    user[0].firstName = newFirstName;
    user[0].lastName = newLastName;
    const newUser = user[0];
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    const getAllUsers =JSON.parse(localStorage.getItem("users"));
    const newUsers = getAllUsers.map((val) => {
        if(val["email"] === newUser["email"]){
            val.firstName = newFirstName;
    val.lastName = newLastName;
        };
        return val;
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
    clearFields();
    alert("Successfully Updated!")
}

// catchig password values
const changePasswordBtnHandler = () => {
    const enteredOldPassword = oldPassword.value;
    const enteredNewPassword = newPassword.value;
    const enteredConfirmPassword = confirmPassword.value;

    if(enteredNewPassword !== enteredConfirmPassword){
        alert("please enter same password");
        return;
    }
    if((user[0]["password"]) !== enteredOldPassword){
        alert("please enter correct old password");
        return;
    }
    user[0].password = enteredNewPassword;
    const newUser = user[0];


    localStorage.setItem("currentUser", JSON.stringify(newUser));
    const getAllUsers =JSON.parse(localStorage.getItem("users"));
    const newUsers = getAllUsers.map((val) => {
        if(val["email"] === newUser["email"]){
            val["password"] = newUser["password"];
        };
        return val;
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
    clearFields();
    alert("Successfully Updated!");

}


// clearing fields after updation
const clearFields = () => {
   oldPassword.value = "";
     newPassword.value = "";
    confirmPassword.value = "";
}

saveInfoBtn.addEventListener("click", saveInfoBtnHandler)
changePasswordBtn.addEventListener("click", changePasswordBtnHandler);