
var baseURL = 'http://localhost:7000' // Used for all the fetches will be changed to AWS domain name when we deploy to EC2 instance.

// Populate tables using data from fetch
async function populateTables(){

   document.getElementById("ToFill").innerHTML = ""; // Reset the table container!
   let userID = 2 // Will be changed to sessionStorage.getItem("userID");
   console.log(userID);
   console.log("Fetching orders data...");
   const urlForOrders = baseURL + '/ordersByUID/' + userID;
   const httpresponse = await fetch(urlForOrders, {
     method: 'GET',
     body: null,
     headers: {
       "Content-type": "application/json;"
     }
     });    
   const body = await httpresponse.json()
   console.log('body is ' + body); // Should display all the orders of the users as a list.

   // Create table here
   let tableToCreate = document.createElement("table");
   tableToCreate.classList.add("table");
   tableToCreate.classList.add("m-y");

   // Create table header elements here
   let theadToCreate = document.createElement("thead");

   let tRowForHeadToCreate = document.createElement("tr");

   let thOrderNumber = document.createElement("th");
   thOrderNumber.classList.add("text-center");
   thOrderNumber.innerHTML = "Order Number";

   let thOrderDate = document.createElement("th");
   thOrderDate.classList.add("text-center");
   thOrderDate.innerHTML = "Order Date";

   let thAddress = document.createElement("th");
   thAddress.innerHTML = "Address";
   thAddress.classList.add("text-center");

   let thProduct = document.createElement("th");
   thProduct.innerHTML = "Product";
   thProduct.classList.add("text-center");

   let thProductImage = document.createElement("th");
   thProductImage.innerHTML = "Product Image";
   thProductImage.classList.add("text-center");

   let thProductPrice = document.createElement("th");
   thProductPrice.innerHTML = "Product Price";
   thProductPrice.classList.add("text-center");

   let thQuantity = document.createElement("th");
   thQuantity.innerHTML = "Quantity";
   thQuantity.classList.add("text-center");
   let tBody = document.createElement("tbody")
   // Add them all to the div recursively.
   tRowForHeadToCreate.appendChild(thOrderNumber);
   tRowForHeadToCreate.appendChild(thOrderDate);
   tRowForHeadToCreate.appendChild(thAddress);
   tRowForHeadToCreate.appendChild(thProduct);
   tRowForHeadToCreate.appendChild(thProductImage);
   tRowForHeadToCreate.appendChild(thProductPrice);
   tRowForHeadToCreate.appendChild(thQuantity);
   theadToCreate.appendChild(tRowForHeadToCreate);
   tableToCreate.appendChild(theadToCreate);
   tableToCreate.appendChild(tBody)

   console.log("Populating tables...");
   for (let i = 0; i < body.length; i++){
       
       var oID = body[i].oID;
       console.log("Fetching order details data...");
       const urlForOrderDetails = baseURL + '/orderDetailsByOID/' + oID;
       const httpresponse2 = await fetch(urlForOrderDetails, {
         method: 'GET',
         body: null,
         headers: {
           "Content-type": "application/json;"
         }
         });    
       const bodyForOrderDetails = await httpresponse2.json()
       
       console.log(bodyForOrderDetails);

       var totalCost = 0;
  

       for (let j = 0; j < bodyForOrderDetails.length; j++){
         const httpresponse2 = await fetch(urlForOrderDetails, {
         method: 'GET',
         body: null,
         headers: {
           "Content-type": "application/json;"
         }
         });    
       const bodyForOrderDetails = await httpresponse2.json()
       
       console.log(bodyForOrderDetails);
       console.log("grabbing adress")
       // grabbing address
       var u_ID = body[j].uID
       console.log(u_ID)
       const urlForAdress = baseURL + '/address/user/'+ u_ID
       const httpresponse3 = await fetch(urlForAdress, {
         method: 'GET',
         body: null,
         headers: {
           "Content-type": "application/json;"
         }
         });    
       const bodyForAdress = await httpresponse3.json()
       
       console.log(bodyForAdress);
       address = bodyForAdress[0].address
       console.log(address)
       // grabbing products
       console.log("grabbing products")
       var pID = bodyForOrderDetails[j].pID
       const urlForProducts = baseURL + '/products/'+ pID
       const httpresponse4 = await fetch(urlForProducts, {
         method: 'GET',
         body: null,
         headers: {
           "Content-type": "application/json;"
         }
         });    
       const bodyForProducts = await httpresponse4.json()
       
       console.log(bodyForProducts);
       var productName = bodyForProducts.name
       var productImage = bodyForProducts.productImage
       var productPrice = bodyForProducts.price
       var productQuantity = bodyForOrderDetails[j].quantity
     
         //Insert each order details and product info here
         let tRowForDataToCreate = document.createElement("tr");

         //Insert Order ID 
         let thOrderNumberData = document.createElement("th");
         thOrderNumberData.classList.add("text-center");          
         thOrderNumberData.innerHTML = bodyForOrderDetails[j].oID;
         
         //Insert Order Date
         let thOrderDateData = document.createElement("th");
         thOrderDateData.classList.add("text-center");          
         thOrderDateData.innerHTML = new Date(body[i].dateOfPurchasing);


         // NEED TO DO ADDRESS
         let thOrderAddressData = document.createElement("th");
         thOrderAddressData.classList.add("text-center");          
         thOrderAddressData.innerHTML = address;

         // Insert Product Info
         // Requires additonal fetch to products table api.
         let thProductData = document.createElement("th");
         thProductData.classList.add("text-center");          
         thProductData.innerHTML = productName;

         let thProductImageData = document.createElement("th");
         thProductImageData.classList.add("text-center");          
         thProductImageData.innerHTML = productImage;

         let thProductCostData = document.createElement("th");
         thProductCostData.classList.add("text-center");          
         thProductCostData.innerHTML = productPrice;

         var price = 0;

         let thProductQuantityData = document.createElement("th");
         thProductQuantityData.classList.add("text-center");          
         thProductQuantityData.innerHTML = productQuantity;
         
         var quantity = 0;
         
         totalCost += (price * quantity);
         
         //END OF PRODUCT INFO SECTION
         // need to add an append for tbody
         // Add everything to the table
         tRowForDataToCreate.appendChild(thOrderNumberData);
         tRowForDataToCreate.appendChild(thOrderDateData);
         tRowForDataToCreate.appendChild(thOrderAddressData);
         tRowForDataToCreate.appendChild(thProductData);
         tRowForDataToCreate.appendChild(thProductImageData);
         tRowForDataToCreate.appendChild(thProductCostData);
         tRowForDataToCreate.appendChild(thProductQuantityData);
         tBody.appendChild(tRowForDataToCreate);
       }


       if (i == body.length - 1){
         //Insert final cost here.
         let tFooter = document.createElement("tfoot");
         let tRowForFooter = document.createElement("tr");
         let thTotalCostHeader = document.createElement("th");
         thTotalCostHeader.innerHTML = "Total Cost: "
         let thActualTotalCost = document.createElement("th");
         thActualTotalCost.innerHTML = "Cost Placeholder! Currently: " + totalCost;
         let fill1 = document.createElement("th");
         let fill2 = document.createElement("th");
         let fill3 = document.createElement("th");
         let fill4 = document.createElement("th");
         let fill5 = document.createElement("th");
         tRowForFooter.appendChild(thTotalCostHeader);
         tRowForFooter.appendChild(thActualTotalCost);
         tRowForFooter.appendChild(fill1);
         tRowForFooter.appendChild(fill2);
         tRowForFooter.appendChild(fill3);
         tRowForFooter.appendChild(fill4);
         tRowForFooter.appendChild(fill5);
         tFooter.appendChild(tRowForFooter)
         tableToCreate.appendChild(tFooter);
       }
   }

   document.getElementById("ToFill").appendChild(tableToCreate);

}

