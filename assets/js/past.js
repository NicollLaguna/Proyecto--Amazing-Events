const $main = document.getElementById("main")
const $cajacheck = document.getElementById("cajacheck")
const $buscador = document.getElementById('buscador')

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(Response => Response.json())
    .then(cartas => {
        function filtrarCartas (lista){
            const presente = cartas.currentDate
            let filtrado= lista.filter(carta=> carta.date < presente )
            return filtrado
        }
        const eventspast= filtrarCartas(cartas.events)
        ponerCartas(eventspast, $main)
        $cajacheck.addEventListener('change', e =>
            ponerCartas(filtroCruzado(eventspast), $main))
        $buscador.addEventListener("input", e =>
            ponerCartas(filtroCruzado(eventspast), $main))
        const listCategory = Array.from(new Set(cartas.events.map(carta => carta.category)));
        const categories = listCategory.reduce((acc, category) => {
            return acc += `<div class="form-check me-4">
                <input class="form-check-input" type="checkbox" value="${category}" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">${category}</label></div>`
        }, '')

    $cajacheck.innerHTML += categories

    })
    .catch(error => console.log(error))



function crearCarta (eventos){
    return ` <div class="card m-1" style="width: 18rem;">
    <img src="${eventos.image}" class="card-img-top h-100" alt="Imagen de ${eventos.name}">
    <div class="card-body p-3">
        <h5 class="card-title">${eventos.name}</h5>
        <p class="card-text">${eventos.description}.</p>
        <div class="d-flex justify-content-between mt-5 align-items-center ">
            <p>Price: $${eventos.price}USD</p>
            <a href="./carts.html?id=${eventos._id}" class="btn btn-primary">Details</a>
        </div>
    </div>
</div>` 
}

function ponerCartas ( listaCartas, elemento ){
    let template = ''
    if (listaCartas.length===0){
        elemento.innerHTML =  mensaje()
    }
    else {listaCartas.forEach(carta => template+=crearCarta(carta))
        elemento.innerHTML = template   }
    
} 
ponerCartas(eventspast,$main) 

$cajacheck.addEventListener('change', e=> 
ponerCartas(filtroCruzado(),$main)
)

function filtrarChecks (listaCartas){
    let elegidas=[]
    const checkboxCheck = document.querySelectorAll('input[type="checkbox"]:checked')
    elegidas= Array.from(checkboxCheck).map(carta=>carta.value)
    
    if(elegidas.length ===0){
        return listaCartas
    }
    else{
        return listaCartas.filter(carta =>elegidas.includes(carta.category))
    }
}

filtrarChecks(eventspast)

$buscador.addEventListener("input", e =>
ponerCartas(filtroCruzado(eventspast), $main));

function filtroSearch(values){
    const search= $buscador.value.toLowerCase()
    if (search.length === 0){
        return values;
    }
    const searchFiltrado = values.filter(events=>{
        return events.name.toLowerCase().includes(search)})

    return searchFiltrado;
}

function filtroCruzado(eventspast){
    return filtrarChecks(filtroSearch(eventspast))
}

function mensaje(){
    return `<h2>Evento no disponible</h2>`
}