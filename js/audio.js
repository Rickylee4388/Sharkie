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