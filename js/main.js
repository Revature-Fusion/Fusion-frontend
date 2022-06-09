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
    const user = sessionStorage.getItem('');
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
        sessionStorage.setItem('userAddress', address)
        if (address && address.length > 0) {
            document.getElementById('adr').innerHTML = address.address;
            document.getElementById('city').innerHTML = address.city;
            document.getElementById('pCode').innerHTML = address.postal_code;
            document.getElementById('ctr').innerHTML = address.country;
        }          
    }
}

async function checkout() {
    const address = sessionStorage.getItem('userAddress');
    const user = sessionStorage.getItem('');
    const orderList = sessionStorage.getItem('')
    if (!address || address.length == 0) {
        const userAddressData = {
            u_id: user.userId,
            address: document.getElementById('adr').innerHTML,
            city: document.getElementById('city').innerHTML,
            postal_code: document.getElementById('pCode').innerHTML,
            country: document.getElementById('ctr').innerHTML
        };
        
        const userAddressOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userAddressData)
        };
        const userAddressResponse = await fetch("http://localhost:7000/address/",userAddressOption);
        const newAddress = await userAddressResponse.json();
        sessionStorage.setItem('userAddress', newAddress);
    };

    const orderData = {
        uID: 2,
        dateOfPurchase: new Date().getTime()*1000,
        aID: address.a_id
    };
    const orderOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    };

    const orderResponse = await fetch("http://localhost:7000/order/", orderOption);
    const newOrder = await orderResponse.json();

    orderList.forEach(element=>{
        const orderDetailData =  {
            oID: newOrder.oID,
            pID: 44,
            quantity: 1
        };

        const orderDetailOption = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetailData)
        };
        const orderDetailResponse = await fetch('http://localhost:7000//orderDetails/',orderDetailOption);
        const newOrderDetail = await orderDetailResponse.json()
    })
    console.log('Order Successful');
          
    

  

    

}