// Creation du code html pour le panier
let items = document.getElementById("cart__items");
// Creation du code html pour le panier VIDE
let cartAndFormContainer = document.getElementById("cartAndFormContainer");

// Creation du code html pour le totalquantity du panier
let totalQuantity = document.getElementById("totalQuantity");
// Creation du code html pour le totalprice du panier
let totalPrice = document.getElementById("totalPrice");

if (emptyCart()) {
  alertEmptyCart();
} else {
//   fetch("http://localhost:3000/api/products/")
//     .then((response) => response.json())
//     .then((getAllProducts) => {
//       completedListProducts(getAllProducts);
//     })
//     .catch((erreur) => console.log("erreur :" + erreur));
}

function completedListProducts(getAllProducts) {
  getProducts = JSON.parse(localStorage.getItem("getProducts"));
  for (let k = 0; k < kanaptabs.length; k++) {
    //creation de variable avec les parametres propre au produit
    let produit = new Object();
    produit.id = kanaptabs[k]["_id"];
    produit.name = kanaptabs[k]["name"];
    produit.imageUrl = kanaptabs[k]["imageUrl"];
    produit.description = kanaptabs[k]["description"];
    produit.alttxt = kanaptabs[k]["altTxt"];

    //ajout du code HTML commenté en ressortant les variables précedentes
    document.getElementById("items").innerHTML +=
      '<a href="./product.html?id=' +
      produit.id +
      '">' +
      "<article>" +
      '<img src="' +
      produit.imageUrl +
      '" alt="' +
      produit.alttxt +
      '">' +
      '<h3 class="productName">' +
      produit.name +
      "</h3>" +
      '<p class="productDescription">' +
      produit.description +
      "</p>" +
      "</article>" +
      "</a>";
  }

  let getProducts = [];
  function completedListProducts(getAllProducts) {
    let product = getAllProducts.find((item) => item._id == cartItem.id);
    product.color = cartItem.color;
    product.quantity = cartItem.quantity;
    getProducts.push(product);
    console.log(product);
  }
  return getProducts;
}

function emptyCart() {
  if (!localStorage.getItem("getProducts")) {
    return true;
  }
  if (JSON.parse(localStorage.getItem("getProducts")).length == 0) {
    return true;
  }
  return false;
}

function alertEmptyCart() {
 alert("Votre panier est vide ! ")
}
