'use strict';

var gCanvas, gCtx;


function onInit() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

    _resizeCanvas();
    handleCanvasEvents();
}

function onOptsChange(elInput) {
    setOptions(elInput.name, elInput.value);
}

function shareCanvas() {
    const data = gCanvas.toDataURL('image/png', 1);
    let encodedUri = encodeURIComponent(data);
    let link = document.createElement('a');
    link.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUri}&t=${encodedUri}`;
    link.target = '_blank';
    link.click();
    link.remove();
}

function downloadCanvas() {
    const data = gCanvas.toDataURL('image/png', 1);
    let link = document.createElement('a');
    link.href = data;
    link.download = 'my-canvas.png';
    link.click();
    link.remove();
}

function draw(ev) {
    let { offsetX, offsetY } = ev;
    switch (getCurrShape()) {
        case 'square':
            _drawRect(offsetX, offsetY, getRandomIntInclusive(50, 100), getRandomIntInclusive(50, 100));
            break;
        case 'triangle':
            _drawTriangle(offsetX, offsetY);
            break;
        case 'circle':
            _drawCircle(offsetX, offsetY);
            break;
        case 'line':
            _drawLine(offsetX, offsetY);
            break;
        default:
            break;
    }
}

function handleCanvasEvents() {
    gCanvas.addEventListener("touchstart", (ev) => {
        draw(ev);
    });
    gCanvas.addEventListener("touchmove", (ev) => {
        draw(ev);
    });

    gCanvas.addEventListener("mousedown", (ev) => {
        draw(ev);
        gCanvas.onmousemove = (ev) => {
            draw(ev);
        }
    });
    gCanvas.addEventListener("mouseup", () => {
        gCanvas.onmousemove = null;
    });
    gCanvas.addEventListener("mouseleave", () => {
        gCanvas.onmousemove = null;
    });
}

function _clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function _drawRect(x, y, rectWidth, rectHeight) {
    gCtx.beginPath();
    gCtx.rect(x, y, rectWidth, rectHeight);
    gCtx.strokeStyle = getCurrColor();
    gCtx.stroke();
}

function _drawTriangle(x, y) {
    let coord = y + getRandomIntInclusive(50, 100);
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(x + getRandomIntInclusive(50, 100), y + getRandomIntInclusive(50, 100));
    gCtx.lineTo(x - getRandomIntInclusive(50, 100), coord);
    gCtx.closePath();
    gCtx.strokeStyle = getCurrColor();
    gCtx.stroke();
}

function _drawCircle(x, y) {
    gCtx.beginPath();
    gCtx.arc(x, y, getRandomIntInclusive(50, 100), 0, 2 * Math.PI);
    gCtx.strokeStyle = getCurrColor();
    gCtx.stroke();
}

function _drawLine(x, y) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(x + 5, y);
    gCtx.closePath();
    gCtx.strokeStyle = getCurrColor();
    gCtx.stroke();
}

function _resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');

    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}