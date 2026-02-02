// Calculadora Simple - JavaScript Externo
// Este archivo se carga desde 03-calculadora.html

// Función auxiliar para obtener los valores de los inputs
function obtenerNumeros() {
    var n1 = parseFloat(document.getElementById('numero1').value);
    var n2 = parseFloat(document.getElementById('numero2').value);
    return { numero1: n1, numero2: n2 };
}

// Función auxiliar para mostrar el resultado
function mostrarResultado(valor) {
    document.getElementById('resultado').innerText = valor;
}

// Operaciones
function sumar() {
    var nums = obtenerNumeros();
    var resultado = nums.numero1 + nums.numero2;
    mostrarResultado(resultado);
    console.log(nums.numero1, '+', nums.numero2, '=', resultado);
}

function restar() {
    var nums = obtenerNumeros();
    var resultado = nums.numero1 - nums.numero2;
    mostrarResultado(resultado);
    console.log(nums.numero1, '-', nums.numero2, '=', resultado);
}

function multiplicar() {
    var nums = obtenerNumeros();
    var resultado = nums.numero1 * nums.numero2;
    mostrarResultado(resultado);
    console.log(nums.numero1, '*', nums.numero2, '=', resultado);
}

function dividir() {
    var nums = obtenerNumeros();
    if (nums.numero2 === 0) {
        mostrarResultado('Error: División por cero');
        console.error('No se puede dividir por cero');
    } else {
        var resultado = nums.numero1 / nums.numero2;
        mostrarResultado(resultado);
        console.log(nums.numero1, '/', nums.numero2, '=', resultado);
    }
}

// Mensaje al cargar el script
console.log('Calculadora cargada correctamente');
