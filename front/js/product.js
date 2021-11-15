const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log(" Je renvois l'id du canapé  " + id);
const objectURL= "http://localhost:3000/api/products/" + id;
console.log("url fetch récupérer est " + objectURL);

// Création de la fonction qui recupere via le fetch les données dans le Json et les modifies dans le DOM
let printProductCard = function () {
    fetch(objectURL)
      .then((response) => response.json())
      .then((data) => {

        console.log(data);
        
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        
        let name = document.getElementById("title");
        name.innerHTML = data.name;
        let title = document.querySelector("title");
        title.innerHTML = data.name;
        
        let price = document.getElementById("price");
        price.innerHTML = data.price;
        
        let description = document.getElementById("description");
        description.innerHTML = data.description;
        
        let color = document.getElementById("colors");
        for (i = 0; i < data.colors.length; i++) {
          color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
      })

      .catch((err) => { //si requete impossible affichage message d'erreur  et message erreur console
        document.getElementsByClassName('item').innerText = 'Désolé un problème est survenu pendant le chargement du produit.veuillez réessayer ultérieurement'
        console.log('Problème API Page Produit');
          });
  };



  // Appelle de la fonction crée.
  printProductCard();


  // La fonction qui recupere la valeur de la couleur 
function getColor() {
  let color = document.getElementById("colors");
  return color.value;
}
  // La fonction qui recupere la valeur du champs quantity 
function getQuantity() {
  let quantity = document.getElementById("quantity");
  return quantity.value;
}


const sendBtnProductCart = document.getElementById("addToCart");
// Evenement sendBtnProductCart, fonction printProductCard qui active les autres fonction au click
sendBtnProductCart.addEventListener("click", () => {
  let quantity = getQuantity();
  let color = getColor();
  console.log(`la couleur est ${color} et la quantité est de ${quantity}`);


// Rajout d'amélioration a partir d'ici dans la fonction du click panier


if (quantity < 1){
  alert(" Vous devez avoir une quantité supérieur à 1 ! ")
  return;
}

if (color.length == 0){
  alert(" Vous devez avoir séléctioné une couleur pour continuer !")
}

let product = { id, color , quantity };
let getProducts = [];


if (localStorage.getItem('getProducts')){
  getProducts = JSON.parse(localStorage.getItem("getProducts"));

  let haveProductOnCart = getProducts.find(product => product.id == id && product.color == color);
  
  if(haveProductOnCart){
    haveProductOnCart.quantity = Number(haveProductOnCart.quantity) + Number(quantity);
    product = haveProductOnCart;
  } else {
    getProducts.push(product)
  } 
}
else {
  getProducts.push(product)
}

localStorage.setItem('getProducts', JSON.stringify(getProducts));
alert('Votre commmande est dans le panier')
window.location.href = 'cart.html'

});





