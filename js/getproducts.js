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
        card.classList.add('flex', 'flex-col', 'card');

        // TODO: fix images not being properly diplayed
        if (product.picture) {
            // Creates the picture section of the card
            let imgDiv = document.createElement('div');
            let img = new Image();

            console.log(product.picture);

            var arrayBufferView = new Uint8Array(product.picture)

            var blob = new Blob([arrayBufferView], {type: "image/png"});
            var imageUrl = URL.createObjectURL(blob);
            img.src = imageUrl;
            imgDiv.appendChild(img);
            card.appendChild(imgDiv);
        }

        // Wrapper for product's information
        let productInfo = document.createElement('div');
        productInfo.classList.add('flex', 'flex-col', 'flex-align-c');

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