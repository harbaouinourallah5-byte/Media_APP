// ======================================
// MEDINA BEAUTY
// PRODUCT + WHATSAPP ORDER SYSTEM
// ======================================



const productContainer =
document.getElementById("productDetails");



let currentProduct = null;


let quantity = 1;








// GET PRODUCT ID



const urlParams =
new URLSearchParams(window.location.search);



const productId =
Number(urlParams.get("id"));









// LOAD PRODUCT



async function loadProduct(){



if(!productContainer){

return;

}



try{



const response =
await fetch("data/products.json");



const products =
await response.json();





currentProduct =
products.find(
product=>product.id===productId
);







if(!currentProduct){



productContainer.innerHTML = `

<h2>

المنتج غير موجود

</h2>

`;

return;


}






productContainer.innerHTML = `




<div class="product-image-big">


<img

src="${currentProduct.image}"

alt="${currentProduct.name}">


</div>








<div class="product-info-big">





<span class="category">


${currentProduct.category}


</span>






<h1>

${currentProduct.name}

</h1>







<div class="rating">


⭐ ${currentProduct.rating}


</div>







<p class="description">


${currentProduct.description}


</p>







<h2 class="price">


${currentProduct.price} DT


</h2>







<div class="quantity-box">



<button onclick="changeQuantity(-1)">

-

</button>




<span id="quantity">

1

</span>




<button onclick="changeQuantity(1)">

+

</button>




</div>








<button

class="whatsapp-order"

onclick="openOrder()">


اطلب الآن 💬


</button>






</div>





`;





}



catch(error){



console.log(error);



}




}









// QUANTITY



function changeQuantity(number){



quantity += number;





if(quantity < 1){


quantity = 1;


}





document.getElementById(
"quantity"
).innerHTML = quantity;



}









// OPEN POPUP



function openOrder(){



const popup =
document.getElementById("orderPopup");



if(popup){



popup.style.display="flex";



}



}









// CLOSE POPUP



function closeOrder(){



const popup =
document.getElementById("orderPopup");



if(popup){



popup.style.display="none";



}



}









// SEND ORDER TO WHATSAPP



function sendOrder(){



const name =
document.getElementById("customerName").value;



const phone =
document.getElementById("customerPhone").value;



const city =
document.getElementById("customerCity").value;



const address =
document.getElementById("customerAddress").value;






if(

name===""

||

phone===""

||

city===""

){



alert(
"الرجاء إدخال الاسم والهاتف والولاية"
);



return;


}








const total =

currentProduct.price * quantity;









const whatsappNumber =

"XXXXXXXXXXX";









const message = `

مرحبا Medina Beauty 🌿


أريد تأكيد طلب:


🛍 المنتج:

${currentProduct.name}



📦 الكمية:

${quantity}



💰 السعر:

${total} DT



👤 الاسم:

${name}



📞 الهاتف:

${phone}



📍 الولاية:

${city}



🏠 العنوان:

${address}



💵 طريقة الدفع:

الدفع عند الاستلام



شكرا ❤️

`;









window.open(


"https://wa.me/"

+

whatsappNumber

+

"?text="

+

encodeURIComponent(message)


);






closeOrder();



}









loadProduct();