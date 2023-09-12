/**
 * creates movable objects
 */

class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.5;
    energy = 100;
    poisonBar = 100;
    coinBar = 100;
    firstHit = 0;
    lastHit = 0;
    speedX = 0;
    isBlocked = false;
    hitByBubble = false;

    /**
     * gives object gravity
     */

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    
    /**
     * 
     * @returns if objects is above ground
     */

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // ThrowableOB should always fall
        }
        else { return this.y < 250; }
    }

    /**
     * 
     * @returns if object hits top border of canvas
     */

    isOnTop() {
        return this.y > -120;
    }

    /**
     * makes object move to the right 
     */

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * makes object move to the left 
     */

    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * 
     * @param {Array} images array of images which should be animated
     */

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }

    /**
     * makes object swim upwards
     */

    jump() {
        this.speedY = 5;
    }


    /**
     * checks if two objects are colliding
     * @param {class} mo for example character/enemie/endboss
     * @returns the border of the object in which it counts to be hit
     * character border is made smaller than original image
     */

    isColliding(mo) {
        if (this instanceof Character && mo.energyEndboss) {
            return this.x + 70 + this.width - 120 >= mo.x + 30 &&
                this.x + 70 + this.width - 130 >= mo.x + 30 &&
                this.x + 70 <= mo.x + 30 + mo.width - 60 &&
                this.y + 130 + this.height - 180 > mo.y + 200 &&
                this.y + 130 <= mo.y + 200 + mo.height - 250
        }
        else if (this instanceof Character) {
            return this.x + 70 + this.width - 120 >= mo.x &&
                this.x + 70 + this.width - 130 >= mo.x &&
                this.x + 70 <= mo.x + mo.width &&
                this.y + 130 + this.height - 180 > mo.y &&
                this.y + 130 <= mo.y + mo.height
        }
        else {
            return this.x + this.width >= mo.x &&
                this.x + this.width >= mo.x &&
                this.x <= mo.x + mo.width &&
                this.y + this.height > mo.y &&
                this.y <= mo.y + mo.height
        }
    }

    /**
     * if character collides with enemie he is "hit"
     * energy is reduced by 5
     */

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * if enemie collides with bubble he is "hit"
     * energy is reduced by 50
     */

    hitEnemie() {
        this.energyEnemie -= 50;
        if (this.energyEnemie < 0) {
            this.energyEnemie = 0;
        }
        else {
            this.firstHit = new Date().getTime();
        }
    }

    /**
     * if endboss collides with bubble he is "hit"
     * normal bubble - energy is reduced by 30
     * poison bubble - energy is reduced by 50
     * @param {number} i number of colliding coin in throwableObjects array
     */

    hitEndboss(i) {
        if (world.throwableObjects[i].IMAGE == world.throwableObjects[i].IMAGE_POISON) { //if bubble is poison
            this.energyEndboss -= 50;
        }
        else {
            this.energyEndboss -= 30; //normal bubble
        }
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        }
        else {
            this.firstHit = new Date().getTime();
        }
    }

    /**
    * if character collides with coin
    * coinbar will rise 20
    */

    catchCoin() {
        this.coinBar -= 20;
        if (this.coinBar > 100) {
            this.coinBar = 100;
        }
        else if (this.coinBar < 20) {
            this.coinBar = 0;
        }
    }

    /**
    * if character collides with coin
    * poisonbar will rise 20
    */

    catchPoison() {
        this.poisonBar -= 20;
        if (this.poisonBar > 100) {
            this.poisonBar = 100;
        }
        else if (this.poisonBar < 20) {
            this.poisonBar = 0;
        }
    }

    /**
     * 
     * @returns 0 energy if character is dead
     */

    isDead() {
        return this.energy == 0;

    }

    /**
     * 
     * @returns time passed since character was hurt
     */

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // mili seconds(ms)
        timePassed = timePassed / 1000; // in seconds(s)
        return timePassed < 0.25;
    }

    /**
     * 
     * @returns time passed since enemie was hurt 
     */

    hitOnce() {
        let timePassed = new Date().getTime() - this.firstHit; // mili seconds(ms)
        timePassed = timePassed / 1000; // in seconds(s)
        return timePassed < 1;
    }

}