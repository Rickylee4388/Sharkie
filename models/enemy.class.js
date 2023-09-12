/**
 * creates enemie (green fish)
 */

class Enemy extends MovableObject {
    energyEnemie = 100;
    IMAGES_WALKING = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    IMAGES_TRANSITION_GREEN = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ];
    IMAGES_HURTONCE = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png'
    ];
    IMAGES_DEAD = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png'
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
        this.loadImages(this.IMAGES_TRANSITION_GREEN);
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
        this.x = 350 + Math.random() * 1500;
        this.y = 400 - Math.random() * 300;
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

    statusAnimation(){
        let i = 0;
        setInterval(() => {
            if (this.energyEnemie == 50) { 
                this.enemieHitOnceAnimation(i);
                i++;
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

    enemieHitOnceAnimation(i){
        if (i < 5) {
            this.playAnimation(this.IMAGES_TRANSITION_GREEN); //transition to big fish
            this.speed = 0;
        
        }
        else {
            this.playAnimation(this.IMAGES_HURTONCE); //big fish animation
            this.speed = 0.15 + Math.random() * 1.5;
        }
    }

    /**
     * plays animation if enemie is dead
     */

    enemieDeadAnimation(){
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
    
    swimAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
    }
}
