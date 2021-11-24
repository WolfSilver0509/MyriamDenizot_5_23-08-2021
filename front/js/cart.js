//Initialisation du local storage
let productOnLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productOnLocalStorage);
const textEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
  if (productOnLocalStorage === null || productOnLocalStorage == 0) {
      const emptyCart = `<p>Votre panier est vide</p>`;
      textEmptyCart.innerHTML = emptyCart;
  } else {

  for (let product in productOnLocalStorage){

    
  }
  }}
  
  getCart();