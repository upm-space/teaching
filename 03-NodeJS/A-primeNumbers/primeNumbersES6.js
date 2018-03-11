const c = 100;                                //ES6
let j = 2;                                    //ES6
const primeNumbers = [];                      //ES6

for (; j < c; j++) {

  if (prime(j)) {
    primeNumbers.push(j);
  }
  
}

console.log(`The prime numbers are: ${primeNumbers}`);  //ES6

function prime(number) {

  for (let i = 2; i < number; i++) {          //ES6

    if (number % i === 0) {
      return false;
    }

  }

  return number !== 1;
}