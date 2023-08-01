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
const logoutBtn = document.getElementById("logout-btn");


let user = [];

document.addEventListener("DOMContentLoaded", function () {
    const getCurrentUser =JSON.parse(localStorage.getItem("currentUser"));
    const itemCart = JSON.parse(localStorage.getItem("cartItems"));
    const token = localStorage.getItem("userToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (getCartItems.length <= 0 ) {
    //   console.log("no items")
    //   // alert("unauthorized access! redirect to login page."); //add toster
    //   cartItemsDiv.innerHTML = `No cart Items!`
    //   return;
    // };
  
  // if (getCartItems.length <= 0 ) {
  //   console.log("no items")
  //   // alert("unauthorized access! redirect to login page."); //add toster
  //   cartItemsDiv.innerHTML = `No cart Items!`
  //   return;
  // };

  if (isLoggedIn === "false" || !token) {
    // alert("unauthorized access! redirect to login page."); //add toster
    window.location.href = "../index.html";
    return;
  }

    if (itemCart) {
        cartCount.innerText = itemCart.length;
    }
    userNav.innerText = `Hello! ${getCurrentUser.firstName}`;

    user.push(getCurrentUser); 

    displayDetails();
});


// toast notification
const notifications = document.querySelector(".notifications");

const createToast = (text) => {
  const timer = 5000;
  const toast = document.createElement("li");
  toast.className = `toast success`;

  toast.innerHTML = `<div class="column">
												<i class="fa-solid fa-circle-check"></i>
												<span style="color: black">${text}</span>
										</div>
										<i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);

  toast.timeoutId = setTimeout(() => removeToast(toast), timer);
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};



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
    userNav.innerText = `Hello! ${newFirstName}`;
        };
        return val;
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
    clearFields();
    createToast("Updated Successfully!")
}

// catchig password values
const changePasswordBtnHandler = () => {
    const enteredOldPassword = oldPassword.value;
    const enteredNewPassword = newPassword.value;
    const enteredConfirmPassword = confirmPassword.value;

    if(enteredNewPassword !== enteredConfirmPassword){
        createToast("please enter same password");
        return;
    }
    if((user[0]["password"]) !== enteredOldPassword){
        createToast("please enter correct old password");
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
    createToast("Updated Successfully!");

}


// clearing fields after updation
const clearFields = () => {
   oldPassword.value = "";
     newPassword.value = "";
    confirmPassword.value = "";
}


// logout btn functionality
const logoutBtnHandler = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("userToken");
    localStorage.setItem("isLoggedIn", false);
    window.location.href = "../index.html";
    return;
}

saveInfoBtn.addEventListener("click", saveInfoBtnHandler)
changePasswordBtn.addEventListener("click", changePasswordBtnHandler);
logoutBtn.addEventListener("click", logoutBtnHandler);