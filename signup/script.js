const userName = document.getElementById("user-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cpassword");
const continueBtn = document.getElementById("continue-btn");
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
  // localStorage.setItem("isLoggedIn", true);
  // localStorage.setItem("userToken", JSON.stringify(token));
  window.location.href = "../shop";
};

// setting up local storage
const setLocalStorage = (userData) => {
  let users = JSON.parse(localStorage.getItem("users"));
  // console.log(typeof users);
  if (!users) {
    users = [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    clearingFields();
    return;
  }

  const existingUser = users.find((val) => {
    return val["email"] === userData.email;
  });
  if (existingUser) {
    alert("email already registered");
    return;
  }
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  clearingFields();
};


// fetching and validating user input
const signUpFn = (ev) => {
  ev.preventDefault();
  if (
    userName.value.trim() === "" ||
    lastName.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === "" ||
    confirmPassword.value.trim() === ""
  ) {
    errorSection.innerText = "Error: all fields are mandatory!";
    // alert("all fields are mandatory!");
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorSection.innerText = "Error: please enter same password";
    // alert("please enter same password");
    return;
  }

  // let token =
  //   (Math.random() + " ").substring(2, 10) +
  //   (Math.random() + " ").substring(2, 10);
  let user = {
    firstName: userName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  setLocalStorage(user);
  // console.log(user);
};

continueBtn.addEventListener("click", signUpFn);