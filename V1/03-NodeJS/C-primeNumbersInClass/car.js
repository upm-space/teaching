

module.exports = class car{

    constructor(matricula,puertas){
        this.matricula = matricula;
        this.puertas = puertas;
        this.velocidad = 0;
        this.color = "rojo";
    }
    acelera(aceleracion){
        this.velocidad = this.velocidad + aceleracion;

    }

    decelera(deceleracion){
        this.velocidad = this.velocidad - deceleracion;
        if(this.velocidad < 0){
            this.velocidad = 0;
        }
    }

    velocidadActual(){
        //console.log(`La velocidad Actual es de ${this.velocidadActual} km/h`);
        console.log('La velocidad Actual es de ' + this.velocidad + 'km/h');
    }

    
}