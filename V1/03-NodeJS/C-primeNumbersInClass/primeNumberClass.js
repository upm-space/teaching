

module.exports = class PrimeNumber{

    constructor(init,end){
        this.init = init;
        this.end = end;
        this.primeNumbers = [];
    }

    /** Start with the calcs */
    calculate(callback){
        let init = this.init;
        this.primeNumbers = [];
        for (; init < this.end; init++) {

            if (this.checkIfIsPrime(init)) {
                this.primeNumbers.push(init);
            }
          }
        callback(this.primeNumbers);
    }

    /**
     * Check if a number is prime
     * @param {integer} number - The number to check is is prime
     * @returns {bool} If is true, the number is prime
     */
    checkIfIsPrime(number){
        for (let i = 2; i < number; i++) {

            if (number % i === 0) {
              return false;
            }
        
          }
        
          return true;
    }

    /** Prints the array of primes in a console */
    printNumbers(){
        console.log(`The prime numbers are: ${this.primeNumbers}`);
    }
}