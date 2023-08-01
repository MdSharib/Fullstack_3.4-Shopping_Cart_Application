// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

const menClothingSection = document.getElementById("men-clothing");
const womenClothingSection = document.getElementById("women-clothing");
const jewellerySection = document.getElementById("jewellery-div");
const electronicsSection = document.getElementById("electronics-div");
const searchBar = document.getElementById("search-bar");
const userNav = document.getElementById("user-nav");
const cartCount = document.getElementById("cart-count");
const menClothingTitle = document.getElementById("men-clothing-title");
const womenClothingTitle = document.getElementById("women-clothing-title");
const jewelleryTitle = document.getElementById("jewellery-title");
const electronicsTitle = document.getElementById("electronics-title");

// all/mens filters
// const allFilter = document.getElementById("all-filter");
// const mensFilter = document.getElementById("mens-filter");
// const womensFilter = document.getElementById("womens-filter");
// const jewelleryFilter = document.getElementById("jewellery-filter");
const allFilters = document.querySelectorAll(".filter");
const checkboxFilters = document.querySelectorAll(".check-value");
const sizesCheckboxFilters = document.querySelectorAll(".sizes-check-value");
const rangeFilter = document.getElementById("range");
const priceCheckboxFilters = document.querySelectorAll(".price-check");

// checkboxes
const redCheck = document.getElementById("red");

let menClothes = [];
let womenClothes = [];
let items = [];
let cartItems = [];
let jewelleryItems = [];
let electronicsItems = [];

document.addEventListener("DOMContentLoaded", function () {
  const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("userToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const itemCart = JSON.parse(localStorage.getItem("cartItems"));
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
});

// filter logic
const redCheckHandler = (ev) => {
  console.log(ev.target.id);
};

// search-bar logic
const searchBarHandler = (ev) => {
  const userSearch = ev.target.value.trim().toLowerCase();
  console.log("search val is" + userSearch);
  console.log("array data");
  console.log(menClothes);
  console.log(womenClothes);

  const searchedMen = menClothes.filter((val) => {
    const title = val["title"].toLowerCase();
    if (title.includes(userSearch)) {
      return val;
    }
  });
  const searchedWomen = womenClothes.filter((val) => {
    const title = val["title"].toLowerCase();
    if (title.includes(userSearch)) {
      return val;
    }
  });
  const searchedJewellery = jewelleryItems.filter((val) => {
    const title = val["title"].toLowerCase();
    if (title.includes(userSearch)) {
      return val;
    }
  });
  const searchedElectronics = electronicsItems.filter((val) => {
    const title = val["title"].toLowerCase();
    if (title.includes(userSearch)) {
      return val;
    }
  });

  // console.log(searchedMen);
  // console.log(searchedWomen);

  displayItems(menClothingSection, searchedMen);
  displayItems(womenClothingSection, searchedWomen);
  displayItems(jewellerySection, searchedJewellery);
  displayItems(electronicsSection, searchedElectronics);
};

const clearOtherFilters = () => {
  allFilters.forEach((val) => {
    val.style.backgroundColor = "white";
    val.style.color = "black";
  });
};

// handlnng mens/womens filter logic
const allFiltersHandler = (ev) => {
  console.log(ev);
  const selectedId = ev.target.id;
  const currEle = ev.target.style;
  // let hasSelectedFilter = false;

  if (selectedId === "all-filter") {
    if (currEle.backgroundColor !== "black") {
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    } else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }
    menClothingTitle.style.display = "block";
    menClothingSection.style.display = "flex";
    womenClothingTitle.style.display = "block";
    womenClothingSection.style.display = "flex";
    jewelleryTitle.style.display = "block";
    jewellerySection.style.display = "flex";
    electronicsTitle.style.display = "block";
    electronicsSection.style.display = "flex";
    return;
  }

  // for men-filter
  if (selectedId === "mens-filter") {
    if (currEle.backgroundColor !== "black") {
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    } else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }
    if (menClothingSection.style.display !== "flex") {
      menClothingTitle.style.display = "block";
      menClothingSection.style.display = "flex";
    }

    if (womenClothingSection.style.display !== "none") {
      womenClothingTitle.style.display = "none";
      womenClothingSection.style.display = "none";
    }

    if (jewellerySection.style.display !== "none") {
      jewelleryTitle.style.display = "none";
      jewellerySection.style.display = "none";
    } 

    if (electronicsSection.style.display !== "none") {
      electronicsTitle.style.display = "none";
      electronicsSection.style.display = "none";
    }

  
  }

  // for women filter
  if (selectedId === "womens-filter") {
    if (currEle.backgroundColor !== "black") {
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    } else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }

    if (womenClothingSection.style.display !== "flex") {
      womenClothingTitle.style.display = "block";
      womenClothingSection.style.display = "flex";
    }

    if (menClothingSection.style.display !== "none") {
      menClothingTitle.style.display = "none";
      menClothingSection.style.display = "none";
    }

    if (jewellerySection.style.display !== "none") {
      
      jewelleryTitle.style.display = "none";
      jewellerySection.style.display = "none";
    } 

    if (electronicsSection.style.display !== "none") {
      
      electronicsTitle.style.display = "none";
      electronicsSection.style.display = "none";
    } 
  }

  // for jewellery selected
  if (selectedId === "jewellery-filter") {
    if (currEle.backgroundColor !== "black") {
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    } else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }
    // if(womenClothingSection.style.display !== "none" || menClothingSection.style.display !== "none"){

    //   womenClothingSection.style.display = "none";
    //   menClothingSection.style.display = "none";
    //   return;
    // }

    // womenClothingSection.style.display = "flex";
    // menClothingSection.style.display = "flex";
    if (jewellerySection.style.display !== "flex") {
      jewelleryTitle.style.display = "block"
      jewellerySection.style.display = "flex";
    }
    if (menClothingSection.style.display !== "none") {
      menClothingTitle.style.display = "none";
      menClothingSection.style.display = "none";
    } 
    if (womenClothingSection.style.display !== "none") {
      womenClothingTitle.style.display = "none";
      womenClothingSection.style.display = "none";
    } 

    if (electronicsSection.style.display !== "none") {
      electronicsTitle.style.display = "none";
      electronicsSection.style.display = "none";
    } 
  }

  // for electronics selected
  if (selectedId === "electronics-filter") {
    if (currEle.backgroundColor !== "black") {
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    } else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }

    if (electronicsSection.style.display !== "flex") {
      
      electronicsTitle.style.display = "flex";
      electronicsSection.style.display = "flex";
    }

    if (menClothingSection.style.display !== "none") {
      menClothingTitle.style.display = "none";
      menClothingSection.style.display = "none";
    } 
    if (womenClothingSection.style.display !== "none") {
      womenClothingTitle.style.display = "none";
      womenClothingSection.style.display = "none";
    } 

    if (jewellerySection.style.display !== "none") {
      jewelleryTitle.style.display = "none";
      jewellerySection.style.display = "none";
    } 
  }


//   allFilters.forEach((val) => {
//     console.log(val.style.backgroundColor);
//     if(val.style.backgroundColor === "black"){
//       hasSelectedFilter = true;
//       return;
//     }
//   });
//   console.log(hasSelectedFilter);
//   if(!hasSelectedFilter){

// const allFilter = document.getElementById("all-filter");

//     console.log("inside again all filter")
//     if(allFilter.style.backgroundColor !== "black"){
//       clearOtherFilters();
  
//       allFilter.style.backgroundColor = "black";
//       allFilter.style.color = "white";
//     }else {
//       allFilter.style.backgroundColor = "white";
//       allFilter.style.color = "black";
//     }
//     menClothingSection.style.display = "flex";
//     womenClothingSection.style.display = "flex";
//     jewellerySection.style.display = "flex";
//     electronicsSection.style.display = "flex";
//     return;
//   }


};

// color checkbox checkbox filter logic
const checkboxFiltersHandler = (ev) => {
  const userInput = [];
  checkboxFilters.forEach((val) => {
    if (val.checked) {
      userInput.push(val.id);
    }
  });

  const checkFiltered = items.filter((val) => {
    return userInput.find((color) => {
      if (val["color"] === color) {
        return val;
      }
    });
  });
  if (checkFiltered.length <= 0) {
    mensClothing(items);
    womensClothing(items);
    return;
  }
  mensClothing(checkFiltered);
  womensClothing(checkFiltered);
};

// sizes checkbox filter logic
const sizesCheckboxFiltersHandler = (ev) => {
  const userInput = [];
  sizesCheckboxFilters.forEach((val) => {
    if (val.checked) {
      userInput.push(val.id);
    }
  });

  console.log(userInput);

  const sizeCheckFiltered = items.filter((val) => {
    return userInput.find((size) => {
      if (val["size"].toLowerCase() === size) {
        return val;
      }
    });
  });
  if (sizeCheckFiltered.length <= 0) {
    mensClothing(items);
    womensClothing(items);
    return;
  }
  mensClothing(sizeCheckFiltered);
  womensClothing(sizeCheckFiltered);
};

// range filter logic
const rangeFilterHandler = (ev) => {
  // console.log(ev.target.value);

  //  const userInput = [];
  //  sizesCheckboxFilters.forEach((val) => {
  //     if(val.checked){
  //       userInput.push(val.id);
  //     }
  //   });

  // console.log(userInput);

  const rangeFiltered = items.filter((val) => {
    const curr = Math.floor(val["rating"]["rate"]);
    // console.log(curr);
    if (+curr === +ev.target.value) {
      return val;
    }
  });

  if (rangeFiltered.length <= 0 && ev.target.value !== "5") {
    mensClothing(items);
    womensClothing(items);
    jewelleryCategory(items);
    electronicsCategory(items);
    return;
  }
  mensClothing(rangeFiltered);
  womensClothing(rangeFiltered);
  jewelleryCategory(rangeFiltered);
  electronicsCategory(rangeFiltered);
};

// price checkbox filter logic
const priceCheckboxFiltersHandler = (ev) => {
  const userInput = [];
  priceCheckboxFilters.forEach((val) => {
    if (val.checked) {
      userInput.push(val.id);
    }
  });

  console.log(userInput);

  const priceCheckFiltered = items.filter((val) => {
    return userInput.find((price) => {
      if (price === "100on") {
        if (val.price >= 100) {
          return val;
        }
      } else {
        const currPrice = price.split("-");
        const lower = currPrice[0];
        const higher = currPrice[1];
        if (val.price >= +lower && val.price <= +higher) {
          return val;
        }
      }
    });
    //  return filteredrange;
  });

  //  console.log(priceCheckFiltered);
  if (priceCheckFiltered.length <= 0) {
    mensClothing(items);
    womensClothing(items);
    jewelleryCategory(items);
    electronicsCategory(items);
    return;
  }
  mensClothing(priceCheckFiltered);
  womensClothing(priceCheckFiltered);
  jewelleryCategory(priceCheckFiltered);
  electronicsCategory(priceCheckFiltered);
};

// fetching items
const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const d = await res.json();

  // adding random color and size
  const data = d.map((val) => {
    val["color"] = addRandomColors();
    val["size"] = addRandomSize();

    return val;
  });
  items = data.map((val) => {
    return JSON.parse(JSON.stringify(val));
  });
  console.log(items);

  mensClothing(data);
  womensClothing(data);
  jewelleryCategory(data);
  electronicsCategory(data);
};

// adding to cart
const addBtnHandler = (ev) => {
  const id = ev.value;

  const product = items.find((val) => {
    if (+val["id"] === +id) {
      return val;
    }
  });

  setCartToLocalStorage(product);
};

// add cart to current user
const setCartToLocalStorage = (product) => {
  let itemCart = JSON.parse(localStorage.getItem("cartItems"));
  cartCount.innerText = itemCart.length + 1;
  if (!itemCart) {
    itemCart = [];
    itemCart.push(product);
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(itemCart));
    alert("added to cart!");
    console.log(cartItems);
    return;
  }

  itemCart.push(product);
  localStorage.setItem("cartItems", JSON.stringify(itemCart));
  cartItems.push(product);
  alert("added to cart!");
  console.log(cartItems);
  return;
};

// display onto UI in shop page
const displayItems = (target, data) => {
  let items = "";
  if (target === womenClothingSection || target === menClothingSection) {
    const toDisplay = data.map((val) => {
      return (items += `
    <div class="item">
              <img src=${val["image"]} alt="Item" />
              <div class="info">
              <div><b>${val["title"]}</b></div>
                <div class="row">
                  <div class="price">$${val["price"]}</div>
                  <div class="sized">${val["size"]}</div>
                </div>
                <div class="colors">
                  Available Colors:
                  <div class="row">
                    <div class="circle" style="background-color: ${val["color"]}"></div>
                  </div>
                </div>
                <div class="row">Rating: ${val["rating"]["rate"]}</div>
              </div>
              <button id="addBtn" value=${val["id"]} onClick="addBtnHandler(this)">Add to Cart</button>
            </div>
    `);
    });
  } else {
    const toDisplay = data.map((val) => {
      return (items += `
    <div class="item">
              <img src=${val["image"]} alt="Item" />
              <div class="info">
              <div>${val["title"]}</div>
                <div class="row">
                  <div class="price">$${val["price"]}</div>
                
                </div>
    
                <div class="row">Rating: ${val["rating"]["rate"]}</div>
              </div>
              <button id="addBtn" value=${val["id"]} onClick="addBtnHandler(this)">Add to Cart</button>
            </div>
    `);
    });
  }
  target.innerHTML = items;
};

const addRandomColors = () => {
  const colors = ["red", "blue", "green", "black", "white"];
  const chosenColor = colors[Math.floor(Math.random() * 5)];
  return chosenColor;
};
const addRandomSize = () => {
  const sizes = ["S", "M", "L", "XL"];
  const chosenSize = sizes[Math.floor(Math.random() * 4)];
  return chosenSize;
};

// filtering mens clothing
const mensClothing = (data) => {
  menClothes = data.filter((val) => {
    if (val["category"] === "men's clothing") {
      return val;
    }
  });

  console.log(menClothes);
  displayItems(menClothingSection, menClothes);
};

// filtering womens clothing
const womensClothing = (data) => {
  womenClothes = data.filter((val) => {
    if (val["category"] === "women's clothing") {
      return val;
    }
  });

  console.log(womenClothes);
  displayItems(womenClothingSection, womenClothes);
};

// filtering jewellery
const jewelleryCategory = (data) => {
  jewelleryItems = data.filter((val) => {
    if (val["category"] === "jewelery") {
      return val;
    }
  });

  // console.log(jewelleryCateg);
  displayItems(jewellerySection, jewelleryItems);
};
// filtering electronics
const electronicsCategory = (data) => {
  electronicsItems = data.filter((val) => {
    if (val["category"] === "electronics") {
      return val;
    }
  });

  // console.log(jewelleryCateg);
  displayItems(electronicsSection, electronicsItems);
};

getProducts();

// search bar event
searchBar.addEventListener("input", searchBarHandler);

// men/jewellery event
allFilters.forEach((val) => {
  val.addEventListener("click", allFiltersHandler);
});

// sidebar filters event
checkboxFilters.forEach((val) => {
  val.addEventListener("change", checkboxFiltersHandler);
});
sizesCheckboxFilters.forEach((val) => {
  val.addEventListener("change", sizesCheckboxFiltersHandler);
});
rangeFilter.addEventListener("change", rangeFilterHandler);
priceCheckboxFilters.forEach((val) => {
  val.addEventListener("change", priceCheckboxFiltersHandler);
});
