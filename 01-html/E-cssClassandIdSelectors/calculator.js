function addText(textToAdd){
    document.getElementById("display").value = document.getElementById("display").value + textToAdd; 
}
function deleteText(){
    document.getElementById("display").value = ""; 
}
function calculate(){
    document.getElementById("display").value = eval(document.getElementById("display").value); 
}