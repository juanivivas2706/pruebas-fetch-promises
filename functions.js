import 'Math'

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomizePatente(){
    let patente = "";
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    patente += letras[getRandomInt(0, letras.length)];
    patente += letras[getRandomInt(0, letras.length)];
    patente += letras[getRandomInt(0, letras.length)];
    patente += getRandomInt(0, 9).toString();
    patente += getRandomInt(0, 9).toString();
    patente += getRandomInt(0, 9).toString();

    return patente;
}
