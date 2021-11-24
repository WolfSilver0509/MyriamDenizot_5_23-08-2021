//Initialisation du local storage
let productOnLocalStorage = JSON.parse(localStorage.getItem("products"));
//console.table(productOnLocalStorage);
const textEmptyCart = document.querySelector("#cart__items");



// Si le panier est vide
function getCart() {
  if (localStorage.getItem("products")) {
    if (productOnLocalStorage.length > 0) {
      // console.log(productOnLocalStorage);

      productOnLocalStorage.forEach((product) => {
        document.getElementById(
          "cart__items"
        ).innerHTML += `   <article class="cart__item" data-id="${product.id}">
         <div class="cart__item__img">
           <img src="${product.productImg}" alt=${product.productAltImg}>
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__titlePrice">
             <h2>${product.productName}</h2>
             <p>${product.productPrice} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Qté : ${product.color} </p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantityProduct}>
             </div>
             <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article> `;
      });
    } else {
      const emptyCart = `<p>Votre panier est vide</p>`;
      textEmptyCart.innerHTML = emptyCart;
    }
  }
}

getCart();

// Changement de la quantité des produits
function changeQuantity() {
  let quantityChanged = document.querySelectorAll(".itemQuantity");

  for (let m = 0; m < quantityChanged.length; m++) {
    quantityChanged[m].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityIsChanged = productOnLocalStorage[m].quantityProduct;
      let quantityChangedValue = quantityChanged[m].valueAsNumber;

      const resultFind = productOnLocalStorage.find(
        (el) => el.quantityProduct !== quantityIsChanged
      );

      resultFind.quantityProduct = quantityChangedValue;
      productOnLocalStorage[m].quantityProduct = resultFind.quantityProduct;

      localStorage.setItem("products", JSON.stringify(productOnLocalStorage));

      // refresh rapide 
      location.reload();
    });
  }
}
changeQuantity();

// Suppression des produits
function deleteProduct() {
  let btnDelete = document.querySelectorAll(".deleteItem");

  for (let n = 0; n < btnDelete.length; n++) {
    btnDelete[n].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = productOnLocalStorage[n].id;
      let colorDelete = productOnLocalStorage[n].color;

      productOnLocalStorage = productOnLocalStorage.filter(
        (el) => el.id !== idDelete || el.color !== colorDelete
      );

      localStorage.setItem("products", JSON.stringify(productOnLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit est supprimé de votre panier");

      location.reload();
    });
  }
}
deleteProduct();
