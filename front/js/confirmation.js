function printId(){
    const idOrder = document.getElementById("orderId");
    idOrder.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    //localStorage.clear();
}

printId();