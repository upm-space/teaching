var c = 100;
var j = 2;
var primeNumbers = [];

for (; j < c; j++) {

  if (prime(j)) {
    primeNumbers.push(j);
  }
  
}

console.log("The prime numbers are: " + primeNumbers);

function prime(number) {

  for (var i = 2; i < number; i++) {

    if (number % i === 0) {
      return false;
    }

  }

  return number !== 1;
}