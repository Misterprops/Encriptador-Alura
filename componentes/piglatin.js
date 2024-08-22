function codificar(){
    modificar()
    resultado = document.getElementById("resultado");
    resultado.value = "";
    texto = document.getElementById("insercion").value;
    palabras = texto.split(" ");
    palabras.forEach(palabra => {
        resultado.value += palabra.substring(1) + palabra.substring(0,1) + "ay ";
    });
    resultado.value = resultado.value.substring(0,resultado.value.length -1);
}

function decodificar(){
    modificar()
    resultado = document.getElementById("resultado");
    resultado.value = "";
    texto = document.getElementById("insercion").value;
    palabras = texto.split(" ");
    palabras.forEach(palabra => {
        if(palabra.substring(palabra.length-2) == "ay"){
            resultado.value += palabra.substring(palabra.length-3,palabra.length-2) + palabra.substring(0,palabra.length-3) + " ";
        }else{
            resultado.value += palabra + " ";
        }
    });
    resultado.value = resultado.value.substring(0,resultado.value.length -1);
}

//Funcion que modifica algunos elementos de la pagina
function modificar(){
    document.getElementById("copiar").style.visibility = "visible";
    document.getElementById("imagen_div").style.display = "none";
    document.getElementById("resultado").style.display = "block";
}

//Funcion que copia el contenido del resultado en el computador
function copiar() {
    let copyText = document.getElementById("resultado");
    copyText.select();
    document.execCommand("copy");
    alert("Copiado!");
}