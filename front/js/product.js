// Recuperation de l'url
const str = window.location;
const url = new URL(str);
// recuperation de ce qu'il y a aprés le id dans l'url
const id = url.searchParams.get("id");
//console.log(" Je renvois l'id du canapé  " + id);
const objectURL = "http://localhost:3000/api/products/" + id;
//console.log("url fetch récupérer est " + objectURL);

// Remplacement des données statique par la récupération fetch
const img = document.querySelector(".item__img");

const name = document.getElementById("title");

const title = document.querySelector("title");

const price = document.getElementById("price");

const description = document.getElementById("description");

const color = document.getElementById("colors");

let productData;

fetch(objectURL)
    .then(response => response.json())
    .then(data => {
        productData = data 
         
        localStorage.setItem('fetchProduct', JSON.stringify(productData));

        img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        name.innerHTML = data.name;
        title.innerHTML = data.name;
        price.innerHTML = data.price;
        description.innerHTML = data.description;
        for (i = 0; i < data.colors.length; i++) {
            color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;}

            
    
    })
    .catch((err) => {
        //si requete impossible affichage message d'erreur  et message erreur console
        document.getElementsByClassName("item").innerText =
          "Désolé un problème est survenu pendant le chargement du produit.veuillez réessayer ultérieurement";
        console.log("Problème API Page Produit");
      });
    
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

  // Evenement click Ajout au Panier 
  sendBtnProductCart.addEventListener("click", () => {

    let color = getColor();
    let quantity = getQuantity();

    console.log(`la couleur est ${color} et la quantité est de ${quantity} `);
  
    if (quantity < 1) {
      alert(" Vous devez avoir une quantité supérieur à 1 ! ");
      return;
    }
  
    if (color.length == 0) {
      alert(" Vous devez avoir séléctioné une couleur pour continuer !");
    }
    const fetchProduct = localStorage.getItem('fetchProduct');
    
    let product = {id, color, quantity, fetchProduct };
    let productS = [];
  
    if (localStorage.getItem("productS")) {
      // Si le local storage n'existe pas
      productS = JSON.parse(localStorage.getItem("productS"));
      
      
  
      let addedProductOnCart = productS.find(
        (product) => product.id == id && product.color == color
      );
      // Recherche si l'id et la couleur sont présent , le find retourne le produit
  
      if (addedProductOnCart) {
        addedProductOnCart.quantity =
          Number(addedProductOnCart.quantity) + Number(quantity); // si la quantité est dans la panier ajouter un poduit
        
        // si le produit est dans la panier j'ajout la quantité ajouter
      } else {
        productS.push(product);
      }
      // Rajout du produit dans le tableau
    } else {
      productS.push(product);
    }
  
    localStorage.setItem("productS", JSON.stringify(productS));
    alert("Votre commmande est dans le panier");
    //window.location.href = 'cart.html'
  
    console.log(productS);
    
  });