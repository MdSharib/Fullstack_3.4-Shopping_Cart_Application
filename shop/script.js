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
// checkboxes
const redCheck = document.getElementById("red");


menClothes = [];
womenClothes = [];

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





const getProducts = async() => {
  const res = await fetch("https://fakestoreapi.com/products");
  const d = await res.json();

  // adding random color and size
  const data = d.map((val) => {
    val["color"] = addRandomColors();
    val["size"] = addRandomSize();

    return val;
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
                <div class="row">${val["rating"]["rate"]}</div>
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

// redCheck.addEventListener("", redCheckHandler);
searchBar.addEventListener("input" , searchBarHandler);

