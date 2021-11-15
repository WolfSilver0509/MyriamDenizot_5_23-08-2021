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
  addProductToCart(id, quantity ,color);
  console.log(`la couleur est ${color} et la quantité est de ${quantity}`);
});

//addProductToCart --> Crée une fonction dans le panier pour ajouter les valeurs récuperer ici .



// fonction getCart qui permet de mettre dans le local storage
function getCart() {
  let selectedProducts = []; // variable selectedProducts avec un tableau vide à remplir
  if (localStorage.getItem("panier") != null) {
    selectedProducts = JSON.parse(localStorage.getItem("panier"));
  }
  return selectedProducts;
}


function addProductToCart(id, quantity, color) {
  if (quantity == 0) {
    return;
  }
  let selectedProducts = getCart();
  if (selectedProducts.length == 0) {
    selectedProducts = [[id, quantity, color]];
  } else {
    let found = false;
    for (let i = 0; i < selectedProducts.length; i++) {
      if (id === selectedProducts[i][0] && color === selectedProducts[i][1]) {
        found = true;
        selectedProducts[i][2] += quantity;
      }
    }
    if (found == false) {
      let selectedProduct = [id, quantity, color];
      selectedProducts.push(selectedProduct);
    }
  }
  localStorage.setItem("panier", JSON.stringify(selectedProducts));

  console.log(selectedProducts); //log recupere tableau 
}




