nav = document.getElementById('nav');
nav.innerHTML = 
    `<li><a href="index.html">Home</a></li>
    <li><a href="#">My Orders</a></li>
    <li class="whitespace"> <!-- TAKE UP ALL REMAINING SPACE --> </li>
    <li><a href="cart.html"><i class="bi bi-cart-fill"></i> Cart</a></li>
    <li><a href="login.html"><i class="bi bi-person-fill"></i> Login/Register</a></li>`;

    //index.html = display products (list)
    //login.html = login links to the register.html and can redirect(button) to the register.html and myorders.html
    //register.html = register
    //displayproduct.html = display one product link from index.html page
    //cart.html = cart. links to the checkout.html
    //checkout.html = checkout
    //myorders.html = view past orders (My Orders)

