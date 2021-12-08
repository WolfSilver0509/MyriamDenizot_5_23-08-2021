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
               <input  type="number" class="itemQuantity" id="${product.id}" name="itemQuantity" min="1" max="100" value=${product.quantityProduct}>
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

  let itemQuantity = document.querySelectorAll(".itemQuantity");

  for (let m = 0; m < itemQuantity.length; m++){
      itemQuantity[m].addEventListener("change" , (event) => {
          event.preventDefault();

          console.log(m);

                 productOnLocalStorage[m].quantityProduct = itemQuantity[m].valueAsNumber;
                 
          console.log(productOnLocalStorage[m].quantityProduct);

          localStorage.setItem("products", JSON.stringify(productOnLocalStorage));
      
          // refresh rapide
          location.reload();
      })
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

// Fonction du total du panier 
function cartTotal() {

  let total = 0;
  productOnLocalStorage.forEach(product => {
      total = total + (Number(product.productPrice) * Number(product.quantityProduct))
  })


  const printTotal = document.getElementById("totalPrice");
  const  printHTMLTotal = `${total}`;
  printTotal.innerHTML= printHTMLTotal;

  //return total;
}

cartTotal(); 


// Fonction Ajout de quantité 

function cartQuantityTotal(){

  let quantityTotal = 0;

  productOnLocalStorage.forEach(product => {
    quantityTotal = quantityTotal + (Number (product.quantityProduct++))
  })

  const printQuantityTotal = document.getElementById("totalQuantity");
  const printQuantityHTMLTotal =`${quantityTotal}`;
  printQuantityTotal.innerHTML = printQuantityHTMLTotal;

}

cartQuantityTotal();


// Etapes Contact

/*Nom et Prénom */
const form = document.getElementsByClassName("cart__order__form")[0];

form.firstName.addEventListener("change", function () {
  validName(this);
});
form.lastName.addEventListener("change", function () {
  validName(this);
});

const validName = function (inputName) {
  let nameRegExp = new RegExp("^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ-]+[A-Za-z]+$", "g");
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "Validé";
    inputName.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputName.nextElementSibling.innerHTML = "Saisissez votre prénom ou votre nom";
    inputName.nextElementSibling.style.color = "red";
    return false;
  }
};

/*adresse */
form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAdrress) {
  let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testAddress = addressRegExp.test(inputAddress.value);
  if (testAddress) {
    inputAddress.nextElementSibling.innerHTML = "Validé";
    inputAddress.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputAddress.nextElementSibling.innerHTML = "Saisissez votre adresse";
    inputAddress.nextElementSibling.style.color = "red";
    return false;
  }
};

/*Ville*/
form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z',.\s-]{1,25}$", "g");
  let testCity = cityRegExp.test(inputCity.value);
  if (testCity) {
    inputCity.nextElementSibling.innerHTML = "Validé";
    inputCity.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputCity.nextElementSibling.innerHTML = "Saisissez votre ville";
    inputCity.nextElementSibling.style.color = "red";
    return false;
  }
};

/*Email*/
form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\w+)*(\\.\\w{2,3})+$","g");
  let testEmail = emailRegExp.test(inputEmail.value);
  if (testEmail) {
    inputEmail.nextElementSibling.innerHTML = "Validé";
    inputEmail.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputEmail.nextElementSibling.innerHTML ="Saisissez votre adresse mail complète";
    inputEmail.nextElementSibling.style.color = "red";
    return false;
  }
};

// fonction contact dans le localStorage
console.log("Ok");

function printForm (){

  
  const btnOrder = document.getElementById("order");

  btnOrder.addEventListener('click', (e)=>{

    // Recup des inputs

    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

  //Construction d'un array depuis le local storage
  let idProducts = [];
  for (let i = 0; i<productOnLocalStorage.length;i++) {
      idProducts.push(productOnLocalStorage[i].id);
  }
  console.log(idProducts);

  const order = {
      contact : {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAddress.value,
          city: inputCity.value,
          email: inputMail.value,
      },
      products: idProducts,
  } 

  const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
          'Accept': 'application/json', 
          "Content-Type": "application/json" 
      },
  };

  fetch("http://localhost:3000/api/products/order", options)
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      //localStorage.clear();
      localStorage.setItem("orderId", data.orderId);

      document.location.href = "confirmation.html";
  })
  .catch((err) => {
      alert ("Problème avec fetch : " + err.message);
  });       
});
}

printForm();