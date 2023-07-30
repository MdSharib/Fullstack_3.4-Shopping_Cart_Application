
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorSection = document.getElementById("error-section");

// ensuring users cannot manually navigate to the "index" page unless they click logout
// document.addEventListener("DOMContentLoaded", function () {
//   const token = localStorage.getItem("userToken");
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   if (isLoggedIn === "true" || token) {
//     // alert("unauthorized access! redirect to login page."); //add toster
//     window.location.href = "./profile";
//     return;
//   }
// });

const clearingFields = (token) => {
  alert("Successfully registered!");
  userName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("userToken", JSON.stringify(token));
  window.location.href = "../shop";
};

// setting up local storage
const checkLocalStorage = (userData) => {
  let users = JSON.parse(localStorage.getItem("users"));
  // console.log(typeof users);
  if (!users) {
    alert("no entries found!");
    return;
  }

  const existingUser = users.find((val) => {
    if(val["email"] === userData.email){
        return val;
    }
  });
  if (!existingUser) {
    alert("email is not registered");
    return;
  }

//   console.log(parseInt(existingUser.pasword));
//   console.log(parseInt(userData.password))
  if (parseInt(userData.password) !== parseInt(existingUser.password)) {
    errorSection.innerText = "Error: Invalid password!";
    return;
  }

console.log("local passed")
//   users.push(userData);
  localStorage.setItem("currentUser", JSON.stringify(existingUser));
  localStorage.setItem("isLoggedIn", true);
  window.location.href = "../shop";
//   clearingFields(userData.token);
};


// fetching and validating user input
const loginBtnHandler = (ev) => {
  ev.preventDefault();
  if (
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    errorSection.innerText = "Error: all fields are mandatory!";
    // alert("all fields are mandatory!");
    return;
  }

  

  let token =
    (Math.random() + " ").substring(2, 10) +
    (Math.random() + " ").substring(2, 10);
  let user = {
    email: email.value,
    password: password.value,
    token: token,
  };
  checkLocalStorage(user);
  // console.log(user);
};

loginBtn.addEventListener("click", loginBtnHandler);