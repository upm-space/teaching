let map;
let coors = [];
let status = "";
let takeoffPoint = []
let landingPoint = [];
var geojsonFeature = {
    "type": "LineString",
    "coordinates":coors
};

function init (){
    map = L.map('map').setView([51.505, -0.09], 13);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click',function(e){
        //console.log(e.latlng)
        if(status=='TOFF'){
        setToff(e);
        }
        if(status=='LANDING'){
        setLanding(e);
        }
        //coors.push([e.latlng.lng,e.latlng.lat]);
        //L.geoJSON(geojsonFeature).addTo(map);
        
    })

}



function changeStatus(_status){
    status = _status
}

function saluda(){
    let  = document.getElementById("inputText").value;
    alert(texto);
}

function setLanding(e){
    console.log('Status Landing ' + e.latlng );
    landingPoint = e.latlng;
}

function setToff(e){
    console.log('Status Take off ' + e.latlng );
    takeoffPoint = e.latlng;
}

function calculateDistances(){
    const source = new proj4.Proj('EPSG:4326'); //(wgs84) https://epsg.io/4326
    const dest = new proj4.Proj('EPSG:3857');   //(pseudo mercator) https://epsg.io/3857
    //const deepClone = _.cloneDeep(value);
    const landing = [landingPoint.lat,landingPoint.lng,0]
    const takeoff = [takeoffPoint.lat,takeoffPoint.lng,0]
    const ladProjected = proj4(source, dest, landing)
    const tofProjected = proj4(source, dest, takeoff)
    distancia = getDistance(ladProjected[0],ladProjected[1],tofProjected[0],tofProjected[1])
    const ladWGS84 = proj4(dest, source, ladProjected)
    var marker = new L.Marker([landingPoint.lat, landingPoint.lng]);
    marker.addTo(map);
}

function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}


