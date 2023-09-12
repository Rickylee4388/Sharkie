/**
 * creates enemie (jellyfish)
 */

class Jellyfish extends MovableObject {
    energyEnemie = 100;
    IMAGES_WALKING = [
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];
    IMAGES_HURTONCE = [
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];
    IMAGES_DEAD = [
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];
    enemiedeadsound = true;


    constructor() {
        super().loadImage('Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        this.animate();
        this.setStartPosition();
        this.setProperties();
    }
    
    /**
     * loads all image arrays of enemie
     */

    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURTONCE);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * sets height and width of enemie
     */

    setProperties() {
        this.height = 80;
        this.width = 80;
    }

    /**
     * sets position in canvas (x,y)
     */

    setStartPosition() {
        this.x = 550 + Math.random() * 1600;
        this.y = 250 - Math.random() * 200;
    }

    /**
     * animates images of enemie
     */

    animate() {
        this.moveInterval();
        this.statusAnimation();
    }

    /**
     * sets interval so animation looks good 
     */

    moveInterval() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * if enemie hit by bubble energy set to 50%
     * second hit -> enemie dead
     */

    statusAnimation() {
        setInterval(() => {
            if (this.energyEnemie == 50) {
                this.enemieHitOnceAnimation();
            }
            else if (this.energyEnemie == 0) {
                this.enemieDeadAnimation();
            }
            else {
                this.swimAnimation();
            }
        }, 100);
    }

    /**
     * animates enemie if hit by bubble
     * @param {number} i  counts interval to change images
     */

    enemieHitOnceAnimation() {
        this.playAnimation(this.IMAGES_HURTONCE); //big fish animation
        this.speed = 0.15 + Math.random() * 1.5;
    }

    /**
     * plays animation if enemie is dead
     */

    enemieDeadAnimation() {
        if (this.enemiedeadsound == true) {
            enemiedead_sound.play();
        }
        this.enemiedeadsound = false;
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        this.speedY = 5;
        this.y -= this.speedY;
    }

    /**
     * plays animation if enemie swims
     */
    
    swimAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
    }
}

