// ======================================
// MEDINA BEAUTY
// GLOBAL JAVASCRIPT
// ======================================




// ================================
// MOBILE MENU
// ================================


function openMenu(){


const menu =
document.getElementById("mobileMenu");



if(menu){

menu.classList.add("active");

}


}





function closeMenu(){


const menu =
document.getElementById("mobileMenu");



if(menu){

menu.classList.remove("active");

}


}









// ================================
// HEADER SCROLL EFFECT
// ================================



window.addEventListener("scroll",()=>{


const header =
document.querySelector(".header");



if(header){



if(window.scrollY > 40){


header.classList.add("scrolled");


}else{


header.classList.remove("scrolled");


}


}



});









// ================================
// PAGE LOADER
// ================================



window.addEventListener("load",()=>{


const loader =
document.querySelector(".loader");



if(loader){



setTimeout(()=>{


loader.style.opacity="0";


setTimeout(()=>{


loader.style.display="none";


},500);



},1200);



}



});









// ================================
// GLOBAL WHATSAPP
// ================================



document.addEventListener(
"DOMContentLoaded",
()=>{



const buttons =
document.querySelectorAll(".whatsapp");




buttons.forEach(button=>{


button.addEventListener(
"click",
()=>{


const number =
"XXXXXXXXXXX";



const message =
"مرحبا Medina Beauty 🌿 أريد الاستفسار عن المنتجات";



window.open(

"https://wa.me/"
+
number
+
"?text="
+
encodeURIComponent(message)

);



}

);



});



});









// ================================
// SCROLL ANIMATION
// ================================



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


}


});


},

{

threshold:.15

}

);






document.addEventListener(
"DOMContentLoaded",
()=>{



const elements =
document.querySelectorAll(
".category, .product-card, .value-card, .contact-card"
);



elements.forEach(element=>{


observer.observe(element);


});



});