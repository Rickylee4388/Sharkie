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

/**
 * initialising the start page
 */

function init() {
    canvas = document.getElementById('canvas');
}

/**
 * Game canvas is created (world) and displayed in index.html
 * setTimeout is used because the loading time of the images takes a second
 * 
 * @param {class} world creates all elements needed in the world
 * 
 */

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

/**
 * 
 * reloads canvas and all elements. parameters set back to zero
 */

function restartGame() {
    location.reload();
}

/**
 * adds eventlistener for keyboard if key down
 */

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

/**
 * adds eventlistener for touch
 */

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

/**
 * adds eventlistener for keyboard if not pressed
 */

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

/**
 * starts fullscreen mode
 */

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

/**
 * exit fullscreen mode
 */

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * sets all sounds volume to zero
 * @param {audio} all all values are audio files
 */

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

/**
 * changes sound image to 'on' in index.html
 */

function changeImgSoundOn(){
    document.getElementById('soundOnInCanvas').classList.add('d-none');
    document.getElementById('soundOnInCanvas').classList.remove('d-flex');
    document.getElementById('soundOffInCanvas').classList.remove('d-none');
    document.getElementById('soundOffInCanvas').classList.add('d-flex');
}

/**
 * sets all sounds volume to one
 * @param {audio} all all values are audio files
 */

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

/**
 * changes sound image to 'off' in index.html
 */

function changeImgSoundOff(){
    document.getElementById('soundOnInCanvas').classList.remove('d-none');
    document.getElementById('soundOnInCanvas').classList.add('d-flex');
    document.getElementById('soundOffInCanvas').classList.add('d-none');
    document.getElementById('soundOffInCanvas').classList.remove('d-flex');
}
