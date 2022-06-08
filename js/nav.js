// TODO: get whether user is logged in

let isLoggedin = false

nav = document.getElementById('nav');
nav.innerHTML = '';

// Index Link
let indexLI = document.createElement('li');
let indexAnchor = document.createElement('a');
indexAnchor.setAttribute('href', 'index.html');
indexAnchor.innerHTML = 'Home';
indexLI.appendChild(indexAnchor);
nav.appendChild(indexLI);

if (isLoggedin) {
    let ordersLI = document.createElement('li');
    let ordersAnchor = document.createElement('a');
    ordersAnchor.setAttribute('href', 'myorders.html');
    ordersAnchor.innerHTML = 'My Orders'
    ordersLI.appendChild(ordersAnchor);
    nav.appendChild(ordersLI)
}

let whiteSpace = document.createElement('li');
whiteSpace.classList.add('whitespace');
nav.appendChild(whiteSpace);

let cartLI = document.createElement('li');
let cartAnchor = document.createElement('a');
cartAnchor.setAttribute('href', 'cart.html');
cartAnchor.innerHTML = '<i class="bi bi-cart-fill"></i> Cart';
cartLI.appendChild(cartAnchor);
nav.appendChild(cartLI);

// TODO: if user is logged in, override default behavior of this link so the session data is reset before redirecting
let loginLI = document.createElement('li');
let loginAnchor = document.createElement('a');
let displayMessage = isLoggedin ? "Login" : "Logout"






// nav.innerHTML = 
//     `<li><a href="index.html">Home</a></li>
//     <li><a href="#">My Orders</a></li>
//     <li class="whitespace"> <!-- TAKE UP ALL REMAINING SPACE --> </li>
//     <li><a href="cart.html"><i class="bi bi-cart-fill"></i> Cart</a></li>
//     <li><a href="login.html"><i class="bi bi-person-fill"></i> Login/Register</a></li>`;

    //index.html = display products (list)
    //login.html = login links to the register.html and can redirect(button) to the register.html and myorders.html
    //register.html = register
    //displayproduct.html = display one product link from index.html page
    //cart.html = cart. links to the checkout.html
    //checkout.html = checkout
    //myorders.html = view past orders (My Orders)

