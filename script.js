// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))


const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");


const signupBtnHandler =() => {
    window.location.href = "./signup";
}
const loginBtnHandler =() => {
    window.location.href = "./login";
}





signupBtn.addEventListener("click", signupBtnHandler);
loginBtn.addEventListener("click", loginBtnHandler);