async function parseOrder() {
    orderList = sessionStorage.getItem('');

    const outerElement = document.createElement('tr');
    const innerElement = document.createElement('td');
    const elmnt = document.createElement('a');
    const quant = document.createElement('a');


    innerElement.setAttribute('class', 'table m-y');
    elmnt.setAttribute('id', 'cartItems');

    orderList.forEach(element => {
        const cart = document.getElementById('userCart');
        cart.appendChild(outerElement);
        outerElement.appendChild(innerElement);
        innerElement.appendChild(elmnt);
        elmnt.appendChild(quant);
        
    });
}