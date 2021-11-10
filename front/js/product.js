const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
console.log(" Je renvois l'id du canapé  " + id);
const objectURL= "http://localhost:3000/api/products/" + id;
console.log("url fetch récupérer est " + objectURL);

// Création de la fonction qui recupere via le fetch les données dans le Json et les modifies dans le DOM
let ProductCard = function () {
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
      });
  };

// .catch((err) => { //si requete impossible affichage message d'erreur  et message erreur console
//     document.getElementById('item').innertext = 'Désolé un problème est survenu pendant le chargement de notre catalogue.veuillez réessayer ultérieurement'
//     console.log('Problème API');
//       });

  // Appelle de la fonction crée.
  ProductCard();


  // La fonction qui recupere la valeur de la couleur 
function ColorChoice() {
  let colorK = document.getElementById("colors");
  return colorK.value;
}
  // La fonction qui recupere la valeur du champs quantity 
function quantityProduct() {
  let productQuantity = document.getElementById("quantity");
  return productQuantity.value;
}

const sendBtnProductCart = document.getElementById("addToCart");
// Evenement sendBtnProductCart, fonction addCart qui active les autres fonction au click
sendBtnProductCart.addEventListener("click", () => {
  let productQuantity = quantityProduct();
  let colorK = ColorChoice();
  //addProductToCart(id, productQuantity ,colorK);
  console.log(`la couleur est ${colorK} et la quantité est ${productQuantity}`);
});

//addProductToCart --> Crée une fonction dans le panier pour ajouter les valeurs récuperer ici .
