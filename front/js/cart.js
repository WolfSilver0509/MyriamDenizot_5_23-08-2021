


  // Element HTML du cart
  const cartSection = document.getElementById("cart__items");
  const cartOrder = document.getElementsByClassName("cart__order");
  const cartPrice = document.getElementsByClassName("cart__price");
  const h1 = document.getElementsByTagName("h1");
  
  // fetch 
  function fetchIdData() {
    let selectedProducts = getCart();
    let quantity = 0;
    let price = 0;
    if (localStorage.getItem("panier") != null) {
      for (let i = 0; i < selectedProducts.length; i++) {
        let id = selectedProducts[i][0];
        let color = selectedProducts[i][1];
        let url = "http://localhost:3000/api/products/" + id;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            cartSection.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
                  <div class="cart__item__img">
                    <img src="${data.imageUrl}" alt="${data.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                      <h2>${data.name}</h2>
                      <p>${data.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${selectedProducts[i][2]}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" onclick="deleteItem()">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;
            // total price (if quantity (selectedProducts[i][2]))
            price += data.price * selectedProducts[i][2];
            document.getElementById("totalPrice").innerHTML = price;
          });
  
        // total Quantity
        quantity += selectedProducts[i][2];
        document.getElementById("totalQuantity").innerHTML = quantity;
      }
    } else {
      h1[0].innerHTML = `Votre panier est vide`;
      cartOrder[0].innerHTML = "";
      cartPrice[0].innerHTML = "";
    }
  }

  fetchIdData();

