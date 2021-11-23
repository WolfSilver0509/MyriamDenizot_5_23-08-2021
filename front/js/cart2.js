// Creation du code html pour le panier
let items = document.getElementById("cart__items");
// Creation du code html pour le panier VIDE
let cartAndFormContainer = document.getElementById("cartAndFormContainer");

// Creation du code html pour le totalquantity du panier
let totalQuantity = document.getElementById("totalQuantity");
// Creation du code html pour le totalprice du panier
let totalPrice = document.getElementById("totalPrice");

let productS = JSON.parse(localStorage.getItem("productS"));

if (emptyCart()) {
  alertEmptyCart();
} else {
  let productS = JSON.parse(localStorage.getItem("productS"));
  for (let product of productS) {
    printProduct(product);
  }
}

// Fonction Affichage des produits 
function printProduct() {

  let cartItems = document.getElementById('cart__items');
  let productS = JSON.parse(localStorage.getItem("productS"));
  let fetchProduct = localStorage.getItem('fetchProduct');
    
  if(productS){ 

    for (let product of productS) {

      cartItems.innerHTML += 
      `<article class="cart__item" data-id="${product.id}">
      <div class="cart__item__img">
        <img src="${product.printImg}" alt="${product.printAltTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${product.printName}</h2>
          <p>${product.printPrice} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : ${product.color} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
  }
      

      







        //const fetchProduct = localStorage.getItem('fetchProduct');
        
//         for(let m = 0; m < productS.length; m++){
//             let price = productS[m].price;
//             let quantity = productS[m].quantity;
//   document.getElementById('cart__items').innerHTML = `
//   <article class="cart__item" data-id="{product-ID}">
//     <div class="cart__item__img">
//       <img  src="${productS[m].imageUrl}" alt="${productS[m].altTxt}">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__titlePrice">
//         <h2>${productS[m].name}</h2>
//         <p>${productS[m].color}</p>
//         <p>€       </p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : ${productS[m].quantity}</p>
         
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem" onclick=deleteItem()>Delete</p>
//         </div>
//       </div>
//     </div>
//   </article>
// `;
//         }
}
}


// Fonction Panier Vide
function emptyCart() {
  if (!localStorage.getItem("productS")) {
    return true;
  }
  if (JSON.parse(localStorage.getItem("productS")).length == 0) {
    return true;
  }
  return false;
}
// Fonction Alerte Panier Vide
function alertEmptyCart() {
  alert("Votre panier est vide ! ");
}
