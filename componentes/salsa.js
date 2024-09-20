let integrado = "expand 32-byte k";
let fijo = textToBin(integrado);
let table = document.createElement("table");
let posicion = textToBin("00000000");
let todo = [];

function textToBin(texto) {
    let letras = [];
    let keys = [];
    for (let i = 0; i < texto.length; i++) {
        letras.push(texto[i].charCodeAt(0).toString(2));
        while (letras[letras.length - 1].length < 8) {
            letras[letras.length - 1] = "0" + letras[letras.length - 1];
        }
        if ((i + 1) % 4 == 0) {
            keys.push(letras[letras.length - 4] + letras[letras.length - 3] + letras[letras.length - 2] + letras[letras.length - 1]);
        }
    }

    return keys;
}

function binToText(texto) {
    let res = ""
    texto.forEach(key => {
        for (let i = 0; i < key.length; i++) {
            if (i == 24) {
                let letra = key.substring(i);
                res += String.fromCharCode(parseInt(letra, 2));
                i += 7;
            } else {
                let letra = key.substring(i, i + 8);
                res += String.fromCharCode(parseInt(letra, 2))
                i += 7;
            }
        }

    });
    return res;
}
//SALSA
function codificar() {
    let nonce;
    //paso del nonce a binario
    if (document.getElementById("nonce").value.length < 8) {
        let val = document.getElementById("nonce").value
        while (val.length < 8) {
            val = "0" + val;
        }
        nonce = textToBin(val);
    } else if (document.getElementById("nonce").value.length == 8) {
        nonce = textToBin(document.getElementById("nonce").value);
    } else {
        nonce = textToBin(document.getElementById("nonce").value.substring(0, 8));
    }
    //paso de la semilla a binario
    let keys = textToBin(document.getElementById("seed").value);
    //Acomoda la matriz
    organizador(keys, nonce, fijo, posicion, true);
    //Grafica la matriz
    tablon(0);
    //Acomoda el HTML
    modificar();
    //Alista las rondas
    cocinar(parseInt(document.getElementById("round").value), true);
    //Hacer el XOR del texto y la palabra cifrante
    respuesta(true);
    //Comprobar la respuesta
    /*organizador(keys, nonce, fijo, posicion,true);
    cocinar(parseInt(document.getElementById("round").value), true);
    veritas(true);*/
}
//CHACHA
function chacha() {
    let nonce;
    //Paso del nonce a binario
    if (document.getElementById("nonce").value.length < 8) {
        let val = document.getElementById("nonce").value
        while (val.length < 8) {
            val = "0" + val;
        }
        nonce = textToBin(val);
    } else if (document.getElementById("nonce").value.length == 8) {
        nonce = textToBin(document.getElementById("nonce").value);
    } else {
        nonce = textToBin(document.getElementById("nonce").value.substring(0, 8));
    }
    //Paso de la semilla a binario
    let keys = textToBin(document.getElementById("seed").value);
    //Acomodar la matriz
    organizador(keys, nonce, fijo, posicion, false);
    //Graficar la tabla
    tablon(0);
    //Acomoda el HTML
    modificar();
    //Alista las rondas
    cocinar(parseInt(document.getElementById("round").value), false);
    //Hacer el XOR del texto con la palabra cifrante
    respuesta(false);
    //Comprueba la respuesta
    /*organizador(keys, nonce, fijo, posicion,false);
    cocinar(parseInt(document.getElementById("round").value), false);
    veritas(false);*/
}

function tablon(paso) {
    for (let i = 0; i < todo.length; i += 4) {
        let content = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        cell1.textContent = todo[i];
        cell2.textContent = todo[i + 1];
        cell3.textContent = todo[i + 2];
        cell4.textContent = todo[i + 3];
        content.appendChild(cell1);
        content.appendChild(cell2);
        content.appendChild(cell3);
        content.appendChild(cell4);
        table.appendChild(content);
    }
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.colSpan = 4;
    cell.innerText = "Paso No: "+paso;
    row.appendChild(cell);
    table.appendChild(row);
    document.getElementById("guia").appendChild(table);
}

function organizador(keys, nonce, base, posicion, type) {
    todo = [];
    if (type) {
        todo.push(base[0], keys[0], keys[1], keys[2],
            keys[3], base[1], nonce[0], nonce[1],
            posicion[0], posicion[1], base[2], keys[4],
            keys[5], keys[6], keys[7], base[3]
        )
    }else{
        todo.push(base[0], base[1], base[2], base[3],
            keys[0], keys[1], keys[2], keys[3],
            keys[4], keys[5], keys[6], keys[7],
            posicion[0], posicion[1], nonce[0], nonce[1]
        )
    }
}

function cocinar(rondo, type) {
    if (type) {
        for (let i = 0; i < rondo; i++) {
            if (i % 2 == 0) {
                salsas(0, 4, 8, 12);
                salsas(5, 9, 13, 1);
                salsas(10, 14, 2, 6);
                salsas(15, 3, 7, 11);
            }
            else {
                salsas(0, 1, 2, 3);
                salsas(5, 6, 7, 4);
                salsas(10, 11, 8, 9);
                salsas(15, 12, 13, 14);
            }
            tablon(i);
        }
    } else {
        for (let i = 0; i < rondo; i++) {
            if (i % 2 == 0) {
                chachas(0, 4, 8, 12);
                chachas(1, 5, 9, 13);
                chachas(2, 6, 10, 14);
                chachas(3, 7, 11, 15);
            }
            else {
                chachas(0, 5, 10, 15);
                chachas(1, 6, 11, 12);
                chachas(2, 7, 8, 13);
                chachas(3, 4, 9, 14);
            }
            tablon(i);
        }
    }
}

function salsas(a, b, c, d) {
    let band = (parseInt(todo[a], 2) +
        parseInt(todo[d], 2) % 256
    ).toString(2);
    while (band.length < 32) {
        band = "0" + band;
    }
    band = (band + "0000000").substring(7);

    let resb = "";
    for (let i = 0; i < band.length; i++) {
        if (todo[b][i] == band[i]) {
            resb += "0";
        } else {
            resb += "1";
        }
    }

    band = (parseInt(todo[a], 2) +
        parseInt(resb, 2) % 256
    ).toString(2);
    while (band.length < 32) {
        band = "0" + band;
    }
    band = (band + "000000000".substring(9));

    let resc = "";
    for (let i = 0; i < band.length; i++) {
        if (todo[c][i] == band[i]) {
            resc += "0";
        } else {
            resc += "1";
        }
    }

    band = (parseInt(resc, 2) +
        parseInt(resb, 2) % 256
    ).toString(2);
    while (band.length < 32) {
        band = "0" + band;
    }
    band = (band + "0000000000000").substring(13);

    let resd = "";
    for (let i = 0; i < band.length; i++) {
        if (todo[d][i] == band[i]) {
            resd += "0";
        } else {
            resd += "1";
        }
    }

    band = (parseInt(resc, 2) +
        parseInt(resd, 2) % 256
    ).toString(2);
    while (band.length < 32) {
        band = "0" + band;
    }
    band = (band + "000000000000000000").substring(18);

    let resa = "";
    for (let i = 0; i < band.length; i++) {
        if (todo[a][i] == band[i]) {
            resa += "0";
        } else {
            resa += "1";
        }
    }
    todo[a] = resa;
    todo[b] = resb;
    todo[c] = resc;
    todo[d] = resd;
}

function chachas(a, b, c, d) {
    let resa = (parseInt(todo[a], 2) +
        parseInt(todo[b], 2) % 256
    ).toString(2);
    while (resa.length < 32) {
        resa = "0" + resa;
    }

    let resd = "";
    for (let i = 0; i < resa.length; i++) {
        if (resa[i] == todo[d][i]) {
            resd += "0";
        } else {
            resd += "1";
        }
    }
    resd = (resd + "0000000000000000").substring(16);

    let resc = (parseInt(todo[c], 2) +
        parseInt(resd, 2) % 256
    ).toString(2);
    while (resc.length < 32) {
        resc = "0" + resc;
    }

    let resb = "";
    for (let i = 0; i < resc.length; i++) {
        if (resc[i] == todo[b][i]) {
            resb += "0";
        } else {
            resb += "1";
        }
    }
    resb = (resb + "000000000000").substring(12);

    resa = (parseInt(resa, 2) +
        parseInt(resb, 2) % 256
    ).toString(2);
    while (resa.length < 32) {
        resa = "0" + resa;
    }

    let band = "";
    for (let i = 0; i < resd.length; i++) {
        if (resa[i] == resd[i]) {
            band += "0";
        } else {
            band += "1";
        }
    }
    resd = (band + "00000000").substring(8);

    resc = (parseInt(resc, 2) +
        parseInt(resd, 2) % 256
    ).toString(2);
    while (resc.length < 32) {
        resc = "0" + resc;
    }

    band = "";
    for (let i = 0; i < resb.length; i++) {
        if (resc[i] == resb[i]) {
            band += "0";
        } else {
            band += "1";
        }
    }
    resb = (band + "0000000").substring(7);
    todo[a] = resa;
    todo[b] = resb;
    todo[c] = resc;
    todo[d] = resd;
}

function respuesta(indicativo) {
    let plaintxt = document.getElementById("insercion").value;
    while (plaintxt.length % 64 != 0) {
        plaintxt += " ";
    }

    let texto = textToBin(plaintxt);
    let resp = [];
    for (let k = 0; k < texto.length; k += 16) {
        let cuadros = texto.slice(k, k + 16)
        let band = (k / 16) + "";
        while (band.length < 8) {
            band = "0" + band;
        }
        indicativo ? todo[8] = textToBin(band.substring(0, 4))[0] : todo[12] = textToBin(band.substring(0, 4))[0];
        indicativo ? todo[9] = textToBin(band.substring(4))[0] : todo[13] = textToBin(band.substring(4))[0];


        for (let i = 0; i < todo.length; i++) {

            res = "";
            for (let j = 0; j < cuadros[i].length; j++) {
                if (todo[i][j] == cuadros[i][j]) {
                    res += "0";
                } else {
                    res += "1";
                }
            }
            resp.push(res);
        }
    }
    document.getElementById("resultado").value = binToText(resp);
}

/*function veritas(indicativo) {
    let texto = textToBin(document.getElementById("resultado").value);
    let resp = [];
    for (let k = 0; k < texto.length; k += 16) {
        let cuadros = texto.slice(k, k + 16)
        let band = (k / 16) + "";
        while (band.length < 8) {
            band = "0" + band;
        }
        indicativo ? todo[8] = textToBin(band.substring(0, 4))[0] : todo[12] = textToBin(band.substring(0, 4))[0];
        indicativo ? todo[9] = textToBin(band.substring(4))[0] : todo[13] = textToBin(band.substring(4))[0];


        for (let i = 0; i < todo.length; i++) {

            res = "";
            for (let j = 0; j < cuadros[i].length; j++) {
                if (todo[i][j] == cuadros[i][j]) {
                    res += "0";
                } else {
                    res += "1";
                }
            }
            resp.push(res);
        }
    }
    document.getElementById("resultado").value += "//////" + binToText(resp);
}*/


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