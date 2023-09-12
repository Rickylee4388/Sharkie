/**
 *  creates endboss
 */

class Endboss extends MovableObject {
    height = 400;
    width = 300;
    energyEndboss = 100;
    world;

    IMAGES_INTRODUCTION = [
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    IMAGES_ATTACK = [
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/5.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    IMAGES_HURT = [
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_DEAD = [
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',

    ];

    IMAGES_WALKING = [
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/5.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/6.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/7.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/8.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/9.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/10.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/11.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/12.png',
        'Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    constructor() {
        super();
        this.loadImage('Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.loadImages(this.IMAGES_INTRODUCTION);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2000;
        this.y = 0;
        this.animate();
    }

    /**
     * plays images as animation
     */

    animate() {
        let countIntervalForEnergy50 = 0;
        let countIntervalForIntroduction = 0;
        let countIntervalForEnergy70 = 0;
        let countIntervalForEnergy40 = 0;
        let countIntervalForEnergy10 = 0;
        let countIntervalForDead = 0;
        let countIntervalForEnergy20 = 0;

        setInterval(() => {
            if (world.character.x > 1550 && this.energyEndboss == 100) {
                this.introduction(countIntervalForIntroduction);
                countIntervalForIntroduction++;
            }
            if (this.energyEndboss == 70) {
                this.attack(countIntervalForEnergy70);
                countIntervalForEnergy70++;
            }
            if (this.energyEndboss == 50) {
                this.attack(countIntervalForEnergy50);
                countIntervalForEnergy50++;
            }
            if (this.energyEndboss == 40) {
                this.attack(countIntervalForEnergy40);
                countIntervalForEnergy40++;
            }
            if (this.energyEndboss == 20) {
                this.attack(countIntervalForEnergy20);
                countIntervalForEnergy20++;
            }
            if (this.energyEndboss == 10) {
                this.attack(countIntervalForEnergy10);
                countIntervalForEnergy10++;
            }
            if (this.energyEndboss <= 0) {
                this.dead(countIntervalForDead);
                countIntervalForDead++
            }
        }, 150);
    }

    /**
     * animates introduction of the endboss
     * @param {number} i counts intervals to change images
     */

    introduction(i) {
        if (i < 10) {
            if (i == 0) {
                intro_sound.play();
            }
            this.playAnimation(this.IMAGES_INTRODUCTION);
        }
        else {
            intro_sound.pause();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * animates bubble hits endboss
     * @param {number} j counts intervals to change images
     */

    attack(j) {
        if (j < 4) {
            this.endbossHurt(j);
        }
        else if (j >= 4 && j < 10) {
            this.endbossAttack(j);
        }
        else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * animates if endboss is hurt
     * @param {number} j counts intervals to change images
     */

    endbossHurt(j) {
        this.playAnimation(this.IMAGES_HURT);
        if (j == 0) {
            endbosshurt_sound.play();
        }
    }

    /**
    * animates endboss attacking character
    * @param {number} j counts intervals to change images
    */

    endbossAttack(j) {
        if (j == 4) {
            attack_sound.play();
        }
        this.playAnimation(this.IMAGES_ATTACK);
        if (j > 4 && j < 7) {       //jump forward
            this.x -= 70;
        }
        if (j >= 8 && j < 10) {     //go back to startposition
            this.x += 70;
        }
    }

    /**
    * animates endboss is dead
    * @param {number} m counts intervals to change images
    */

    dead(m) {
        if (m < 6) {
            win_sound.play();
            this.playAnimation(this.IMAGES_DEAD);
        }
        else {
            this.loadImage('Alternative Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png');
            this.speed = 0;
            this.speedY = 5;
            this.y -= this.speedY;
        }

    }
}
