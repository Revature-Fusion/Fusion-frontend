async function checkoutCart() {
    const cart = 
    [
        {
            p_id: 44,
            name: "HDMI Cable Dual Package",
            desc: "A package of two HDMI cables",
            price: 12.0,
            stock: 100
        },
        {
            p_id: 45,
            name: "Cat Ear Headphones",
            desc: "Headphones with cat ears",
            price: 60.0,
            stock: 100
        }
    ]

    const user = {
        uId: 2,
        email: "JaneSmith@aol.com",
        firstName: "Jane",
        lastName: "Smith"
    }

    sessionStorage.setItem('cart', JSON.stringify(cart))
    sessionStorage.setItem('user', JSON.stringify(user))
    parseOrder()
    checkoutParse()
}
async function parseOrder() {
    orderList = JSON.parse(sessionStorage.getItem('cart'));

    document.getElementById("cartNum").innerHTML = orderList.length
    let total = 0;
    
    orderList.forEach(element => {
        const outerElement = document.createElement('tr');
        const innerElement = document.createElement('td');
        const elmnt = document.createElement('a');

        elmnt.setAttribute('id', 'cartItems');
        elmnt.setAttribute('href', '');
        elmnt.innerHTML = element.name

        const price = document.createElement('span')
        price.innerHTML = `$${element.price}`

        total += element.price

        const cart = document.getElementById('userCart');
        cart.appendChild(outerElement);
        outerElement.appendChild(innerElement);
        innerElement.appendChild(elmnt);
        innerElement.appendChild(price);
        //elmnt.appendChild(quant);
    });
    
    document.getElementById("totalPrice").innerHTML = `$${total}`
}

async function checkoutParse() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        document.getElementById('fName').value = user.firstName;
        document.getElementById('lName').value = user.lastName;
        document.getElementById('email').value = user.email;
        document.getElementById('fName').disabled = true;
        document.getElementById('lName').disabled = true;
        document.getElementById('email').disabled = true;
        
        const userId = user.uId;
        const httpurl = `http://localhost:7000/address/user/${userId}`;
        const httpResponse = await fetch(httpurl);
        const address = (await httpResponse.json())[0];
        sessionStorage.setItem('userAddress', JSON.stringify(address))
        if (address) {
            document.getElementById('adr').value = address.address;
            document.getElementById('city').value = address.city;
            document.getElementById('pCode').value = address.postal_code;
            document.getElementById('ctr').value = address.country;
        }          
    }
}

async function checkout() {
    const address = JSON.parse(sessionStorage.getItem('userAddress'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const orderList = JSON.parse(sessionStorage.getItem('cart'))
    if (!address) {
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
        uID: user.uId,
        dateOfPurchase: (new Date().getTime()*1000),
        aID: address.a_id
    };
    const orderOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    };

    const orderResponse = await fetch("http://localhost:7000/orders/", orderOption);
    const newOrder = await orderResponse.json();

    for (element of orderList) {
        const orderDetailData =  {
            oID: newOrder.oID,
            pID: element.p_id,
            quantity: 1
        };

        const orderDetailOption = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetailData)
        };
        const orderDetailResponse = await fetch('http://localhost:7000/orderDetails/',orderDetailOption);
        const newOrderDetail = await orderDetailResponse.json()
    }
    console.log('Order Successful');
          
    
}