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
  
  itemQuantity.forEach( item => {
      const itemCloset = item.closest("article");
      let newQuantity = "";
      const id = itemCloset.dataset.id;
      const color = itemCloset.dataset.color;

      item.addEventListener('change', e => {
          e.preventDefault();
          newQuantity= Number(item.value);
          console.log("new" + newQuantity);

          productOnLocalStorage.forEach( product => {
            if (product.id === id  && product.color === color){ 
                product.quantityProduct = newQuantity}
          })
      })
  })
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

// Contact Fonction et ecoute change Regex

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// funtion et change Prenom
function validFirstNameRegex(firstName) {
  let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$", "g");
  console.log("ok log log");
   return validRegex(firstName, "prénom", nameRegExp);
}

firstName.addEventListener("change", (e) => {
  e.preventDefault();
  validFirstNameRegex(firstName);
});

//Fonction et change Nom
function validLastNameRegex(lastName) {
  let nameRegExp = new RegExp("^[À-ÿA-z]+$|^[À-ÿA-z]+-[À-ÿA-z]+$", "g");
  return validRegex(lastName, "nom", nameRegExp);
}

lastName.addEventListener("change", (e) => {
  e.preventDefault();
  validLastNameRegex(lastName);
});
//Fonction et change Adresse
function validAddressRegex(address) {
  let nameRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  return validRegex(address, "adresse", nameRegExp);
}

address.addEventListener("change", (e) => {
  e.preventDefault();
  validAddressRegex(address);
});
//Fonction et change City
function validCityRegex(city) {
  let nameRegExp = new RegExp("^[a-zA-Z',.\s-]{1,25}$", "g");
  return validRegex(city, "ville", nameRegExp);
}

city.addEventListener("change", (e) => {
  e.preventDefault();
  validCityRegex(city);
});
//Fonction et change Email
function validEmailRegex(email) {
  let nameRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\w+)*(\\.\\w{2,3})+$", "g");
  return validRegex(email, "email", nameRegExp);
}

email.addEventListener("change", (e) => {
  e.preventDefault();
  validEmailRegex(email);
});
//Fonction ValideRegex stylisation unique.
function validRegex(inputName, nameType, nameRegExp) {
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "Validé";
    inputName.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputName.nextElementSibling.innerHTML = "Saisissez votre " + nameType;
    inputName.nextElementSibling.style.color = "red";
    return false;
  }
}


function printForm (){

  
  const btnOrder = document.getElementById("order");

  btnOrder.addEventListener('click', (e)=>{
    e.preventDefault()

    // Recup des inputs

    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    let canOrder = validFirstNameRegex(inputName) && validLastNameRegex(inputLastName) && validAddressRegex(inputAddress) && validCityRegex(inputCity) && validEmailRegex(inputMail) ;
    
    console.log(canOrder);

     if(canOrder){
        console.log("ok order");
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

      document.location.href = `confirmation.html?orderId=${data.orderId}`;
  })
  .catch((err) => {
      alert ("Problème avec fetch : " + err.message);
  });

}

else{
    
    alert("Veuillez saisir correctement tout les champs !")
}

});
}

printForm();