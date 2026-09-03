let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartCount = document.getElementById("cart-count");

let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let clearCartButton = document.getElementById("clear-cart-btn");
let checkoutButton = document.getElementById("checkout-btn");


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {
    if (cartCount) {
        cartCount.innerText = cart.reduce(function (sum, product) {
            return sum + product.quantity;
        }, 0);
    }
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    if (!cartItems) {
        updateCartCount();
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


        // Increase quantity
        let increaseButton = item.querySelector(".increase-btn");

        increaseButton.addEventListener("click", function () {

            product.quantity++;

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });


        // Decrease quantity
        let decreaseButton = item.querySelector(".decrease-btn");

        decreaseButton.addEventListener("click", function () {

            if (product.quantity > 1) {

                product.quantity--;

                localStorage.setItem("cart", JSON.stringify(cart));

                displayCart();
            }
        });


        // Remove product
        let removeButton = item.querySelector(".remove-btn");

        removeButton.addEventListener("click", function () {

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });


        cartItems.appendChild(item);
    });


    // Calculate total
    let total = 0;

    cart.forEach(function (product) {

        total +=
            parseFloat(product.price.replace("$", "")) *
            product.quantity;
    });


    cartTotal.innerText = total.toFixed(2);

    updateCartCount();
}


// Display cart when page loads
displayCart();


// ===============================
// SEARCH
// ===============================

let searchInput = document.querySelector(".search-input");
let searchButton = document.getElementById("search-btn");
let searchResults = document.querySelector(".search-results");


if (searchInput) {

    searchInput.addEventListener("input", function () {

        let searchValue = searchInput.value.toLowerCase();

        let products =
            document.querySelectorAll(
                "#featured-products .product-card"
            );

        console.log(products.length);

        let resultsContainer =
            document.getElementById("search-results-container");

        resultsContainer.innerHTML = "";

        let found = false;


        for (let i = 0; i < products.length; i++) {

            let productName =
                products[i]
                    .querySelector("h3")
                    .innerText
                    .toLowerCase();


            if (productName.includes(searchValue)) {

                let result =
                    products[i].cloneNode(true);

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

            resultsContainer.innerHTML =
                "<p>No products found.</p>";
        }
    });
}


// Search button
if (searchButton && searchInput) {

    searchButton.addEventListener("click", function () {

        searchInput.style.display = "block";

        searchInput.focus();
    });
}


// ===============================
// SEARCH RESULTS ADD TO CART
// ===============================

let searchResultContainer =
    document.getElementById("search-results-container");


if (searchResultContainer) {

    searchResultContainer.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-to-cart")) {

            let card = e.target.parentElement;


            let productName =
                card.querySelector("h3").innerText;

            let productPrice =
                card.querySelector(".price").innerText;

            let productImage =
                card.querySelector("img").src;


            let product = {

                name: productName,

                price: productPrice,

                image: productImage,

                quantity: 1
            };


            let existingProduct =
                cart.find(function (item) {

                    return item.name === product.name;
                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push(product);
            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            displayCart();

            console.log(cart);
        }
    });
}


// ===============================
// STATIC ADD TO CART BUTTONS
// ===============================

let addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let card = button.parentElement;


        let productName =
            card.querySelector("h3").innerText;

        let productPrice =
            card.querySelector(".price").innerText;

        let productImage =
            card.querySelector("img").src;


        let product = {

            name: productName,

            price: productPrice,

            image: productImage,

            quantity: 1
        };


        let existingProduct =
            cart.find(function (item) {

                return item.name === product.name;
            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(product);
        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartCount();

        console.log(cart);
    });
});


// ===============================
// CLEAR CART
// ===============================

if (clearCartButton) {

    clearCartButton.addEventListener("click", function () {

        cart = [];

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        displayCart();
    });
}


// ===============================
// CHECKOUT
// ===============================

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

        } else {

            alert(
                "Thank you for shopping with Luma Store!"
            );
        }
    });
}


// ===============================
// FEATURED PRODUCTS
// ===============================

const featuredSection =
    document.getElementById("featured-products");


if (featuredSection) {

    const products =
        featuredSection.querySelectorAll(".product-card");


    products.forEach(function (product) {

        if (!product.classList.contains("featured")) {

            product.style.display = "none";
        }
    });
}


// ===============================
// SHOP PRODUCTS
// ===============================

const shopProducts = [

    {
        name: "Classic Black Bag",
        price: "$49.99",
        image: "assets/images/product1.jpg",
        category: "Accessories"
    },

    {
        name: "Everyday Tote Bag",
        price: "$44.99",
        image: "assets/images/product2.jpg",
        category: "Accessories"
    },

    {
        name: "Straight Leg Jeans",
        price: "$34.99",
        image: "assets/images/product3.jpg",
        category: "Clothing"
    },

    {
        name: "Classic Black Jeans",
        price: "$36.99",
        image: "assets/images/product4.jpg",
        category: "Clothing"
    },

    {
        name: "Blue Button Down Shirt",
        price: "$32.99",
        image: "assets/images/product5.jpg",
        category: "Clothing"
    },

    {
        name: "White T-Shirt",
        price: "$19.99",
        image: "assets/images/product6.jpg",
        category: "Clothing"
    },

    {
        name: "Butterfly Floral Maxi Dress",
        price: "$54.99",
        image: "assets/images/product7.jpg",
        category: "Clothing"
    },

    {
        name: "Golden Embroidered A-Line Dress",
        price: "$64.99",
        image: "assets/images/product8.jpg",
        category: "Clothing"
    },

    {
        name: "Wireless Bluetooth Speaker",
        price: "$49.99",
        image: "assets/images/product9.jpg",
        category: "Electronics"
    },

    {
        name: "Hydrating Face Serum",
        price: "$24.99",
        image: "assets/images/product10.jpg",
        category: "Beauty"
    },

    {
        name: "Everyday Perfume",
        price: "$44.99",
        image: "assets/images/product11.jpg",
        category: "Beauty"
    },

    {
        name: "Everyday Running Shoes",
        price: "$69.99",
        image: "assets/images/product12.jpg",
        category: "Shoes"
    },

    {
        name: "Leather Loafers",
        price: "$74.99",
        image: "assets/images/product13.jpg",
        category: "Shoes"
    },

    {
        name: "Black Leather Wallet",
        price: "$29.99",
        image: "assets/images/product14.jpg",
        category: "Accessories"
    },

    {
        name: "Beige Oversized Hoodie",
        price: "$39.99",
        image: "assets/images/product15.jpg",
        category: "Clothing"
    },

    {
        name: "Casual Sandals",
        price: "$39.99",
        image: "assets/images/product16.jpg",
        category: "Shoes"
    },

    {
        name: "Minimalist Wristwatch",
        price: "$54.99",
        image: "assets/images/product17.jpg",
        category: "Accessories"
    },

    {
        name: "Casual Cotton Pants",
        price: "$34.99",
        image: "assets/images/product18.jpg",
        category: "Clothing"
    },

    {
        name: "Classic White Sneakers",
        price: "$59.99",
        image: "assets/images/product19.jpg",
        category: "Shoes"
    },

    {
        name: "Wireless Earbuds",
        price: "$59.99",
        image: "assets/images/product20.jpg",
        category: "Electronics"
    },

    {
        name: "Wireless Headphones",
        price: "$79.99",
        image: "assets/images/product21.jpg",
        category: "Electronics"
    },

    {
        name: "Makeup Brush Set",
        price: "$22.99",
        image: "assets/images/product22.jpg",
        category: "Beauty"
    },

    {
        name: "Girls Smartwatch",
        price: "$89.99",
        image: "assets/images/product23.jpg",
        category: "Electronics"
    },

    {
        name: "Rose Lip Tint",
        price: "$14.99",
        image: "assets/images/product24.jpg",
        category: "Beauty"
    }
];


// ===============================
// DISPLAY SHOP PRODUCTS
// ===============================

let shopContainer =
    document.getElementById("shop-products");


if (shopContainer) {

    shopProducts.forEach(function (product) {

        let card =
            document.createElement("div");

        card.classList.add("product-card");


        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;


        shopContainer.appendChild(card);
    });
}


// ===============================
// SHOP ADD TO CART
// ===============================

let shopCartContainer =
    document.getElementById("shop-products");


if (shopCartContainer) {

    shopCartContainer.addEventListener("click", function (e) {

        if (e.target.classList.contains("add-to-cart")) {

            let card = e.target.parentElement;


            let productName =
                card.querySelector("h3").innerText;

            let productPrice =
                card.querySelector(".price").innerText;

            let productImage =
                card.querySelector("img").src;


            let product = {

                name: productName,

                price: productPrice,

                image: productImage,

                quantity: 1
            };


            let existingProduct =
                cart.find(function (item) {

                    return item.name === product.name;
                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push(product);
            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            displayCart();

            console.log(cart);
        }
    });
}