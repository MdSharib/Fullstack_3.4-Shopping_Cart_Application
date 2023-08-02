// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");




// ensuring users cannot manually navigate to the "index" page unless they click logout
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("userToken");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true" || token) {
      // alert("unauthorized access! redirect to login page."); //add toster
      window.location.href = "../shop";
      return;
    }
  });

const signupBtnHandler =() => {
    window.location.href = "./signup";
}
const loginBtnHandler =() => {
    window.location.href = "./login";
}





signupBtn.addEventListener("click", signupBtnHandler);
loginBtn.addEventListener("click", loginBtnHandler);

