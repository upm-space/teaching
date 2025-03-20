let map;
let coors = [];
let status = "";
let takeoffPoint = [];
let markerToff;
let markerLanding;
let corner1Point;
let corner2Point;
let markercorner1;
let markercorner2;
let landingPoint = [];
let waypoints = [];

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var icon1 = new L.Icon({
    iconUrl: './img/marker-icon-2x-yellow_number1.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var icon2 = new L.Icon({
    iconUrl: './img/marker-icon-2x-yellow_number2.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function setStatus(_status){
   status = _status
}

function init(){
    map = L.map('map_lim').setView([51.505, -0.09], 13);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click',function(e){
        if (status == "TOFF"){
            setToff(e);
        }
        if (status == "LANDING"){
            setLanding(e);
        }
        if (status == "1CORNER"){
            corner1(e);
        }
        if (status == "2CORNER"){
            corner2(e);
        }
    })
}

function setToff(e){
    console.log('Status Takeoff ' + e.latlng );
    takeoffPoint = e.latlng;
    if(markerToff){
        map.removeLayer(markerToff)
    }
    markerToff = new L.marker([e.latlng.lat, e.latlng.lng], {icon: greenIcon}).addTo(map);
    markerToff.addTo(map);
}

function setLanding(e){
    console.log('Status Landing ' + e.latlng );
    landingPoint = e.latlng;
    if(markerLanding){
        map.removeLayer(markerLanding)
    }
    markerLanding = new L.marker([e.latlng.lat, e.latlng.lng], {icon: redIcon}).addTo(map);
    markerLanding.addTo(map);
}

function corner1(e){
    corner1Point = e.latlng;
    if(markerLanding){
        map.removeLayer(markercorner1)
    }
    markercorner1 = new L.marker([e.latlng.lat, e.latlng.lng], {icon: icon1}).addTo(map);
    markercorner1.addTo(map);
    //setStatus("2CORNER")
}

function corner2(e){
    corner2Point = e.latlng;
    let latmin
    let latmax
    let lngmin
    let lngmax

    if(markercorner1){
        map.removeLayer(markercorner1)
    }
    if (corner2Point.lat < corner1Point.lat){
        latmin = corner2Point.lat
        latmax = corner1Point.lat 
    } else {
        latmin = corner1Point.lat
        latmax = corner2Point.lat 
    }
    if (corner2Point.lng < corner1Point.lng){
        lngmin = corner2Point.lng
        lngmax = corner1Point.lng 
    } else {
        lngmin = corner1Point.lng
        lngmax = corner2Point.lng 
    }
    markercorner1 = new L.marker([latmin, lngmin], {icon: icon1}).addTo(map);
    markercorner1.addTo(map);
    markercorner2 = new L.marker([latmax, lngmax], {icon: icon2}).addTo(map);
    markercorner2.addTo(map);

    // Dibujar la polilínea del bounding box en color rojo
    let boundingBox = [
        [latmin, lngmin], // Esquina inferior izquierda
        [latmax, lngmin], // Esquina superior izquierda
        [latmax, lngmax], // Esquina superior derecha
        [latmin, lngmax], // Esquina inferior derecha
        [latmin, lngmin]  // Cierra el polígono
    ];

    // Añadir la polilínea al mapa
    let polyline = L.polyline(boundingBox, { color: 'red', weight: 2 }).addTo(map);
    waypoints = generateWaypoints(100)
    drawWaypoints(waypoints)
    drawFlightPath(waypoints)
}

function generateWaypoints(sidelap) {
    waypoints = [];

    // Obtener los límites del área seleccionada
    let latmin = Math.min(corner1Point.lat, corner2Point.lat);
    let latmax = Math.max(corner1Point.lat, corner2Point.lat);
    let lngmin = Math.min(corner1Point.lng, corner2Point.lng);
    let lngmax = Math.max(corner1Point.lng, corner2Point.lng);

    // Determinar el punto más cercano al takeoffPoint
    let corners = [
        {lat: latmin, lng: lngmin},
        {lat: latmin, lng: lngmax},
        {lat: latmax, lng: lngmin},
        {lat: latmax, lng: lngmax}
    ];
    
    let startPoint = corners.reduce((closest, corner) => 
        distance(corner, takeoffPoint) < distance(closest, takeoffPoint) ? corner : closest
    );

    // Definir la dirección de vuelo (Este-Oeste)
    let goingEast = startPoint.lng === lngmin; // Si inicia en el lado izquierdo, va hacia la derecha
    let currentLat = startPoint.lat;
    let prevLng = startPoint.lng; // Para conectar bien las líneas
    let nextLng = goingEast ? lngmax : lngmin; // Primera línea

    while ((goingEast && nextLng >= lngmin) || (!goingEast && nextLng <= lngmax)) {
        // Añadir el waypoint del inicio de la línea
        waypoints.push({lat: currentLat, lng: prevLng});
        // Añadir el waypoint del final de la línea
        waypoints.push({lat: currentLat, lng: nextLng});

        // Avanzar una línea hacia el norte o sur
        currentLat += sidelap * 0.000009; // Conversión de metros a grados aproximada

        // Si nos salimos del área, terminamos
        if (currentLat > latmax || currentLat < latmin) break;

        // Cambiar de dirección (zigzag) pero asegurando que la línea conecta con la anterior
        prevLng = nextLng;
        goingEast = !goingEast;
        nextLng = goingEast ? lngmax : lngmin;
    }

    console.log("Waypoints generados:", waypoints);
    return waypoints;
}

// Función para calcular distancia aproximada (Haversine no necesario aquí)
function distance(point1, point2) {
    return Math.sqrt((point1.lat - point2.lat) ** 2 + (point1.lng - point2.lng) ** 2);
}

function drawWaypoints(waypoints) {
    // Borrar waypoints anteriores si ya existen
    if (window.waypointMarkers) {
        waypointMarkers.forEach(marker => map.removeLayer(marker));
    }
    
    window.waypointMarkers = []; // Array para guardar los marcadores

    waypoints.forEach((wp, index) => {
        let waypointNumber = index + 1; // Numeración desde 1

        let waypointIcon = new L.DivIcon({
            className: 'waypoint-label',
            html: `<div style="background-color:yellow; color:black; font-weight:bold; border-radius:50%; width:25px; height:25px; display:flex; justify-content:center; align-items:center;">${waypointNumber}</div>`,
            iconSize: [25, 25],
            iconAnchor: [12, 12]
        });

        let marker = L.marker([wp.lat, wp.lng], { icon: waypointIcon }).addTo(map);
        waypointMarkers.push(marker);
    });
}

let flightPath; // Variable global para almacenar la polilínea del vuelo

function drawFlightPath(waypoints) {
    // Si ya existe una polilínea, la eliminamos antes de dibujar la nueva
    if (flightPath) {
        map.removeLayer(flightPath);
    }

    // Crear la polilínea con los waypoints
    flightPath = L.polyline(waypoints.map(wp => [wp.lat, wp.lng]), {
        color: 'green', // Color de la línea
        weight: 4,      // Grosor de la línea
        opacity: 0.7    // Transparencia para mejor visualización
    }).addTo(map);
}

async function saveWaypointsForMissionPlanner(waypoints) {
    if (!waypoints || waypoints.length === 0) {
        alert("No hay waypoints generados para guardar.");
        return;
    }

    let altitude = 50; // Puedes cambiarlo o hacerlo variable global

    let fileContent = "QGC WPL 110\n"; // Primera línea obligatoria

    // Takeoff (comando 22)
    fileContent += `0\t1\t3\t22\t0\t0\t0\t0\t${takeoffPoint.lat}\t${takeoffPoint.lng}\t${altitude}\t1\n`;

    // Waypoints de la misión (comando 16)
    waypoints.forEach((wp, index) => {
        fileContent += `${index + 1}\t0\t3\t16\t0\t0\t0\t0\t${wp.lat}\t${wp.lng}\t${altitude}\t1\n`;
    });

    // Landing (comando 21)
    fileContent += `${waypoints.length + 1}\t0\t3\t21\t0\t0\t0\t0\t${landingPoint.lat}\t${landingPoint.lng}\t0\t1\n`;

    try {
        // Pedir al usuario que seleccione la ubicación donde guardar el archivo
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: "mission.waypoints",
            types: [{
                description: "Mission Planner Waypoints",
                accept: { "text/plain": [".waypoints"] }
            }]
        });

        // Escribir el archivo
        const writable = await fileHandle.createWritable();
        await writable.write(fileContent);
        await writable.close();

        alert("Waypoints guardados correctamente en formato Mission Planner.");

    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}


function CalculateMission(){
    let overlap = document.getElementById('overlapTxt').value 
    let overlapInt = parseInt(overlap)
    console.log(overlap)    
}
