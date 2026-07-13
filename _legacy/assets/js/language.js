// ======================================
// MEDINA BEAUTY
// MULTI LANGUAGE SYSTEM
// ======================================



const translations = {



ar:{


home:"الرئيسية",

shop:"المتجر",

about:"قصتنا",

contact:"تواصل معنا",


heroTitle:
"اكتشفي جمالك الطبيعي مع Medina Beauty",


heroText:
"منتجات تجميل وعناية بالبشرة مختارة بعناية بلمسة تونسية عصرية.",


shopNow:
"تسوقي الآن",


categories:
"أقسامنا",


featured:
"منتجات مميزة",


delivery:
"توصيل إلى جميع ولايات تونس",


cash:
"الدفع عند الاستلام",


story:
"قصتنا"



},






fr:{



home:"Accueil",

shop:"Boutique",

about:"Notre histoire",

contact:"Contact",



heroTitle:
"Découvrez votre beauté naturelle avec Medina Beauty",



heroText:
"Des produits de beauté sélectionnés avec une touche tunisienne moderne.",



shopNow:
"Acheter maintenant",



categories:
"Catégories",



featured:
"Produits populaires",



delivery:
"Livraison partout en Tunisie",



cash:
"Paiement à la livraison",



story:
"Notre histoire"



},







en:{



home:"Home",

shop:"Shop",

about:"Our Story",

contact:"Contact",



heroTitle:
"Discover your natural beauty with Medina Beauty",



heroText:
"Carefully selected beauty products with a modern Tunisian touch.",



shopNow:
"Shop Now",



categories:
"Categories",



featured:
"Featured Products",



delivery:
"Delivery across Tunisia",



cash:
"Cash on Delivery",



story:
"Our Story"



}



};








let currentLanguage =

localStorage.getItem("language")

||

"ar";









function changeLanguage(language){



currentLanguage = language;



localStorage.setItem(

"language",

language

);



updateLanguage();



}









function updateLanguage(){





document
.querySelectorAll("[data-lang]")
.forEach(element=>{





let key =

element.getAttribute(
"data-lang"
);






if(

translations[currentLanguage][key]

){



element.innerHTML =

translations[currentLanguage][key];



}



});









// Direction change



if(currentLanguage==="ar"){



document.documentElement.dir="rtl";

document.documentElement.lang="ar";



}

else{



document.documentElement.dir="ltr";

document.documentElement.lang=currentLanguage;



}






}









document.addEventListener(

"DOMContentLoaded",

()=>{


updateLanguage();


}

);