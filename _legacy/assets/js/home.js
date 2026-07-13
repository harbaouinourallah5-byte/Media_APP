// ======================================
// MEDINA BEAUTY
// HOME PAGE PRODUCTS
// ======================================



const homeContainer = 
document.getElementById("homeProducts");





async function loadHomeProducts(){



if(!homeContainer){

return;

}




try{



const response = 
await fetch("data/products.json");



const products = 
await response.json();






// Show first 4 products



const featuredProducts =
products.slice(0,4);





homeContainer.innerHTML = "";





featuredProducts.forEach(product=>{





homeContainer.innerHTML += `



<div class="product-card">





<div class="product-image">



<img 

src="${product.image}"

alt="${product.name}">



</div>






<div class="product-info">



<span class="category">

${product.category}

</span>





<h3>

${product.name}

</h3>






<div class="rating">

⭐ ${product.rating}

</div>







<div class="price">


${product.price} DT


</div>







<a 

href="product.html?id=${product.id}"

class="view-product">


عرض المنتج

</a>





</div>





</div>




`;




});





}

catch(error){



console.log(
"Products loading error:",
error
);



}



}






loadHomeProducts();