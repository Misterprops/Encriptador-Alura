function codificar(){
    modificar()
    let num = parseInt(document.getElementById('desplazamiento').value);
    let letros = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

    let resultado = document.getElementById("resultado");
    resultado.value = "";

    let texto = document.getElementById("insercion").value;
    let letras = texto.split("");

    letras.forEach(letra => {
        let band = resultado.value.length;
        console.log(band)
        letros.forEach(letro => {
            if(letra.localeCompare(letro,undefined,{sensivity:'base'}) === 0){
                console.log(letros[(letros.indexOf(letro)+num) % 27]);
                resultado.value += letros[(letros.indexOf(letro)+num) % 27];
            }
        });
        if(band == resultado.value.length){
            console.log(resultado.value.length)
            resultado.value += " ";
        }
    });
}

function decodificar(){
    modificar()
    let num = parseInt(document.getElementById('desplazamiento').value);
    let letros = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

    let resultado = document.getElementById("resultado");
    resultado.value = "";

    let texto = document.getElementById("insercion").value;
    let letras = texto.split("");

    letras.forEach(letra => {
        let band = resultado.value.length;
        console.log(band)
        letros.forEach(letro => {
            if(letra.localeCompare(letro,undefined,{sensivity:'base'}) === 0){
                if((letros.indexOf(letro)-num) < 0){
                    let val = letros.indexOf(letro)-num;
                    while(val<0 || val>27){
                        console.log(val)
                        val+=27
                    }
                    console.log((letros[val % 27]));
                    resultado.value += (letros[val % 27]);
                }else{
                    console.log(letros[(letros.indexOf(letro)-num) % 27]);
                    resultado.value += letros[(letros.indexOf(letro)-num) % 27];
                }
            }
        });
        if(band == resultado.value.length){
            console.log(resultado.value.length)
            resultado.value += " ";
        }
    });
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
