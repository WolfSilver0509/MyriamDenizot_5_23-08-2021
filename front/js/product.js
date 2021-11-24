var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

console.log(id);

const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

getProduct();

// Récupération des products de l'API
function getProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((data) => {
      return data.json();
    })
    // Répartition des données de l'API dans le DOM

    .then(async function (resultatAPI) {
      product = await resultatAPI;
      console.table(product);
      if (product) {
        printProductCard(product);
      }
    })

    .catch((err) => {
        //si requete impossible affichage message d'erreur en place de la liste de produit et message erreur console//
        document.getElementById("item").innertext =
          "Désolé un problème est survenu pendant le chargement de votre produit .veuillez réessayer ultérieurement";
        console.log("Problème API page product.js");
      });
}

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
    console.log(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }

  addProductOnCart(product);
}

//Fonction ajouter au panier

function addProductOnCart(product) {
  const btnSendToCart = document.getElementById("addToCart");

  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  btnSendToCart.addEventListener("click", () => {
    if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0) {
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

      //Initialisation du local storage
      let productOnLocalStorage = JSON.parse(localStorage.getItem("products"));

      //fenêtre pop-up
      const popUp = () => {
        if (
          window.confirm(`Votre commande de ${quantityProduct} ${product.name} ${colorProduct} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)
        ) {
           window.location.href ="cart.html";
        }
      };

      //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 product
      if (productOnLocalStorage) {
        const resultFind = productOnLocalStorage.find(
          (el) => el.id === id && el.color === colorProduct
        );
        //Si le product commandé est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(objProducts.quantityProduct) +
            parseInt(resultFind.quantityProduct);
          resultFind.quantityProduct = newQuantity;
          localStorage.setItem(
            "products",
            JSON.stringify(productOnLocalStorage)
          );
          console.table(productOnLocalStorage);
          popUp();
          //Si le produit commandé n'est pas dans le panier
        } else {
          productOnLocalStorage.push(objProducts);
          localStorage.setItem(
            "products",
            JSON.stringify(productOnLocalStorage)
          );
          console.table(productOnLocalStorage);
          popUp();
        }
        //Si le panier est vide
      } else {
        productOnLocalStorage = [];
        productOnLocalStorage.push(objProducts);
        localStorage.setItem("products", JSON.stringify(productOnLocalStorage));
        console.table(productOnLocalStorage);
        popUp();
      }
    }
  });
}
