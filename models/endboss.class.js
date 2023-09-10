class Endboss extends MovableObject {
    height = 400;
    width = 300;
    energyEndboss = 100;
    world;
    // endbosshurt_sound = new Audio('audio/enemy_hit.wav');
    // intro_sound = new Audio('audio/killerintro.wav');
    // attack_sound = new Audio('audio/attack.wav');
    // win_sound = new Audio('audio/winner.wav')

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

    animate() {
        let h = 0;
        let i = 0;
        let j = 0;
        let k = 0;
        let l = 0;
        let m = 0;
        let n = 0;

        setInterval(() => {
            if (world.character.x > 1550 && this.energyEndboss == 100) {
                this.introduction(i);
                i++;
            }
            if (this.energyEndboss == 70) {
                this.attack(j);
                j++;
            }
            if (this.energyEndboss == 50) {
                this.attack(h);
                h++;
            }
            if (this.energyEndboss == 40) {
                this.attack(k);
                k++;
            }
            if (this.energyEndboss == 20) {
                this.attack(n);
                n++;
            }
            if (this.energyEndboss == 10) {
                this.attack(l);
                l++;
            }
            if (this.energyEndboss <= 0) {
                this.dead(m);
                m++
            }
        }, 150);
    }

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

    endbossHurt(j) {
        this.playAnimation(this.IMAGES_HURT);
        if (j == 0) {
            endbosshurt_sound.play();
        }
    }

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