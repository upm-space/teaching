// ===========================================
// Plan de Vuelo - JavaScript
// ===========================================

// Array para almacenar los vuelos registrados
var vuelosRegistrados = [];

// Función principal: procesar el formulario
function procesarFormulario(event) {
    // Prevenir que el formulario recargue la página
    event.preventDefault();

    // Recoger los datos del formulario
    var vuelo = {
        id: Date.now(), // ID único basado en timestamp
        matricula: document.getElementById('matricula').value,
        modelo: document.getElementById('modelo').value,
        peso: parseFloat(document.getElementById('peso').value),
        origen: {
            lat: parseFloat(document.getElementById('origen-lat').value),
            lon: parseFloat(document.getElementById('origen-lon').value)
        },
        destino: {
            lat: parseFloat(document.getElementById('destino-lat').value),
            lon: parseFloat(document.getElementById('destino-lon').value)
        },
        altitud: parseInt(document.getElementById('altitud').value),
        velocidad: parseInt(document.getElementById('velocidad').value),
        fechaVuelo: document.getElementById('fecha-vuelo').value,
        proposito: document.getElementById('proposito').value,
        notas: document.getElementById('notas').value,
        fechaRegistro: new Date().toISOString()
    };

    // Calcular distancia aproximada (fórmula simplificada)
    vuelo.distancia = calcularDistancia(
        vuelo.origen.lat, vuelo.origen.lon,
        vuelo.destino.lat, vuelo.destino.lon
    );

    // Calcular tiempo estimado de vuelo
    vuelo.tiempoEstimado = calcularTiempoVuelo(vuelo.distancia, vuelo.velocidad);

    // Guardar el vuelo
    vuelosRegistrados.push(vuelo);

    // Mostrar resumen
    mostrarResumen(vuelo);

    // Actualizar lista de vuelos
    actualizarListaVuelos();

    // Log en consola para debugging
    console.log('Vuelo registrado:', vuelo);
    console.log('Total de vuelos:', vuelosRegistrados.length);

    return false;
}

// Calcular distancia entre dos puntos (fórmula Haversine simplificada)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radio de la Tierra en km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distancia = R * c;
    return Math.round(distancia * 1000) / 1000; // km con 3 decimales
}

// Calcular tiempo de vuelo estimado
function calcularTiempoVuelo(distanciaKm, velocidadKmh) {
    if (velocidadKmh <= 0) return 'N/A';
    var tiempoHoras = distanciaKm / velocidadKmh;
    var minutos = Math.round(tiempoHoras * 60);
    if (minutos < 60) {
        return minutos + ' min';
    } else {
        var h = Math.floor(minutos / 60);
        var m = minutos % 60;
        return h + 'h ' + m + 'min';
    }
}

// Formatear fecha para mostrar
function formatearFecha(fechaISO) {
    if (!fechaISO) return 'No especificada';
    var fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Obtener nombre del modelo
function obtenerNombreModelo(valor) {
    var modelos = {
        'dji-mavic': 'DJI Mavic 3',
        'dji-phantom': 'DJI Phantom 4',
        'parrot-anafi': 'Parrot Anafi',
        'otro': 'Otro'
    };
    return modelos[valor] || 'No especificado';
}

// Mostrar resumen del vuelo
function mostrarResumen(vuelo) {
    var seccionResumen = document.getElementById('resumen');
    var contenidoResumen = document.getElementById('contenido-resumen');

    var html = `
        <div class="dato-resumen"><strong>Matrícula:</strong> ${vuelo.matricula}</div>
        <div class="dato-resumen"><strong>Modelo:</strong> ${obtenerNombreModelo(vuelo.modelo)}</div>
        <div class="dato-resumen"><strong>Peso:</strong> ${vuelo.peso} kg</div>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
        <div class="dato-resumen"><strong>Origen:</strong> ${vuelo.origen.lat}°, ${vuelo.origen.lon}°</div>
        <div class="dato-resumen"><strong>Destino:</strong> ${vuelo.destino.lat}°, ${vuelo.destino.lon}°</div>
        <div class="dato-resumen"><strong>Distancia:</strong> ${vuelo.distancia} km</div>
        <div class="dato-resumen"><strong>Altitud:</strong> ${vuelo.altitud} m</div>
        <div class="dato-resumen"><strong>Velocidad:</strong> ${vuelo.velocidad} km/h</div>
        <div class="dato-resumen"><strong>Tiempo estimado:</strong> ${vuelo.tiempoEstimado}</div>
        <hr style="margin: 10px 0; border: none; border-top: 1px solid #ccc;">
        <div class="dato-resumen"><strong>Fecha de vuelo:</strong> ${formatearFecha(vuelo.fechaVuelo)}</div>
        <div class="dato-resumen"><strong>Propósito:</strong> ${vuelo.proposito}</div>
    `;

    if (vuelo.notas) {
        html += `<div class="dato-resumen"><strong>Notas:</strong> ${vuelo.notas}</div>`;
    }

    contenidoResumen.innerHTML = html;
    seccionResumen.classList.remove('oculto');

    // Scroll suave hacia el resumen
    seccionResumen.scrollIntoView({ behavior: 'smooth' });
}

// Actualizar lista de vuelos registrados
function actualizarListaVuelos() {
    var listaDiv = document.getElementById('lista-vuelos');

    if (vuelosRegistrados.length === 0) {
        listaDiv.innerHTML = '<p class="sin-vuelos">No hay vuelos registrados todavía.</p>';
        return;
    }

    var html = '';
    // Mostrar los vuelos más recientes primero
    for (var i = vuelosRegistrados.length - 1; i >= 0; i--) {
        var v = vuelosRegistrados[i];
        html += `
            <div class="vuelo-item">
                <div class="vuelo-header">
                    <span class="vuelo-matricula">${v.matricula}</span>
                    <span class="vuelo-fecha">${formatearFecha(v.fechaVuelo)}</span>
                </div>
                <div class="vuelo-detalles">
                    ${v.distancia} km · ${v.altitud}m alt · ${v.tiempoEstimado} · ${v.proposito}
                </div>
            </div>
        `;
    }

    listaDiv.innerHTML = html;
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('formulario-vuelo').reset();
    document.getElementById('resumen').classList.add('oculto');

    // Restaurar valores por defecto
    document.getElementById('peso').value = '0.9';
    document.getElementById('altitud').value = '50';
    document.getElementById('velocidad').value = '20';

    console.log('Formulario limpiado');
}

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Plan de Vuelo cargado');

    // Establecer fecha mínima como hoy
    var fechaInput = document.getElementById('fecha-vuelo');
    var ahora = new Date();
    var fechaMinima = ahora.toISOString().slice(0, 16);
    fechaInput.min = fechaMinima;

    // Cargar datos de ejemplo (opcional - descomentar para pruebas)
    // cargarDatosEjemplo();
});

// Función auxiliar para cargar datos de ejemplo (para pruebas)
function cargarDatosEjemplo() {
    document.getElementById('matricula').value = 'EC-DRN001';
    document.getElementById('modelo').value = 'dji-mavic';
    document.getElementById('peso').value = '0.9';
    document.getElementById('origen-lat').value = '40.416775';
    document.getElementById('origen-lon').value = '-3.703790';
    document.getElementById('destino-lat').value = '40.453054';
    document.getElementById('destino-lon').value = '-3.688344';
    document.getElementById('altitud').value = '80';
    document.getElementById('velocidad').value = '25';
    document.getElementById('proposito').value = 'fotografia';
    document.getElementById('notas').value = 'Vuelo de prueba sobre Madrid centro';
}
