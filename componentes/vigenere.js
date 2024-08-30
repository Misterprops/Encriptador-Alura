let vocabulario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];

function codificar(){
    modificar()
    let text = document.getElementById("insercion").value.split("");
    let key = document.getElementById("clave").value.split("");
    let res = "", cont = 0;
    for (let i = 0; i < text.length; i++) {
        if(text[i] === " "){
            res += " ";
        }else{
            res += vocabulario[(vocabulario.indexOf(text[i].toLowerCase())+vocabulario.indexOf(key[cont % key.length].toLowerCase())) % 27];
            cont ++;
        }
    }
    document.getElementById("resultado").innerText = res;
}

function decodificar(){
    modificar()
    let text = document.getElementById("insercion").value.split("");
    let key = document.getElementById("clave").value.split("");
    let res = "", cont = 0;
    for (let i = 0; i < text.length; i++) {
        if(text[i] === " "){
            res += " ";
        }else{
            if((vocabulario.indexOf(text[i].toLowerCase())-vocabulario.indexOf(key[cont % key.length].toLowerCase())) < 0){
                let val = vocabulario.indexOf(text[i].toLowerCase())-vocabulario.indexOf(key[cont % key.length].toLowerCase());
                while(val<0 || val>27){
                    val+=27
                }
                res += vocabulario[val % 27];
            }else{
                res += vocabulario[(vocabulario.indexOf(text[i].toLowerCase())-vocabulario.indexOf(key[cont % key.length].toLowerCase())) % 27];
            }
            cont ++;
        }
    }
    document.getElementById("resultado").innerText = res;
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
