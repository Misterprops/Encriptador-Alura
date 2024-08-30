let vocabulario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
let all = document.getElementsByClassName("selector");

for (let i = 0; i<3; i++) {
    vocabulario.forEach(letra => {
        op = document.createElement("option");
        op.textContent = letra;
        all[i].appendChild(op);
    });
}

function codificar(){
    modificar();
    let seed = document.getElementById("seed").value
    let pin1 = vocabulario.indexOf(document.getElementsByClassName("selector")[0].value);
    let pin2 = vocabulario.indexOf(document.getElementsByClassName("selector")[1].value);
    let pin3 = vocabulario.indexOf(document.getElementsByClassName("selector")[2].value);

    let text = document.getElementById("insercion").value.split("");
    let res = "";
    for (let i = 0; i<text.length; i++) {
        if(text[i] === " "){
            res += " ";
        }else{
            res += vocabulario[(vocabulario.indexOf(text[i].toLowerCase()) + pin1 + pin2 + pin3 + (i * seed)) % 27];
        }
    }
    document.getElementById("resultado").value = res;
}

function decodificar(){
    modificar();
    let seed = document.getElementById("seed").value
    let pin1 = vocabulario.indexOf(document.getElementsByClassName("selector")[0].value);
    let pin2 = vocabulario.indexOf(document.getElementsByClassName("selector")[1].value);
    let pin3 = vocabulario.indexOf(document.getElementsByClassName("selector")[2].value);

    let text = document.getElementById("insercion").value.split("");
    let res = "";
    for (let i = 0; i<text.length; i++) {
        if(text[i] === " "){
            res += " ";
        }else{
            if(vocabulario.indexOf(text[i]) - pin1 - pin2 - pin3 - (i * seed) < 0){
                let val = vocabulario.indexOf(text[i]) - pin1 - pin2 - pin3 - (i * seed)
                while(val<0 || val>27){
                    val+=27
                }
                res += vocabulario[val % 27];
            }else{
                res += vocabulario[(vocabulario.indexOf(text[i]) - pin1 - pin2 - pin3 - (i * seed)) % 27];
            }
        }
    }
    document.getElementById("resultado").value = res;
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
