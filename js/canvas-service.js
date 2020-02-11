'use strict';

var gOptions = {
    shape: 'square',
    color: '#000000'
}



function getCurrShape() {
    return gOptions.shape;
}
function getCurrColor() {
    return gOptions.color;
}

function setOptions(key, value) {
    gOptions[key] = value;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}