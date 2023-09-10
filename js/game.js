// GAME.JS
let canvas;
let world;
let keyboard = new Keyboard();
let endbosshurt_sound = new Audio('audio/enemy_hit.wav');
let intro_sound = new Audio('audio/killerintro.wav');
let attack_sound = new Audio('audio/attack.wav');
let win_sound = new Audio('audio/winner.wav');
let enemiedead_sound = new Audio('audio/enemy_hit.wav');
let catchCoin_sound = new Audio('audio/catchcoin.wav');
let catchPoison_sound = new Audio('audio/catchPoison.wav');
let walking_sound = new Audio('audio/swim.mp3');
let dead_sound = new Audio('audio/lose.wav');
let hurt_sound = new Audio('audio/character_hurt.wav');
let bubble_sound = new Audio('audio/bubble.mp3');


function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    initLevel();
    world = new World(canvas);
    setTimeout(() => {
        document.getElementById('canvasContainer').classList.remove('d-none');
        document.getElementById('canvas').classList.remove('d-none');
        document.getElementById('startscreen').classList.add('d-none');
        document.getElementById('startscreen').classList.remove('d-flex');
        document.getElementById('fullscreenbtn').classList.remove('d-none');
        document.getElementById('restartBtn').classList.remove('d-none');
        document.getElementById('restartBtn').classList.add('d-flex');
        addTouch();
    }, 1000);
}

function restartGame() {
    location.reload();
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }

});

// TOUCH NOT WORKING
function addTouch(){
    document.getElementById('LEFTBTN').addEventListener('touchstart', (event) => {
        event.preventDefault();
        console.log('left button touched');
        keyboard.LEFT = true;     
    });
    document.getElementById('LEFTBTN').addEventListener('touchend', (event) => {
        console.log('left button not touched');
        event.preventDefault();
            keyboard.LEFT = false;
    });
    document.getElementById('UPBTN').addEventListener('touchstart', (event) => {
        event.preventDefault();
        console.log('UP button touched');
        keyboard.UP = true;     
    });
    document.getElementById('UPBTN').addEventListener('touchend', (event) => {
        console.log('UP button not touched');
        event.preventDefault();
            keyboard.UP = false;
    });
    document.getElementById('RIGHTBTN').addEventListener('touchstart', (event) => {
        event.preventDefault();
        console.log('R button touched');
        keyboard.RIGHT = true;     
    });
    document.getElementById('RIGHTBTN').addEventListener('touchend', (event) => {
        console.log('R button not touched');
        event.preventDefault();
            keyboard.RIGHT = false;
    });
    document.getElementById('DBTN').addEventListener('touchstart', (event) => {
        event.preventDefault();
        console.log('D button touched');
        keyboard.D = true;     
    });
    document.getElementById('DBTN').addEventListener('touchend', (event) => {
        console.log('D button not touched');
        event.preventDefault();
            keyboard.D = false;
    });
}


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    document.getElementById('fullscreen').classList.add('bg-image');
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function muteMe() {
    changeImgSoundOn();
    endbosshurt_sound.volume = 0;
    intro_sound.volume = 0;
    attack_sound.volume = 0;
    win_sound.volume = 0;
    enemiedead_sound.volume = 0;
    catchCoin_sound.volume = 0;
    catchPoison_sound.volume = 0;
    walking_sound.volume = 0;
    dead_sound.volume = 0;
    hurt_sound.volume = 0;
    bubble_sound.volume = 0;
}

function changeImgSoundOn(){
    document.getElementById('soundOnInCanvas').classList.add('d-none');
    document.getElementById('soundOnInCanvas').classList.remove('d-flex');
    document.getElementById('soundOffInCanvas').classList.remove('d-none');
    document.getElementById('soundOffInCanvas').classList.add('d-flex');
}

function unMuteMe() {
    changeImgSoundOff();
    endbosshurt_sound.volume = 1;
    intro_sound.volume = 1;
    attack_sound.volume = 1;
    win_sound.volume = 1;
    enemiedead_sound.volume = 1;
    catchCoin_sound.volume = 1;
    catchPoison_sound.volume = 1;
    walking_sound.volume = 1;
    dead_sound.volume = 1;
    hurt_sound.volume = 1;
    bubble_sound.volume = 1;
}

function changeImgSoundOff(){
    document.getElementById('soundOnInCanvas').classList.remove('d-none');
    document.getElementById('soundOnInCanvas').classList.add('d-flex');
    document.getElementById('soundOffInCanvas').classList.add('d-none');
    document.getElementById('soundOffInCanvas').classList.remove('d-flex');
}
