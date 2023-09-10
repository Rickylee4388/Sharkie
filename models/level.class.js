class Level{
    enemies;
    barriers;
    backgroundObjects;
    level_end_x = 700*3;
    statusbar;
    coinImg;
    poisonImg;

    constructor(enemies,barriers,backgroundObjects,statusbar,coinImg,poisonImg){
        this.enemies = enemies;
        this.barriers = barriers;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
        this.coinImg = coinImg;
        this.poisonImg = poisonImg;
    }
}