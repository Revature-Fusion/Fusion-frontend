displayProducts();

async function displayProducts() {
    const url = 'http://localhost:7000/products'

    const httpResult = await fetch(url);
    const body = await httpResult.json();

    console.log(body);

    // Element where products will be listed
    productsList = document.getElementById('products');
    productsList.innerHTML = '';

    body.forEach(product => {
        // Creates a product card
        let card = document.createElement('div');
        card.classList.add('flex', 'flex-col', 'flex-just-start', 'm', 'card');

        // TODO: fix images not being properly diplayed
        if (product.picture) {
            // Creates the picture section of the card
            let img = new Image();
            img.classList.add('product-image')
            img.src = `images/${product.picture}`;
            card.appendChild(img);
        } else {
            card.classList.add('card-no-image');
        }

        // Wrapper for product's information
        let productInfo = document.createElement('div');
        productInfo.classList.add('flex', 'flex-col', 'flex-align-c', 'product-info');

        // Product's  name
        let productName = document.createElement('div');
        productName.classList.add('text-center')
        productName.innerHTML = product.name;
        productInfo.appendChild(productName);

        //Used to format price to USD
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Product's price
        let productPrice = document.createElement('div');
        productPrice.classList.add('text-center');
        productPrice.innerHTML = formatter.format(product.price);
        productInfo.appendChild(productPrice);

        // Link to view product's details
        let productLink = document.createElement('a');
        productLink.classList.add('button', 'button-primary');
        productLink.href = `displayproduct.html?pID=${product.p_id}`
        productLink.innerHTML = 'View'
        productInfo.appendChild(productLink);

        // Adds product info to card
        card.appendChild(productInfo);

        // Adds card to product list
        productsList.appendChild(card);
        
    });
}