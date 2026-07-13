// ======================================
// MEDINA BEAUTY
// SHOP SYSTEM
// ======================================



const shopContainer =
document.getElementById("shopProducts");



let allProducts = [];







// LOAD PRODUCTS



async function loadProducts(){



if(!shopContainer){

return;

}



try{



const response =
await fetch("data/products.json");



allProducts =
await response.json();



displayProducts(allProducts);



}



catch(error){


console.log(
"Products error:",
error
);


}



}









// DISPLAY PRODUCTS



function displayProducts(products){



shopContainer.innerHTML = "";





if(products.length === 0){


shopContainer.innerHTML = `


<h2>

لا توجد منتجات

</h2>


`;


return;


}







products.forEach(product=>{





shopContainer.innerHTML += `





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







<p class="price">


${product.price} DT


</p>








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









// SEARCH + FILTER + SORT (composed)

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");


function getState(){

let query = "";

if(searchInput){

query = (searchInput.value || "").toLowerCase().trim();

}

let category = "all";

if(categorySelect){

category = categorySelect.value || "all";

}

let sort = "default";

if(sortSelect){

sort = sortSelect.value || "default";

}

return { query, category, sort };
}


function parseNumber(value){

const n = Number(value);

return Number.isFinite(n) ? n : 0;
}


function applyProducts(){

let products = [...allProducts];

const { query, category, sort } = getState();


// Search

if(query){

products = products.filter(product =>

(String(product.name || "").toLowerCase()).includes(query));

}

// Category

if(category && category !== "all"){

products = products.filter(product => product.category === category);

}

// Sort

switch(sort){

case "low":

products.sort((a,b)=> parseNumber(a.price) - parseNumber(b.price));

break;

case "high":

products.sort((a,b)=> parseNumber(b.price) - parseNumber(a.price));

break;

case "rating":

products.sort((a,b)=> parseNumber(b.rating) - parseNumber(a.rating));

break;

default:

break;

}


displayProducts(products);
}


function bind(){

if(searchInput){

searchInput.addEventListener("input", applyProducts);

}

if(categorySelect){

categorySelect.addEventListener("change", applyProducts);

}

if(sortSelect){

sortSelect.addEventListener("change", applyProducts);

}
}


bind();

loadProducts();
