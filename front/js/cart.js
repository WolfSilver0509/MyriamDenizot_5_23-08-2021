//Initialisation du local storage
let productOnLocalStorage = JSON.parse(localStorage.getItem("product"));
//console.table(productOnLocalStorage);
const textEmptyCart = document.querySelector("#cart__items");


console.log(productOnLocalStorage[0].productName);

// Si le panier est vide
function getCart(){
 
  if (localStorage.getItem("product")){
    
    if(productOnLocalStorage.length > 0 ){ 

     // console.log(productOnLocalStorage);

       productOnLocalStorage.map(product => {
        document.getElementById("cart__items").innerHTML +=
         `   <article class="cart__item" data-id="${product.id}">
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
       </article> `

         })
      
    }

    else{
    const emptyCart = `<p>Votre panier est vide</p>`;
    textEmptyCart.innerHTML = emptyCart;
    }
  }


 
}


const doc = document.querySelectorAll(".itemQuantity");
// for( let i in doc){
//   console.log(doc);
// }

console.log(doc);

  getCart();