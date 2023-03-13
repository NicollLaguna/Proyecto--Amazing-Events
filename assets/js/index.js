const $main = document.getElementById("main")
const $cajacheck = document.getElementById("cajacheck")
const $buscador = document.getElementById('buscador')

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(Response => Response.json())
    .then(cartas => {
        ponerCartas(cartas.events, $main)
        $cajacheck.addEventListener('change', e =>
            ponerCartas(filtroCruzado(cartas.events), $main))
        $buscador.addEventListener("input", e =>
            ponerCartas(filtroCruzado(cartas.events), $main))
        const listCategory = Array.from(new Set(cartas.events.map(carta => carta.category)));
        const categories = listCategory.reduce((acc, category) => {
            return acc += `<div class="form-check me-4">
                <input class="form-check-input" type="checkbox" value="${category}" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">${category}</label></div>`
        }, '')
        $cajacheck.innerHTML += categories
    })
    .catch(error => console.log(error))


function filtrarChecks(listaCartas) {
    let elegidas = []
    const checkboxCheck = document.querySelectorAll('input[type="checkbox"]:checked')
    elegidas = Array.from(checkboxCheck).map(carta => carta.value)

    if (elegidas.length === 0) {
        return listaCartas
    }
    else {
        return listaCartas.filter(carta => elegidas.includes(carta.category))
    }
}


function crearCarta(eventos) {
    return ` <div class="card" style="width: 18rem;">
        <img src="${eventos.image}" class="card-img-top cartita" alt="Imagen de ${eventos.name}">
        <div class="card-body p-3 d-flex flex-column justify-content-between">
            <div>
            <h5 class="card-title">${eventos.name}</h5>
            <p class="card-text">${eventos.description}.</p>
            </div>
            <div class="d-flex justify-content-between mt-4 align-items-center ">
                <p>Price: $${eventos.price}USD</p>
                <a href="./carts.html?id=${eventos._id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`
}

function ponerCartas(listaCartas, elemento) {
    let template = ''
    if (listaCartas.length === 0) {
        elemento.innerHTML = mensaje()
    }
    else {
        listaCartas.forEach(carta => template += crearCarta(carta))
        elemento.innerHTML = template
    }
}


function mensaje() {
    return `<h2>Evento no disponible</h2>`
}



function filtroSearch(values) {
    const search = $buscador.value.toLowerCase()
    if (search.length === 0) {
        return values;
    }
    const searchFiltrado = values.filter(events => {
        return events.name.toLowerCase().includes(search)
    })

    return searchFiltrado;
}

function filtroCruzado(cartas) {
    return filtrarChecks(filtroSearch(cartas))
}