const c = 100;                                //ES6
let j = 2;                                    //ES6
const primeNumbers = [];                      //ES6

const calculaPrimo = function(init, end){
    for (; init < end; init++) {

        if (prime(init)) {
          primeNumbers.push(init);
        }
      }
    console.log(`The prime numbers are: ${primeNumbers}`);  //ES6
}

calculaPrimo(2,200)


module.exports = function prime(number) {

  for (let i = 2; i < number; i++) {          //ES6

    if (number % i === 0) {
      return false;
    }

  }

  return number !== 1;
}



//module.exports = calculaPrimo;