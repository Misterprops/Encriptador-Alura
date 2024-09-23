var cont = 0;
function codificar() {
    let mandatory = document.getElementById("diccionario").value;
    let input = document.getElementById("insercion").value;
    let key = document.getElementById("seed").value;
    let S = [];
    if (mandatory == "") {
        //RC4 sin diccionario
        for (let i = 0; i < 256; i++) {
            S.push(i);
        }
        //KSA
        let j = 0;
        for (let i = 0; i < S.length; i++) {
            j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
            let band = S[i];
            S[i] = S[j];
            S[j] = band;
        }
        //PRGA
        let res = [];
        for (let i = 0; i < input.length; i++) {
            j = (j + S[i]) % 256;
            let band = S[i];
            S[i] = S[j];
            S[j] = band;
            t = (S[i] + S[j]) % 256;
            res.push(S[t]);
        }
        //Texto a binario
        let textoBin = "";
        let keyBin = "";
        for (let i = 0; i < input.length; i++) {
            let band = input[i].charCodeAt(0).toString(2);
            while (band.length < 8) {
                band = "0" + band;
            }
            textoBin += band;
            band = res[i].toString(2);
            while (band.length < 8) {
                band = "0" + band;
            }
            keyBin += band;
        }
        document.getElementById("resultado").value = "KeyStream: "+keyBin;
        //XOR texto y palabra cifrante
        let rest = "";
        for (let i = 0; i < textoBin.length; i++) {
            if (textoBin[i] == keyBin[i]) {
                rest += 0;
            } else {
                rest += 1;
            }
        }
        document.getElementById("resultado").value += "\nResultado Binario: "+rest;
        //Binario a texto
        let tt = "";
        for (let i = 0; i < rest.length; i += 8) {
            let band = rest[i] + rest[i + 1] + rest[i + 2] + rest[i + 3] + rest[i + 4] + rest[i + 5] + rest[i + 6] + rest[i + 7];
            tt += String.fromCharCode(parseInt(band, 2));
        }
        document.getElementById("resultado").value += "\nResultado: "+tt;
    } else {
        //RC4 con diccionario
        for (let i = 0; i < input.length; i++) {
            if (!mandatory.includes(input[i].toUpperCase())) {
                alert("El texto ingresado tiene elementos fuera del diccionario " + input[i])
                return null;
            }
        }
        for (let i = 0; i < key.length; i++) {
            if (!mandatory.includes(key[i].toUpperCase())) {
                alert("La clave ingresada tiene elementos fuera del diccionario " + key[i])
                return null;
            }
        }
        for (let i = 0; i < mandatory.length; i++) {
            S.push(i);
        }
        //KSA
        let j = 0;
        for (let i = 0; i < input.length; i++) {
            j = (j + S[i % S.length] + key.charCodeAt(i % key.length)) % S.length;
            let band = S[i % S.length];
            S[i % S.length] = S[j];
            S[j] = band;
        }
        //PRGA
        let res = [];
        j = 0;
        for (let i = 0; i < input.length; i++) {
            j = (j + S[i % S.length]) % S.length;
            let band = S[i % S.length];
            S[i % S.length] = S[j % S.length];
            S[j % S.length] = band;
            t = (S[i % S.length] + S[j % S.length]) % S.length;
            res.push(S[t]);
        }
        //Texto a binario
        let textoBin = "";
        let keyBin = "";
        for (let i = 0; i < input.length; i++) {
            let band = mandatory.indexOf(input[i].toUpperCase()).toString(2);
            while (band.length < (mandatory.length.toString(2).length)-1) {
                band = "0" + band;
            }
            textoBin += band;
            band = res[i % S.length].toString(2);
            while (band.length < (mandatory.length.toString(2).length)-1) {
                band = "0" + band;
            }
            keyBin += band;
        }
        //document.getElementById("resultado").value = "KeyStream: "+keyBin;
        //XOR de texto y palabra cifrante
        let rest = "";
        for (let i = 0; i < textoBin.length; i++) {
            if (textoBin[i] == keyBin[i]) {
                rest += 0;
            } else {
                rest += 1;
            }
        }
        //document.getElementById("resultado").value += "\nResultado Binario: "+rest;
        //Binario a texto
        let tt = "";
        for (let i = 0; i < rest.length; i += (mandatory.length.toString(2).length)-1) {
            let band = "";
            for (let j = i; j < ((mandatory.length.toString(2).length)-1)+(i); j++) {
                band += rest[j];
            }
            tt += mandatory[parseInt(band, 2)];
        }
        document.getElementById("resultado").value = tt;
    }


    modificar();
}

function fuerzaB() {
    //Ataque de fuerza bruta para codigo de 4 letras
    document.getElementById("guia").innerHTML = "";
    let ban = document.getElementById("banned").value.split(",");
    let mandatory = document.getElementById("diccionario").value;
    let letras = [];
    //Diccionario a letras
    for (let i = 0; i < mandatory.length; i++) {
        letras.push(mandatory[i]);
    }
    let table = document.createElement("table");
    cont = 0;
    //Combinaciones de cada clave
    letras.forEach(letter1 => {
        //Temporizador para evitar la saturacion del programa
        window.setTimeout(() => {
            letras.forEach(letter2 => {
                letras.forEach(letter3 => {
                    letras.forEach(letter4 => {
                        let bool = true;
                        //Aplicacion del filtro a los resultados
                        ban.forEach(pal => {
                            if (decode(letter1 + letter2 + letter3 + letter4) == pal.toUpperCase() || decode(letter1 + letter2 + letter3 + letter4).includes(pal.toUpperCase())) {
                                bool = false;
                            }
                        });
                        //Decifrado
                        if (bool) {
                            let tr1 = document.createElement("tr");
                            let td1 = document.createElement("td");
                            let td2 = document.createElement("td");
                            let tr2 = document.createElement("tr");
                            let td3 = document.createElement("td");
                            td1.textContent = letter1 + letter2 + letter3 + letter4;
                            td2.textContent = decode(letter1 + letter2 + letter3 + letter4);
                            tr1.appendChild(td1);
                            tr1.appendChild(td2);
                            td3.textContent = "___"
                            td3.colSpan = 2;
                            tr2.appendChild(td3);
                            table.appendChild(tr2);
                            table.appendChild(tr1);
                            cont++;
                        }

                    });
                });
            });
        }, 1.5);
    });
    document.getElementById("guia").appendChild(table);
    modificar();
}

function decode(key) {
    let mandatory = document.getElementById("diccionario").value;
    let input = document.getElementById("resultado").value;
    let S = [];
    //Verificacion
    for (let i = 0; i < input.length; i++) {
        if (!mandatory.includes(input[i].toUpperCase())) {
            alert("EL texto tiene elementos fuera del diccionario " + input[i])
            return null;
        }
    }
    for (let i = 0; i < key.length; i++) {
        if (!mandatory.includes(key[i].toUpperCase())) {
            alert("La clave tiene elementos fuera del diccionario " + key[i])
            return null;
        }
    }
    //Descifrado
    for (let i = 0; i < mandatory.length; i++) {
        S.push(i);
    }
    //KSA
    let j = 0;
    for (let i = 0; i < input.length; i++) {
        j = (j + S[i % S.length] + key.charCodeAt(i % key.length)) % S.length;
        let band = S[i % S.length];
        S[i % S.length] = S[j];
        S[j] = band;
    }
    //PRGA
    j = 0;
    let res = [];
    for (let i = 0; i < input.length; i++) {
        j = (j + S[i % S.length]) % S.length;
        let band = S[i % S.length];
        S[i % S.length] = S[j % S.length];
        S[j % S.length] = band;
        t = (S[i % S.length] + S[j % S.length]) % S.length;
        res.push(S[t]);
    }
    //Texto a binario
    let textoBin = "";
    let keyBin = "";
    for (let i = 0; i < input.length; i++) {
        let band = mandatory.indexOf(input[i]).toString(2);
        while (band.length < (mandatory.length.toString(2).length)-1) {
            band = "0" + band;
        }
        textoBin += band;
        band = res[i % S.length].toString(2);
        while (band.length < (mandatory.length.toString(2).length)-1) {
            band = "0" + band;
        }
        keyBin += band;
    }
    //XOR texto palabra cifrante
    let rest = "";
    for (let i = 0; i < textoBin.length; i++) {
        if (textoBin[i] == keyBin[i]) {
            rest += 0;
        } else {
            rest += 1;
        }
    }
    //Binario a texto
    let tt = "";
        for (let i = 0; i < rest.length; i += (mandatory.length.toString(2).length)-1) {
            let band = "";
            for (let j = i; j < ((mandatory.length.toString(2).length)-1)+(i); j++) {
                band += rest[j];
            }
            tt += mandatory[parseInt(band, 2)];
        }
    return tt;
}

//Funcion que modifica algunos elementos de la pagina
function modificar() {
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
