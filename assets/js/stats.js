
const $masAsistencia = document.getElementById('masAsistencia')
const $menosAsistencia = document.getElementById('menosAsistencia')
const $masCapacidad = document.getElementById('masCapacidad')
const $table2 = document.getElementById('table2')
const $table3 = document.getElementById('table3')

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(Response => Response.json())
    .then(datos => {
        const eventosPasados = datos.events.filter(
            event => event.date < datos.currentDate
        );
        const eventosFuturos = datos.events.filter(
            event => event.date > datos.currentDate
        );
        const resultado = eventosPasados.sort((event, event2) => {
            return (
                (event.assistance / event.capacity) * 100 -
                (event2.assistance / event2.capacity) * 100
            );
        });
        const resulmasCapacidad = datos.events
            .sort((event, event2) => event.capacity - event2.capacity)
            .slice(-2);
        
        const eventMasAsistencia = resultado.slice(-1);
        const eventMenosAsistencia = resultado.slice(0, 1);
        function asistencia(objeto, elemento) { 
            let percent = ((objeto.assistance/objeto.capacity)*100).toFixed(2)
            elemento.innerHTML = objeto.name + ` ${percent}%`;}
        function asistencia2(obj, element){
                let capacity = obj.capacity
                element.innerHTML = obj.name + `${capacity}`;
            }
        asistencia(eventMasAsistencia[0], $masAsistencia);
        asistencia(eventMenosAsistencia[0], $menosAsistencia);
        asistencia2(resulmasCapacidad[0], $masCapacidad);

        const categorias = {};
        eventosFuturos.forEach(propiedEvent => {
            if (!categorias[propiedEvent.category]) {
                categorias[propiedEvent.category] = {
                    price: 0,
                    estimate: 0,
                    capacity: 0,
                };
            }
            categorias[propiedEvent.category].price +=
                propiedEvent.price * propiedEvent.estimate;
            categorias[propiedEvent.category].capacity += propiedEvent.capacity;
            categorias[propiedEvent.category].estimate += propiedEvent.estimate;
        });

        let ponerTable = '';
        for (const categoria in categorias) {
            const precio = categorias[categoria].price;
            const estimados = categorias[categoria].estimate;
            const capacidad = categorias[categoria].capacity;
            let valorPorcentaje = ((estimados * 100) / capacidad).toFixed(1);
            let template = () => {
                return `<tr>
                <td class="bg-light">${categoria}</td>
                <td class="bg-light">${precio}</td>
                <td class="bg-light">${valorPorcentaje}%</td>
            </tr>`;
            };
            ponerTable += template();
        }
        $table2.innerHTML = ponerTable;

        const categorias2 = {};
        eventosPasados.forEach(propiedEvent => {
            if (!categorias2[propiedEvent.category]) {
                categorias2[propiedEvent.category] = {
                    price: 0,
                    assistance: 0,
                    capacity: 0,
                };
            }
            categorias2[propiedEvent.category].price +=
                propiedEvent.price * propiedEvent.assistance;
            categorias2[propiedEvent.category].capacity += propiedEvent.capacity;
            categorias2[propiedEvent.category].assistance += propiedEvent.assistance;
        });
        let ponerTable2 = '';
        for (const categoria in categorias2) {
            const precio2 = categorias2[categoria].price;
            const asistencias2 = categorias2[categoria].assistance;
            const capacidad2 = categorias2[categoria].capacity;
            let valorPorcentaje2 = ((asistencias2 * 100) / capacidad2).toFixed(1);
            let template2 = () => {
                return `<tr>
                <td class="bg-light">${categoria}</td>
                <td class="bg-light">${precio2}</td>
                <td class="bg-light">${valorPorcentaje2}%</td>
            </tr>`;
            };
            ponerTable2 += template2();
        }
        $table3.innerHTML = ponerTable2;
    })

    .catch(error => console.log(error));