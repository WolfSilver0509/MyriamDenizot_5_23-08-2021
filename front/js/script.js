//fonction affichage dynamique accueil//


let product = fetch("http://localhost:3000/api/products");
product
  .then((response) => {
   
    let kanapprom = response.json();
    kanapprom.then((kanaptabs) => {
      printProduct(kanaptabs); 
    });
  })
  .catch((err) => {
    
    document.getElementById("items").innertext =
      "Désolé un problème est survenu pendant le chargement de notre catalogue.veuillez réessayer ultérieurement";
    
  });

  //Fonction affichage dynamique des produits du Json insérer dans le DOM
  function printProduct(kanaptabs){
    // reponse = tableau à boucler par index=k//
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
  }