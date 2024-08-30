function codificar(){
    modificar();
    let seed = document.getElementById("seed").value
    let text = document.getElementById("insercion").value.split("");
    let orden = [];
    let band = [];
    let res = "";
    for (let i = 0; i<text.length; i++) {
        if(i % parseInt(seed) != 0 || i == 0){
            band.push(text[i]);
        }else{
            orden.push(band);
            band = [];
            band.push(text[i]);
        }
    }
    while(band.length != orden[1].length && band.length != 0){
        band.push(" ");
    }
    orden.push(band);
    band = [];
    console.log(orden)
    for (let i = 0; i < seed; i++) {
        orden.forEach(vector => {
            res += vector[i];
        });
    }
    document.getElementById("resultado").value = res;
}

function decodificar(){
    modificar();
    let seed = document.getElementById("seed").value
    let text = document.getElementById("insercion").value.split("");
    seed = text.length/seed;
    let orden = [];
    let band = [];
    let res = "";
    for (let i = 0; i<text.length; i++) {
        if(i % parseInt(seed) != 0 || i == 0){
            band.push(text[i]);
        }else{
            orden.push(band);
            band = [];
            band.push(text[i]);
        }
    }
    while(band.length != orden[0].length && band.length != 0){
        band.push(" ");
    }
    
    orden.push(band);
    band = [];
    for (let i = 0; i < Math.floor(seed); i++) {
        orden.forEach(vector => {
            res += vector[i];
        });
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
