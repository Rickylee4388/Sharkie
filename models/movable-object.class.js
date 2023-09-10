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


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // ThrowableOB should always fall
        }
        else { return this.y < 250; }
    }

    isOnTop() {
        return this.y > -120;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageChache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 5;
    }



    //character.isColliding(chicken)// character border made smaller than img
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

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    hitEnemie() {
        this.energyEnemie -= 50;
        if (this.energyEnemie < 0) {
            this.energyEnemie = 0;
        }
        else {
            this.firstHit = new Date().getTime();
        }
    }

    hitEndboss(i) {
        if (world.throwableObjects[i].IMAGE == world.throwableObjects[i].IMAGE_POISON) { //if bubble is poison
            this.energyEndboss -= 50;
        }
        else {
            this.energyEndboss -= 30; //noemal bubble
        }
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        }
        else {
            this.firstHit = new Date().getTime();
        }
    }

    catchCoin() {
        this.coinBar -= 20;
        if (this.coinBar > 100) {
            this.coinBar = 100;
        }
        else if (this.coinBar < 20) {
            this.coinBar = 0;
        }
    }

    catchPoison() {
        this.poisonBar -= 20;
        if (this.poisonBar > 100) {
            this.poisonBar = 100;
        }
        else if (this.poisonBar < 20) {
            this.poisonBar = 0;
        }
    }

    isDead() {
        return this.energy == 0;

    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // mili seconds(ms)
        timePassed = timePassed / 1000; // in seconds(s)
        return timePassed < 0.25;
    }

    hitOnce() {
        let timePassed = new Date().getTime() - this.firstHit; // mili seconds(ms)
        timePassed = timePassed / 1000; // in seconds(s)
        return timePassed < 1;
    }

}