import { coches } from './db.js'; // Asegúrate de que la ruta es correcta y exportas la constante 'coches'

const yearSelect = document.getElementById('year');
const marcaSelect = document.getElementById('marca');
const minimoSelect = document.getElementById('minimo');
const maximoSelect = document.getElementById('maximo');
const puertasSelect = document.getElementById('puertas');
const transmisionSelect = document.getElementById('transmision');
const colorSelect = document.getElementById('color');
const resultadoDiv = document.getElementById('resultado');

// Función para obtener y pintar años únicos
function obtenerAniosUnicos() {
    const anios = coches.map(coche => coche.year);
    const aniosUnicos = [...new Set(anios)].sort((a, b) => a - b);
    pintarAnios(aniosUnicos);
}

// Función para pintar años en el select
function pintarAnios(anios) {
    yearSelect.innerHTML = '<option value="">Seleccione</option>'; // Limpiar opciones anteriores
    anios.forEach(anio => {
        let opcionAnio = document.createElement("option");
        opcionAnio.value = anio;
        opcionAnio.textContent = anio;
        yearSelect.appendChild(opcionAnio);
    });
}

// Función para filtrar coches según los criterios seleccionados
function filtrarCoches() {
    const marcaSeleccionada = marcaSelect.value;
    const yearSeleccionado = yearSelect.value;
    const precioMinimo = parseInt(minimoSelect.value);
    const precioMaximo = parseInt(maximoSelect.value);
    const puertasSeleccionadas = puertasSelect.value;
    const transmisionSeleccionada = transmisionSelect.value;
    const colorSeleccionado = colorSelect.value;

    const cochesFiltrados = coches.filter(coche => {
        return (
            (marcaSeleccionada ? coche.marca === marcaSeleccionada : true) &&
            (yearSeleccionado ? coche.year === yearSeleccionado : true) &&
            (isNaN(precioMinimo) ? true : coche.precio >= precioMinimo) &&
            (isNaN(precioMaximo) ? true : coche.precio <= precioMaximo) &&
            (puertasSeleccionadas ? coche.puertas === puertasSeleccionadas : true) &&
            (transmisionSeleccionada ? coche.transmision === transmisionSeleccionada : true) &&
            (colorSeleccionado ? coche.color === colorSeleccionado : true)
        );
    });

    pintarResultados(cochesFiltrados);
}

// Función para pintar los resultados en una sola fila
function pintarResultados(coches) {
    resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores
    if (coches.length === 0) {
        resultadoDiv.innerHTML = '<p>No se encontraron coches.</p>';
        return;
    }

    coches.forEach(coche => {
        const divCoche = document.createElement('div');
        divCoche.classList.add('coche');
        divCoche.innerHTML = `
            <p>${coche.marca} ${coche.modelo} (${coche.year}) Precio: $${coche.precio} Puertas: ${coche.puertas}
             Transmisión: ${coche.transmision} Color: ${coche.color}</p>
        `;
        filaCoches.appendChild(divCoche);
    });

    resultadoDiv.appendChild(filaCoches);
}

// Obtener años únicos al cargar la página
obtenerAniosUnicos();

// Agregar listeners para filtrar coches cuando cambie algún criterio
marcaSelect.addEventListener('change', filtrarCoches);
yearSelect.addEventListener('change', filtrarCoches);
minimoSelect.addEventListener('change', filtrarCoches);
maximoSelect.addEventListener('change', filtrarCoches);
puertasSelect.addEventListener('change', filtrarCoches);
transmisionSelect.addEventListener('change', filtrarCoches);
colorSelect.addEventListener('change', filtrarCoches);