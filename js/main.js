async function checkoutCart() {
    parseOrder()
    checkoutParse()
}
async function parseOrder() {
    orderList = sessionStorage.getItem('');
    
    orderList.forEach(element => {
        const outerElement = document.createElement('tr');
        const innerElement = document.createElement('td');
        const elmnt = document.createElement('a');



        innerElement.setAttribute('class', 'table m-y');
        elmnt.setAttribute('id', 'cartItems');
        elmnt.setAttribute('href', '');

        const cart = document.getElementById('userCart');
        cart.appendChild(outerElement);
        outerElement.appendChild(innerElement);
        innerElement.appendChild(elmnt);
        elmnt.appendChild(quant);
        
    });
}

async function checkoutParse() {
    const user = sessionStorage.getItem('')
    if (user) {
        document.getElementById('fName').innerHTML = user.firstName;
        document.getElementById('lName').innerHTML = user.lastName;
        document.getElementById('email').innerHTML = user.email;
        document.getElementById('fName').disabled = true;
        document.getElementById('lName').disabled = true;
        document.getElementById('email').disabled = true;

        
        const userId = user.userId;
        const httpurl = `http://localhost:7000/address/user/${userId}`;
        const httpResponse = await fetch(httpurl);
        const address = await httpResponse.json();
        if (address && address.length > 0) {
            document.getElementById('adr').innerHTML = address.address;
            document.getElementById('city').innerHTML = address.city;
            document.getElementById('pCode').innerHTML = address.postal_code;
            document.getElementById('ctr').innerHTML = address.country;
        }          
    }
}