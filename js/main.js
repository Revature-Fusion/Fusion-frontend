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

    const user = null;

    // const user = {
    //     uId: 10,
    //     email: "test9@email.com",
    //     firstName: "test9fname",
    //     lastName: "test9lname"
    // }

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
        const addressList = await httpResponse.json();
        if (addressList && addressList.length > 0) {
            const address = addressList[0];
            sessionStorage.setItem('userAddress', JSON.stringify(address))
            document.getElementById('adr').value = address.address;
            document.getElementById('city').value = address.city;
            document.getElementById('pCode').value = address.postal_code;
            document.getElementById('ctr').value = address.country;
            document.getElementById('adr').disabled = true;
            document.getElementById('city').disabled = true;
            document.getElementById('pCode').disabled = true;
            document.getElementById('ctr').disabled = true;
        } else {
            sessionStorage.setItem('userAddress', null);
        }
    }
}

async function getGuestInfo() {
  const guestUrl = 'http://localhost:5000/users';
  const res = await fetch(guestUrl);
  const guestBody = await res.json();

  const email = document.getElementById('email').value;
  let currentGuest = guestBody.find(user => user.email === email);
  console.log(currentGuest);
  sessionStorage.setItem('user', JSON.stringify(currentGuest));
  checkoutParse();
}

async function checkout() {
    let address = JSON.parse(sessionStorage.getItem('userAddress'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const orderList = JSON.parse(sessionStorage.getItem('cart'))
    if (!address) {
        const userAddressData = {
            u_id: user.uId,
            address: document.getElementById('adr').value,
            city: document.getElementById('city').value,
            postal_code: document.getElementById('pCode').value,
            country: document.getElementById('ctr').value
        };

        const userAddressOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userAddressData)
        };
        const userAddressResponse = await fetch("http://localhost:7000/address/",userAddressOption);
        address = await userAddressResponse.json();
        sessionStorage.setItem('userAddress', JSON.stringify(address));
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
        const orderDetailResponse = await fetch('http://localhost:7000/orderDetails/', orderDetailOption);
        const newOrderDetail = await orderDetailResponse.json()

        const productOption = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({stock: 1})
        }

        const productResponse = await fetch(`http://localhost:7000/products/${element.p_id}`, productOption)
    }
    console.log('Order Successful');


}
