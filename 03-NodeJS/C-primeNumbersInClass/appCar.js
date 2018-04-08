const carClass = require('./car');
const carObject = new carClass("FMH-7213",5);
carObject.acelera(20);
carObject.velocidadActual();
carObject.decelera(10);
carObject.velocidadActual();
carObject.decelera(20);
carObject.velocidadActual();