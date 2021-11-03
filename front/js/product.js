//Récupération url courante //
let urlcourante = document.location.href;
// Création d'une variable stockant l'url courante .
let kanap_id = urlcourante.substring(urlcourante.lastIndexOf("=") + 1);
//requete API -> promesse//
const kanap = fetch("http://localhost:3000/api/products");
kanap.then((response) => { //si ok promesse devient reponse//
    let kanappromes = response.json();
    kanappromes.then((kanaptableau) => { // reponse = tableau à boucler pour chercher correspondance entre var product_id et _id du tableau //
        for (let m = 0; m < kanaptableau.length; m++) {
            //creation d'objet produit ayant pour parametres les caracteristiques du canapé 
            let produit = new Object()
            produit.colors = kanaptableau[m]['colors']
            produit.id = kanaptableau[m]['_id']
            produit.name = kanaptableau[m]['name']
            produit.price = kanaptableau[m]['price']
            produit.imageUrl = kanaptableau[m]['imageUrl']
            produit.description = kanaptableau[m]['description']
            produit.alttxt = kanaptableau[m]['altTxt']
            

            if (kanap_id == produit.id) {
                //ajout du code HTML commenté en ajoutant les parametres propre a chaque produit via index m//
                document.getElementById('title').innerHTML = document.getElementsByTagName('title')[0].innerHTML = produit.name
                document.getElementById('price').innerHTML = produit.price
                document.getElementById('description').innerHTML = produit.description
                document.getElementsByClassName('item__img')[0].innerHTML = '<img src="' + produit.imageUrl + '" alt="' + produit.alttxt + '">'
                produit.colors.forEach(color => {
                    document.getElementById('colors').innerHTML += '<option value="' + color + '">' + color + '</option>';
                });;
                const button = document.getElementById('addToCart');
                var select = document.getElementById('colors');
                button.addEventListener('click', function() {
                    var color = select.options[select.selectedIndex].value;
                    var quantity = document.getElementById("quantity").value;
                    var liste = [produit.name, kanap_id, produit.price, color, quantity]
                    localStorage.setItem('panier', JSON.stringify(liste))
                    console.log(liste)
                });
            }
        }
    })
}).catch((err) => { //si requete impossible affichage message d'erreur en place de la liste de produit et message erreur console//
    document.getElementById('items').innerHTML = 'Désolé un problème est survenu pendant le chargement de notre catalogue.veuillez réessayer ultérieurement'
    console.log('Problème API');
});