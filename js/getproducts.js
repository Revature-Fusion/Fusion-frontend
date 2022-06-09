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
            let img = document.createElement('img');

            const blob = new Blob([product.picture.join('')], {type: "image/png"});
            const imageUrl = URL.createObjectURL(blob);

            img.src = imageUrl.toString();
            imgDiv.appendChild(img);
            card.appendChild(imgDiv);
        }

        // Wrapper for product's information
        let productInfo = document.createElement('div');
        productInfo.classList.add('flex', 'flex-col');

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

        // Adds product info to card
        card.appendChild(productInfo);

        // Adds card to product list
        productsList.appendChild(card);
        
    });
}