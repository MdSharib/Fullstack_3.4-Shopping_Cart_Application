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
const searchBar = document.getElementById("search-bar");

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

// filter logic
const redCheckHandler = (ev) => {
  console.log(ev.target.id)
} 


// search-bar logic
const searchBarHandler = (ev) => {
  const userSearch = ev.target.value.trim().toLowerCase();
  console.log("search val is" + userSearch);
  console.log("array data");
  console.log(menClothes);
  console.log(womenClothes);

  const searchedMen = menClothes.filter((val) => {
    const title = val["title"].toLowerCase();
    if(title.includes(userSearch)){
      return val;
    }
  });
  const searchedWomen = womenClothes.filter((val) => {
    const title = val["title"].toLowerCase();
    if(title.includes(userSearch)){
      return val;
    }
  });

  // console.log(searchedMen);
  // console.log(searchedWomen);

  displayItems(menClothingSection, searchedMen);
  displayItems(womenClothingSection, searchedWomen);
}


const clearOtherFilters = () => {
  allFilters.forEach((val) => {
    val.style.backgroundColor = "white";
    val.style.color = "black";
  })
}


// handlnng mens/womens filter logic - wrong logic for electronic/jewellery category
const allFiltersHandler = (ev) => {
  const selectedId = ev.target.id;
  const currEle = ev.target.style;

if(selectedId === "all-filter"){
  if(currEle.backgroundColor !== "black"){
    clearOtherFilters();

    currEle.backgroundColor = "black";
    currEle.color = "white";
  }else {
    currEle.backgroundColor = "white";
    currEle.color = "black";
  }
  menClothingSection.style.display = "flex";
  womenClothingSection.style.display = "flex";
  return;
}

  // for men-filter
  if(selectedId === "mens-filter"){
    if(currEle.backgroundColor !== "black"){
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    }else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }
    if(menClothingSection.style.display !== "flex"){
      menClothingSection.style.display = "flex";
    }
    if(womenClothingSection.style.display !== "none"){
      womenClothingSection.style.display = "none";
      return;
    }
    womenClothingSection.style.display = "flex";
    return;
  }

// for women filter
  if(selectedId === "womens-filter"){
    if(currEle.backgroundColor !== "black"){
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    }else {
      currEle.backgroundColor = "white";
      currEle.color = "black";
    }

    if(womenClothingSection.style.display !== "flex"){
      womenClothingSection.style.display = "flex";
    }



    if(menClothingSection.style.display !== "none"){
      
      menClothingSection.style.display = "none";
      return;
    }
    
    menClothingSection.style.display = "flex";
    return;
  }

// for jewellery
  if(selectedId === "jewellery-filter" || selectedId === "electronics-filter"){
    if(currEle.backgroundColor !== "black"){
      clearOtherFilters();

      currEle.backgroundColor = "black";
      currEle.color = "white";
    }else {
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
    
    womenClothingSection.style.display = "none";
    menClothingSection.style.display = "none";
  
  
  }

}


// color checkbox checkbox filter logic 
const checkboxFiltersHandler = (ev) => {
 const userInput = [];
  checkboxFilters.forEach((val) => {
    if(val.checked){
      userInput.push(val.id);
    }
  });
  
  const checkFiltered = items.filter((val) => {
    return userInput.find((color) => {
      if(val["color"] === color){
        return val;
      }
    })
  });
  if(checkFiltered.length <= 0){
    mensClothing(items);
    womensClothing(items);
    return;
  }
  mensClothing(checkFiltered);
  womensClothing(checkFiltered);
}



// sizes checkbox filter logic 
const sizesCheckboxFiltersHandler = (ev) => {
 const userInput = [];
 sizesCheckboxFilters.forEach((val) => {
    if(val.checked){
      userInput.push(val.id);
    }
  });

  console.log(userInput)
  
  const sizeCheckFiltered = items.filter((val) => {
    return userInput.find((size) => {
      if((val["size"].toLowerCase()) === size){
        return val;
      }
    })
  });
  if(sizeCheckFiltered.length <= 0){
    mensClothing(items);
    womensClothing(items);
    return;
  }
  mensClothing(sizeCheckFiltered);
  womensClothing(sizeCheckFiltered);
}

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
    if(+curr === +ev.target.value){
      return val;
    }
  });

  
  if(rangeFiltered.length <= 0 && ev.target.value !== "5"){
    mensClothing(items);
    womensClothing(items);
    return;
  }
  mensClothing(rangeFiltered);
  womensClothing(rangeFiltered);
}


// price checkbox filter logic 
const priceCheckboxFiltersHandler = (ev) => {
  const userInput = [];
  priceCheckboxFilters.forEach((val) => {
     if(val.checked){
       userInput.push(val.id);
     }
   });
 
   console.log(userInput);
  
   
   const priceCheckFiltered = items.filter((val) => {
    return userInput.find((price) => {
      if(price === "100on"){
        if(val.price >= 100 ){
          return val;
        }
      }else {

        const currPrice = price.split("-");
        const lower = currPrice[0];
        const higher = currPrice[1];
        if(val.price >= +lower && val.price <= +higher){
          return val;
        }
      }

     });
    //  return filteredrange;
   });

  //  console.log(priceCheckFiltered);
   if(priceCheckFiltered.length <= 0){
     mensClothing(items);
     womensClothing(items);
     return;
   }
   mensClothing(priceCheckFiltered);
   womensClothing(priceCheckFiltered);
 }





// fetching items
const getProducts = async() => {
  const res = await fetch("https://fakestoreapi.com/products");
  const d = await res.json();

  // adding random color and size
  const data = d.map((val) => {
    val["color"] = addRandomColors();
    val["size"] = addRandomSize();

    return val;
  })
  items = data.map((val) => {
    return JSON.parse(JSON.stringify(val)); 
  })
    // console.log(data);

  mensClothing(data);
  womensClothing(data);
}





// display onto UI in shop page
const displayItems = (target, data) => {
  let items = "";
  const toDisplay = data.map((val) => {
    return items += `
    <div class="item">
              <img src=${val["image"]} alt="Item" />
              <div class="info">
              <div>${val["title"]}</div>
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
              <button id="addBtn">Add to Cart</button>
            </div>
    `
  });
  target.innerHTML = items;
}


const addRandomColors = () => {
  const colors = ["red", "blue", "green", "black", "white"];
  const chosenColor = colors[Math.floor(Math.random() * 5)];
  return chosenColor;
}
const addRandomSize = () => {
  const sizes = ["S", "M", "L", "XL"];
  const chosenSize = sizes[Math.floor(Math.random() * 4)];
  return chosenSize;
}




// filtering mens clothing 
const mensClothing = (data) => {
  menClothes = data.filter((val) => {
      if(val["category"] === "men's clothing"){
        return val;
      }
    });

    console.log(menClothes);
    displayItems(menClothingSection, menClothes);
} 


// filtering womens clothing 
const womensClothing = (data) => {
  womenClothes = data.filter((val) => {
      if(val["category"] === "women's clothing"){
        return val;
      }
    });

    console.log(womenClothes);
    displayItems(womenClothingSection, womenClothes);
} 


getProducts();


// search bar event
searchBar.addEventListener("input" , searchBarHandler);

// men/jewellery event
allFilters.forEach((val) => {
  val.addEventListener("click", allFiltersHandler);
})

// sidebar filters event
checkboxFilters.forEach((val) => {
  val.addEventListener("change", checkboxFiltersHandler);
})
sizesCheckboxFilters.forEach((val) => {
  val.addEventListener("change", sizesCheckboxFiltersHandler);
})
rangeFilter.addEventListener("change", rangeFilterHandler)
priceCheckboxFilters.forEach((val) => {
  val.addEventListener("change", priceCheckboxFiltersHandler);
})

