function completedListProducts(getAllProducts) {

  let getProducts = [];
  let getAllProductsInCart = JSON.parse(localStorage.getItem("getProducts"));

  getAllProductsInCart.forEach(cartItem => {
      let product = getAllProducts.find(item => item._id == cartItem.id)
      product.color = cartItem.color
      product.quantity = cartItem.quantity
      console.log(getProduct)
      getProducts.push(product);
  })
  return getProducts;
}



