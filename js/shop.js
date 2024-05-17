const listProducts = [
  {
    id: 1,
    name: "Life On Land Shirt -Black",
    price: 20,
    sizes: ["S", "M", "L", "XL"],
    image: "../images/shop_images/blackshirt.png",
    category: "Clothes",
  },
  {
    id: 2,
    name: "Life On Land Shirt -White",
    price: 20,
    sizes: ["S", "M", "L", "XL"],
    image: "../images/shop_images/whiteshirt.png",
    category: "Clothes",
  },
  {
    id: 3,
    name: "Dishcloth -White",
    price: 20,
    sizes: ["S", "M", "L", "XL"],
    image: "../images/shop_images/dishcloth.png",
    category: "Clothes",
  },
  {
    id: 4,
    name: " Laundry Wool Balls",
    price: 14,
    image: "../images/shop_images/woolballs.png",
    category: "Clothes",
  },
  {
    id: 5,
    name: "Mug",
    price: 25,
    image: "../images/shop_images/mug.png",
    category: "Kitchen items",
  },
  {
    id: 6,
    name: " Reusable Cardboard Cup",
    price: 2,
    image: "../images/shop_images/reusablecup.png",
    category: "Kitchen items",
  },
  {
    id: 7,
    name: " Glass Water Bottle",
    price: 20,
    image: "../images/shop_images/glassbottle.png",
    category: "Kitchen items",
  },
  {
    id: 8,
    name: "Reusable Food Container",
    price: 5,
    sizes: ["S", "M", "L", "XL"],
    image: "../images/shop_images/foodcontener.png",
    category: "Kitchen items",
  },
  {
    id: 9,
    name: "Reusable Bag",
    price: 10,
    image: "../images/shop_images/reusablebag.png",
    category: "Clothes",
  },
  {
    id: 10,
    name: "Pen",
    price: 1,
    image: "../images/shop_images/pen.png",
  },
  {
    id: 11,
    name: "Green Hand Band",
    price: 6,
    image: "../images/shop_images/band.png",
    category: "Handbands",
  },
  {
    id: 12,
    name: "Rubber Hand Band ",
    price: 6,
    image: "../images/shop_images/rubberhandband.png",
    category: "Handbands",
  },
];

let iconCart = document.querySelector(".CartIcon");
let closeCart = document.querySelector(".closebutton");
let CheckOut = document.querySelector(".checkOutbutton");
let totalCountElement = document.querySelector(".CartIcon span");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listProduct");
let listCart = document.querySelector(".listCart");

let carts = [];

// Initialize cart items in localStorage
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = (category) => {
  listProductHTML.innerHTML = "";
  let filteredProducts =
    category === "All"
      ? listProducts
      : listProducts.filter((product) => product.category === category);
  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      let sizeSelectorHTML = "";
      if (product.sizes && product.sizes.length > 1) {
        sizeSelectorHTML = `
                      <select class="sizeSelector">
                          ${product.sizes
                            .map(
                              (size) =>
                                `<option value="${size}">${size}</option>`
                            )
                            .join("")}
                      </select>`;
      }
      newProduct.innerHTML = `
                  <img src="${product.image}" alt="">
                  <h2>${product.name}</h2>
                  <div class="price">$${product.price}</div>
                  ${sizeSelectorHTML}
                  <button class="addToCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addToCart")) {
    let product_id = positionClick.parentElement.dataset.id;
    let selectedSize = positionClick.parentElement.querySelector(
      ".sizeSelector"
    )
      ? positionClick.parentElement.querySelector(".sizeSelector").value
      : null;
    addToCart(product_id, selectedSize);
  }
});

const addToCart = (product_id, selectedSize) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id && value.size == selectedSize
  );
  if (carts.length <= 0 || positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      size: selectedSize,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity++;
  }
  addCartToMemory();
  addCartToHTML();
  updateTotalCount();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  listCart.innerHTML = "";
  carts.forEach((cart) => {
    let product = listProducts.find((product) => product.id == cart.product_id);
    let newCartItem = document.createElement("div");
    newCartItem.classList.add("item");
    newCartItem.innerHTML = `
              <img src="${product.image}" alt="">
              <h3>${product.name}${
      product.sizes && product.sizes.length > 1 ? " - Size: " + cart.size : ""
    }</h3>
              <div class="quantity">
                  <span class="minus" data-productid="${product.id}">-</span>
                  <span>${cart.quantity}</span>
                  <span class="plus" data-productid="${product.id}">+</span>
              </div>
              <div class="price">$${product.price * cart.quantity}</div>`;
    listCart.appendChild(newCartItem);
  });
};

const initApp = () => {
  addDataToHTML("All");
};

initApp();

CheckOut.addEventListener("click", () => {
  let totalCost = carts.reduce((total, cart) => {
    let product = listProducts.find((product) => product.id == cart.product_id);
    return total + product.price * cart.quantity;
  }, 0);
  if (totalCost == 0) {
    alert("Please select at least one item to checkout");
  } else {
    let cartItems = carts.map((cart) => {
      let product = listProducts.find(
        (product) => product.id == cart.product_id
      );
      return {
        name: product.name,
        size: cart.size || null,
        quantity: cart.quantity,
        totalPrice: product.price * cart.quantity,
      };
    });
    let queryString = `price=${totalCost}&cartItems=${JSON.stringify(
      cartItems
    )}`;
    window.location.replace(`datagetter.html?${queryString}`);
  }
});

const updateTotalCount = () => {
  totalCountElement.textContent = carts.reduce(
    (total, cart) => total + cart.quantity,
    0
  );
};

listCart.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("plus") || target.classList.contains("minus")) {
    let productId = target.dataset.productid;
    let type = target.classList.contains("plus") ? "plus" : "minus";
    changeQuantity(productId, type);
  }
});

const changeQuantity = (productId, type) => {
  let cartItem = carts.find((item) => item.product_id === productId);
  if (cartItem) {
    if (type === "plus") {
      cartItem.quantity++;
    } else {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        carts = carts.filter((item) => item.product_id !== productId);
      }
    }
    addCartToMemory();
    addCartToHTML();
    updateTotalCount();
  }
};
