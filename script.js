let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");

let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let clearCartButton = document.getElementById("clear-cart-btn");
let checkoutButton = document.getElementById("checkout-btn");

function displayCart() {
    if (!cartItems) {
        return;
    }
    cartItems.innerHTML = "";

    cart.forEach(function (product, index) {
        let item = document.createElement("div");

        item.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <p>Quantity: ${product.quantity}</p>
     <div class="quantity">
                <button class="decrease-btn">-</button>
                <span>${product.quantity}</span>
                <button class="increase-btn">+</button>
            </div>

            <button class="remove-btn">Remove</button>
`;
        let increaseButton = item.querySelector(".increase-btn");
        let decreaseButton = item.querySelector(".decrease-btn");

        increaseButton.addEventListener("click", function () {
            product.quantity++;

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });

        decreaseButton.addEventListener("click", function () {
            if (product.quantity > 1) {
                product.quantity--;

                localStorage.setItem("cart", JSON.stringify(cart));

                displayCart();
            }
        });
        let removeButton = item.querySelector(".remove-btn");

        removeButton.addEventListener("click", function () {
            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });

        cartItems.appendChild(item);
    });

    let total = 0;

    cart.forEach(function (product) {
        total += parseFloat(product.price.replace("$", "")) * product.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
    if (cartCount) {
        cartCount.innerText = cart.reduce(function (sum, product) {
            return sum + product.quantity;
        }, 0);
    }
}

displayCart();

let searchInput = document.querySelector(".search-input");
let searchButton = document.getElementById("search-btn");
let searchResults = document.querySelector(".search-results");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        let searchValue = searchInput.value.toLowerCase();
        let products = document.querySelectorAll("#featured-products .product-card");
        console.log(products.length);
        let resultsContainer = document.getElementById("search-results-container");

        resultsContainer.innerHTML = "";

        let found = false;

        for (let i = 0; i < products.length; i++) {
            let productName = products[i].querySelector("h3").innerText.toLowerCase();

            if (productName.includes(searchValue)) {
                let result = products[i].cloneNode(true);
                result.style.display = "block";
                resultsContainer.appendChild(result);
                found = true;
            }
        }

        if (searchValue === "") {
            searchResults.style.display = "none";
        } else {
            searchResults.style.display = "block";
        }

        if (!found && searchValue !== "") {
            resultsContainer.innerHTML = "<p>No products found.</p>";
        }
    });
}

if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
        searchInput.style.display = "block";
        searchInput.focus();
    });
}
let searchResultContainer = document.getElementById("search-results-container");

if (searchResultContainer) {
    searchResultContainer.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-to-cart")) {
            let card = e.target.parentElement;

            let productName = card.querySelector("h3").innerText;
            let productPrice = card.querySelector(".price").innerText;
            let productImage = card.querySelector("img").src;

            let product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            let existingProduct = cart.find(function (item) {
                return item.name === product.name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();

            console.log(cart);
        }
    });
}
let buttons = document.getElementsByClassName("add-to-cart");
console.log(buttons);

for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function () {

        let card = buttons[i].parentElement;

        let productName = card.querySelector("h3").innerText;
        let productPrice = card.querySelector(".price").innerText;
        let productImage = card.querySelector("img").src;

        let product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        let existingProduct = cart.find(function (item) {
            return item.name === product.name;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

        console.log(cart);
    });
}
if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    });
}
if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Order placed successfully!");
    });
}
const featuredSection = document.getElementById("featured-products");

if (featuredSection) {
    const products = featuredSection.querySelectorAll(".product-card");

    products.forEach(product => {
        if (!product.classList.contains("featured")) {
            product.style.display = "none";
        }
    });
}
let shopProducts = [
    {
        name: "Classic Black Bag",
        price: "$49.99",
        image: "assets/images/product1.jpg"
    },
    {
        name: "Everyday Tote Bag",
        price: "$44.99",
        image: "assets/images/product2.jpg"
    },
    {
        name: "Straight Leg Jeans",
        price: "$34.99",
        image: "assets/images/product3.jpg"
    },
    {
        name: "Classic Black Jeans",
        price: "$36.99",
        image: "assets/images/product4.jpg"
    },
    {
        name: "Blue Button Down Shirt",
        price: "$32.99",
        image: "assets/images/product5.jpg"
    },
    {
        name: "White T-Shirt",
        price: "$19.99",
        image: "assets/images/product6.jpg"
    },
    {
        name: "Butterfly Floral Maxi Dress",
        price: "$54.99",
        image: "assets/images/product7.jpg"
    },
    {
        name: "Golden Embroidered A-Line Dress",
        price: "$64.99",
        image: "assets/images/product8.jpg"
    },
    {
        name: "Wireless Bluetooth Speaker",
        price: "$49.99",
        image: "assets/images/product9.jpg"
    },
    {
        name: "Hydrating Face Serum",
        price: "$24.99",
        image: "assets/images/product10.jpg"
    },
    {
        name: "Everyday Perfume",
        price: "$44.99",
        image: "assets/images/product11.jpg"
    },
    {
        name: "Everyday Running Shoes",
        price: "$69.99",
        image: "assets/images/product12.jpg"
    },
    {
        name: "Leather Loafers",
        price: "$74.99",
        image: "assets/images/product13.jpg"
    },
    {
        name: "Black Leather Wallet",
        price: "$29.99",
        image: "assets/images/product14.jpg"
    },
    {
        name: "Beige Oversized Hoodie",
        price: "$39.99",
        image: "assets/images/product15.jpg"
    },
    {
        name: "Casual Sandals",
        price: "$39.99",
        image: "assets/images/product16.jpg"
    },
    {
        name: "Minimalist Wristwatch",
        price: "$54.99",
        image: "assets/images/product17.jpg"
    },
    {
        name: "Casual Cotton Pants",
        price: "$34.99",
        image: "assets/images/product18.jpg"
    },
    {
        name: "Classic White Sneakers",
        price: "$59.99",
        image: "assets/images/product19.jpg"
    },
    {
        name: "Wireless Earbuds",
        price: "$59.99",
        image: "assets/images/product20.jpg"
    },
    {
        name: "Wireless Headphones",
        price: "$79.99",
        image: "assets/images/product21.jpg"
    },
    {
        name: "Makeup Brush Set",
        price: "$22.99",
        image: "assets/images/product22.jpg"
    },
    {
        name: "Girls Smartwatch",
        price: "$89.99",
        image: "assets/images/product23.jpg"
    },
    {
        name: "Rose Lip Tint",
        price: "$14.99",
        image: "assets/images/product24.jpg"
    }
];
let shopProductsContainer = document.getElementById("shop-products");

if (shopProductsContainer) {

    shopProducts.forEach(function (product) {

        let card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        shopProductsContainer.appendChild(card);
    });
}
let shopCartContainer = document.getElementById("shop-products");

if (shopCartContainer) {
    shopCartContainer.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-to-cart")) {

            let card = e.target.parentElement;

            let productName = card.querySelector("h3").innerText;
            let productPrice = card.querySelector(".price").innerText;
            let productImage = card.querySelector("img").src;

            let product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            let existingProduct = cart.find(function (item) {
                return item.name === product.name;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();

            console.log(cart);
        }
    });
}