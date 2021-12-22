let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

getAndPrintProduct();

// Récupération des products de l'API Recuperer et afficher les donnée de l'API
function getAndPrintProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((data) => {
      return data.json();
    })
    // Répartition des données de l'API dans le DOM

    .then(async function (resultatAPI) {
      product = await resultatAPI;
      if (product) {
        printProductCard(product);
      }
    })

    .catch((err) => {
        
        document.getElementById("item").innertext =
          "Désolé un problème est survenu pendant le chargement de votre produit .veuillez réessayer ultérieurement";
        
      });
}
//Fonction Afficher les produits dans le DOM
function printProductCard() {
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  let productName = document.getElementById("title");
  productName.innerHTML = product.name;

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;

  let productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;

  for (let colors of product.colors) {
   
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }

  buttonAddProductOnCart(product);
}



// Fonction bouton Ajouter les produits au Paniers et mettre à jour le local storage en meme temps
function buttonAddProductOnCart(){
  const btnSendToCart = document.getElementById("addToCart");

  //Ecouter le bouton au click et ajouter les produit au paniers si les conditions sont respecter
  btnSendToCart.addEventListener("click", () => {
    
    // 2 Condition conditions couleur non nulle et quantité entre 1 et 100
    if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0 && color.value !=0) {

      //Recupération du choix de la couleur
      let colorProduct = color.value;

      //Recupération du choix de la quantité
      let quantityProduct = quantity.value;

      //Récupération des options du product à ajouter au panier
      let objProducts = {
        id: id,
        color: colorProduct,
        quantityProduct: Number(quantityProduct),
        productName: product.name,
        productPrice: product.price,
        productDescription: product.description,
        productImg: product.imageUrl,
        productAltImg: product.altTxt,
      };

      //Récuperer dans le localStorage 
      let productOnLocalStorage = JSON.parse(localStorage.getItem("products"));

      //Si on quelques choses dans le panier
      if (productOnLocalStorage) {

        addProductOnExistingCart(productOnLocalStorage,objProducts);

      }
      //Si le panier est vide
       else {
        initializeCartAndAddProduct(productOnLocalStorage,objProducts);
      }
    }
    //Alerte si condition non respécter
    else{
      alert('Veuillez séléctionner une couleur ou une quantitée ! ')
    }
  });
}


// Function si le produit existe déja dans la panier
function addProductOnExistingCart (productOnLocalStorage,objProducts){
  const resultFind = productOnLocalStorage.find(
    (el) => el.id === id && el.color === color.value
  );
  if (resultFind) {
    let newQuantity =
      parseInt(objProducts.quantityProduct) +
      parseInt(resultFind.quantityProduct);
    resultFind.quantityProduct = newQuantity;
    localStorage.setItem(
      "products",
      JSON.stringify(productOnLocalStorage)
    );
    popUp();
    
  } else {
    productOnLocalStorage.push(objProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(productOnLocalStorage)
    );
    popUp();
  }

}

//Fonction Ajouter un nouveau produit dans le panier
function initializeCartAndAddProduct(productOnLocalStorage,objProducts){
  productOnLocalStorage = [];
  productOnLocalStorage.push(objProducts);
  localStorage.setItem("products", JSON.stringify(productOnLocalStorage));
  popUp();
}

 //fonction fenêtre pop-up de validation avec recap quantité et couleur
 function popUp () {
  if (
    window.confirm(`Votre commande de ${quantity.value} ${product.name} ${color.value} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)
  ) {
     window.location.href ="cart.html";
  }
};
