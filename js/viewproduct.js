var url = new URL(location.href);
var productId = url.searchParams.get('pID');

loadProduct(productId);

async function loadProduct(pID) {
    const url = `http://localhost:7000/products/${pID}`;

    let productName = document.getElementById('product-name');
    productName.innerHTML = '';
    let productDisplay = document.getElementById('product-display');
    productDisplay.innerHTML = '';

    const httpResponse = await fetch(url);
    if (httpResponse.status == 200) {
        console.log('successfully recieved product');
        const body = await httpResponse.json();
        console.log(body);
        productName.innerHTML = body.name;

        if (body.picture) {
            let imgDiv = document.createElement('div');
            imgDiv.id = 'img';
            img = document.createElement('img');
            img.setAttribute('src', `images/${body.picture}`);
            imgDiv.appendChild(img);
            productDisplay.appendChild(imgDiv);
        }
        
        // Wrapper div for product information
        let productInfo = document.createElement('div');
        productInfo.classList.add('flex', 'flex-col', 'p-x');
        productInfo.id = 'product-info'
        productDisplay.appendChild(productInfo);

        // Display Product Description
        let description = document.createElement('p');
        description.innerHTML = body.desc;
        productInfo.appendChild(description);

        //Used to format price to USD
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Display Price
        let price = document.createElement('h3')
        price.classList.add('text-right');
        price.innerHTML = formatter.format(body.price);
        productInfo.appendChild(price);

        // Displays the options users have to interact with the product
        let optionsDiv = document.createElement('div');
        optionsDiv.classList.add('flex', 'flex-just-e', 'flex-align-c');
        productInfo.appendChild(optionsDiv);
        
        let addCartButton = document.createElement('button');
        addCartButton.classList.add('button', 'button-confirm');

        if (body.stock == 0) {
            addCartButton.disabled = true;
            addCartButton.innerHTML = `<i class="bi bi-cart-x-fill"></i> Out of Stock`;
        } else {
            addCartButton.innerHTML = `<i class="bi bi-cart-plus-fill"></i> Add to Cart`;
            addCartButton.addEventListener('click', () => {
                addToCart(body.stock);
            });

            let quantityInput = document.createElement('input');
            quantityInput.id = 'quantity'
            quantityInput.setAttribute('type', 'number');
            quantityInput.setAttribute('min', '1');
            quantityInput.setAttribute('max', `${body.stock}`);
            quantityInput.setAttribute('value', '1')

            optionsDiv.appendChild(quantityInput)
        }

        optionsDiv.appendChild(addCartButton);

        


    } else {
        productName.innerHTML = `${httpResponse.status}`;
        productDisplay.innerHTML = `<h2 class="text-center">${httpResponse.statusText}</h2>`;
    }
}

function addToCart(maxStock) {
    quantity = document.getElementById('quantity');

    if (quantity < 1 || quantity > maxStock) {
        alert(`Invalid Quantity, please make sure it is at least 1 and less than ${maxStock}`);
    } else {
        // TODO add item(s) to cart
    }
}