const $main = document.getElementById("main")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(Response => Response.json())
  .then(cartas => {
    const params = new URLSearchParams(location.search)
    const id = params.get("id")
    const carta = cartas.events.find(element => element._id == id)
    ponerCartas(carta, $main)
    crearCarta(carta)
  })
  .catch(console.log('error'))

function crearCarta(obj) {
  return `<div class="d-flex justify-content-center align-items-center pt-5">
    <div class="card mb-3" style="max-width: 880px;">
      <div class="row g-0 ">
        <div class="col-md-4">
          <img src="${obj.image}" class="img-fluid rounded-start h-100 p-3" alt="Imagen de ${obj.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Name: ${obj.name}</h5>
            <h5 class="card-text">Date: ${obj.date}</h5>
            <h5 class="card-text">Description:${obj.description}</h5>
            <h5 class="card-text">Category:${obj.category}</h5>
            <h5 class="card-text">Place: ${obj.place}</h5>
            <h5 class="card-text">Capacity: ${obj.capacity}</h5>
            <h5 class="card-text">${obj.assistance ? 'Assistance: ' + obj.assistance : 'Estimate: ' + obj.estimate}</h5>
            <h5 class="card-text">Price: $${obj.price}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

function ponerCartas(obj, element) {
  let template = ''
  template += crearCarta(obj)
  element.innerHTML = template
} 
