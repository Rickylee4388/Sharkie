/**
 * creates throwable objects (bubble)
 */

class ThrowableObject extends MovableObject {
    IMAGE;
    IMAGE_BUBBLE = 'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    IMAGE_POISON = 'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';
    percentage;

    /**
     * 
     * @param {number} x position on x in canvas
     * @param {number} y position on y in canvas
     * @param {number} percentage percentage of poison used to check if poison bullbe or normal bubble
     */

    constructor(x, y, percentage) {
        super();
        this.loadFloatingObjects(percentage);
        this.setProperties(x, y);
        this.throw();
    }

    /**
     * position of bubble starting from character
     * @param {number} x position in canvas can be changed
     * @param {number} y position in canvas can be changed
     */

    setProperties(x, y) {
        if (world.character.otherDirection == true) {
            this.x = x - 200;
        }
        else {
            this.x = x;
        }
        this.y = y+70;
    }

    /**
     * loads either poison or coin
     * @param {number} percentage of poisonbar
     */

    loadFloatingObjects(percentage) {
        if (percentage == 0) {
            this.loadFloatingPoison();
        }
        else {
            this.loadFloatingCoin();
        }
    }

    /**
     * loads image of poison bubble
     */

    loadFloatingPoison() {
        this.loadImage(this.IMAGE_POISON);
        this.IMAGE = this.IMAGE_POISON;
        this.height = 80;
        this.width = 80;
    }

    /**
     * loads image of normal bubble
     */

    loadFloatingCoin() {
        this.loadImage(this.IMAGE_BUBBLE);
        this.IMAGE = this.IMAGE_BUBBLE;
        this.height = 50;
        this.width = 50;
    }

    /**
     * animates the throw way of the bubble
     */

    throw() {
        this.speedY = 3;
        this.acceleration = -0.5;
        this.applyGravity();
        bubble_sound.play();
        this.setThrowDirection();
    }

    /**
     * if character looks right, direction of throw also right
     * otherwise left
     */

    setThrowDirection() {
        if (world.character.otherDirection == true) {   //throw left
            setInterval(() => {
                this.x -= 5;
            }, 1000 / 60);
        }
        else {                  //throw right
            setInterval(() => {
                this.x += 5;
            }, 1000 / 60);
        }
    }
}

