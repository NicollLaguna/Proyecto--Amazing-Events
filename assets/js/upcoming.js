const $main = document.getElementById("main")
const cartas = data.events
function crearCarta (eventos){
    return ` <div class="card" style="width: 18rem;">
    <img src="${eventos.image}" class="card-img-top h-100" alt="Imagen de ${eventos.name}">
    <div class="card-body p-3">
        <h5 class="card-title">${eventos.name}</h5>
        <p class="card-text">${eventos.description}.</p>
        <div class="d-flex justify-content-between mt-5 align-items-center ">
            <p>Price: $${eventos.price}USD</p>
            <a href="./carts.html" class="btn btn-primary">See More</a>
        </div>
    </div>
</div>` 
}

function ponerCartas( listaCartas, elemento ){
    let template = ''
    for( let elemento of listaCartas ){
        template += crearCarta(elemento)
    }
    elemento.innerHTML = template
} 



function filtrarCartas (lista){
    const presente = data.currentDate
    let filtrado= lista.filter(carta=> carta.date > presente )
    return filtrado
}
const eventspast= filtrarCartas(cartas)

ponerCartas(eventspast,$main)