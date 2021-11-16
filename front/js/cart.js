 // Creation du code html pour le panier
 let addProductInCard = document.getElementById("cart__items");
 // Creation du code html pour le panier VIDE
 let addCartProduct = document.getElementById("cartAndFormContainer");

 // Creation du code html pour le totalquantity du panier
 let totalQuantity = document.getElementById("totalQuantity");
 // Creation du code html pour le totalprice du panier
 let totalPrice = document.getElementById("totalPrice");


if (emptyCart()) {
  watchEmptyCart();
} else {

  fetch("http://localhost:3000/api/products/")
      .then((response) => response.json())
      .then((getAllProducts) => {
          let getProducts = completedListProducts(getAllProducts);
      })
      .catch((erreur) => console.log("erreur :" + erreur));
}


function completedListProducts(getAllProducts) {

  let getProducts = [];
  let getAllProductsInCart = JSON.parse(localStorage.getItem("getProducts"));

  getAllProductsInCart.forEach(cartItem => {
      let product = getAllProducts.find(item => item._id == cartItem.id)
      product.color = cartItem.color
      product.quantity = cartItem.quantity
      console.log(product)
      getProducts.push(product);
  })
  return getProducts;
}
  
function emptyCart() {
  if (!localStorage.getItem('getProducts')) {
      return true;
  }
  if (JSON.parse(localStorage.getItem('getProducts')).length == 0) {
      return true;
  };
  return false;

  
}

function watchEmptyCart() {
  document.getElementById('firstNameErrorMsg').innerText = 'Votre panier est vide '

}