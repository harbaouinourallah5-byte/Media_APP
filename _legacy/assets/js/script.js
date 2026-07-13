const grid = document.getElementById("productsGrid");

fetch("data/products.json")
.then(res=>res.json())
.then(products=>{

products.forEach(product=>{

grid.innerHTML +=`

<div class="card">

<img src="${product.image}">

<div class="card-content">

<span>${product.category}</span>

<h3>${product.name}</h3>

<p>${product.description}</p>

<div class="price">

${product.price} DT

</div>

<a href="#" class="buy-btn">

أضف للسلة

</a>

</div>

</div>

`;

});

});