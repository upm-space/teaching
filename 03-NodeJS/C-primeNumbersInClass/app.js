const pmClass = require('./primeNumberClass');
const myPrime = new pmClass(2,100);
myPrime.calculate((prime)=>{
    console.log("numeros primos" + prime)
});
//myPrime.printNumbers();