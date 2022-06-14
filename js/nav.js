var user = JSON.parse(sessionStorage.getItem('userdata'));
console.log(user);

let isLoggedin = false;

if (user) {
    isLoggedin = true;
}


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
    ordersAnchor.setAttribute('href', 'view_order.html');
    ordersAnchor.innerHTML = 'My Orders';
    ordersLI.appendChild(ordersAnchor);
    nav.appendChild(ordersLI);
}

// TODO: check if user is an admin, if they are, generate links for various admin options

let whiteSpace = document.createElement('li');
whiteSpace.classList.add('whitespace');
nav.appendChild(whiteSpace);

let brandLI = document.createElement('li');
let brandAnchor = document.createElement('a');
brandAnchor.setAttribute('href', 'index.html');
brandAnchor.classList.add('flex', 'flex-align-c')
let brandLogo = document.createElement('img');
brandLogo.setAttribute('src', 'images/logo_small.png');
brandLogo.style.height = '2rem';
brandAnchor.appendChild(brandLogo);
brandLI.appendChild(brandAnchor);
nav.appendChild(brandLI);

let whiteSpace2 = document.createElement('li');
whiteSpace2.classList.add('whitespace');
nav.appendChild(whiteSpace2);

if (isLoggedin) {
    let userLI = document.createElement('li');
    userLI.innerHTML = `${user.username}`;
    nav.appendChild(userLI);
}

let cartLI = document.createElement('li');
let cartAnchor = document.createElement('a');
cartAnchor.setAttribute('href', 'checkout.html');
cartAnchor.innerHTML = '<i class="bi bi-cart-fill"></i> Cart';
cartLI.appendChild(cartAnchor);
nav.appendChild(cartLI);
let loginLI = document.createElement('li');
let loginAnchor = document.createElement('a');
loginAnchor.setAttribute('href', 'login.html')
loginAnchor.innerHTML = `<i class="bi bi-person-fill"></i> ${isLoggedin ? "Logout" : "Login"}`;
if (isLoggedin) {
    // If logged in, the link should erase session info and then redirect
    loginAnchor.addEventListener('click', (event) => {
        sessionStorage.clear();

        let logoutSuccess = true;

        if (logoutSuccess) {
            // alert('successfully logged out')
            return true;
        } else {
            alert('failed to log out')
            event.preventDefault();
        }
        
    });
}
loginLI.appendChild(loginAnchor);
nav.appendChild(loginLI);

