class World {
    character = new Character();
    canvas;
    ctx;
    level = level1;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    amountPoisonBubbles = 3;
    bubble;
    win = new Win();
    lose = new Lose();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();

    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrow();
            this.checkCollisionBarrier();
            this.checkCollisionCoinsAndPoison(this.level.poisonImg, 'poison');
            this.checkCollisionCoinsAndPoison(this.level.coinImg, 'coin');
            if (this.throwableObjectsExist()) {
                this.checkCollisionBubble();
            }
        }, 140);
    }
    throwableObjectsExist() {
        return this.throwableObjects.length > 0
    }

    checkThrow() {
        if (this.keyboard.D) {
            //Throw should only be possible again after 500ms-Sart
            let lastTime = sessionStorage.getItem("lastTime");
            let now = new Date().getTime(); //Time in ms
            let time = now - lastTime;
            if (time < 500) {
                return;
            }
            else {
                lastTime = now;
                sessionStorage.setItem("lastTime", lastTime);
            }
            //Throw should only be possible again after 500ms-End
            this.createNewBubble();
            this.checkIfPoisonBubblesLeft();

        }
    }

    checkIfPoisonBubblesLeft() {
        if (this.amountPoisonBubbles > 0 && this.character.poisonBar == 0) { //if Poisonbubbles left reduce by one
            this.amountPoisonBubbles--
        }
        if (this.amountPoisonBubbles == 0 && this.character.poisonBar == 0) {//if no Poisonbubbles left reset Poisonbar
            this.character.poisonBar = 100;
            this.level.statusbar[2].setPercentage(this.character.poisonBar); // setPercentage of poison  -  statusbar[1]
        }
    }

    createNewBubble() {
        this.bubble = new ThrowableObject(this.character.x + 200, this.character.y + 70, this.character.poisonBar);
        this.throwableObjects.push(this.bubble);
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => { // check if character touches any of all enemies
            let number = this.level.enemies.indexOf(enemy);
            if (this.ifNormalEnemy(enemy, number) || this.ifEndboss(enemy, number)) {
                this.character.hit();
                this.level.statusbar[1].setPercentage(this.character.energy); // setPercentage of life of character -  statusbar[1]
            }
        });
    }

    ifNormalEnemy(enemy, number) {
        return this.character.isColliding(enemy) && this.level.enemies[number].energyEnemie > 0;
    }

    ifEndboss(enemy, number) {
        return this.character.isColliding(enemy) && this.level.enemies[number].energyEndboss > 0
    }

    checkCollisionCoinsAndPoison(a, c) { //check if character hits floating object. Deletes this object and sets Statusbar
        a.forEach((object) => {
            if (this.character.isColliding(object)) {
                if (c == 'coin') {
                    catchCoin_sound.play();
                    this.character.catchCoin();
                    this.level.statusbar[0].setPercentage(this.character.coinBar); // setPercentage of coin  -  statusbar[0]

                }
                else if (c == 'poison') {
                    catchPoison_sound.play();
                    this.character.catchPoison();
                    this.level.statusbar[2].setPercentage(this.character.poisonBar); // setPercentage of poison  -  statusbar[2]
                }
                a.splice(a.indexOf(object), 1);
            }
        });
    }

    checkCollisionBarrier() {       //check if character hits barrier
        this.level.barriers.forEach((barrier) => {
            if (this.character.isColliding(barrier)) {
                console.log('BLOCKED');
                this.character.isBlocked = true;
            }
            else {
                this.character.isBlocked = false;
            }
        });
    }

    checkCollisionBubble() { //check if bubble hits enemie/endboss
        let i = this.throwableObjects.length - 1;
        let throwableObject = this.throwableObjects[i];
        this.level.enemies.forEach((enemy) => {
            if (throwableObject.isColliding(enemy)) {
                let number = this.level.enemies.indexOf(enemy);
                if (enemy instanceof Endboss && this.ifEndbossAlive(number)) {//if endboss dead no collision
                    this.collisionEndboss(i, number);
                }
                else if (this.ifEnemyAlive(number)) { //if enemy dead no collision
                    this.collisionEnemy(i, number);
                }
                console.log('bubble hit');
            }
        });
    }

    ifEndbossAlive(number) {
        return this.level.enemies[number].energyEndboss > 0;
    }

    collisionEndboss(i, number) {
        this.level.enemies[number].hitEndboss(i);
        console.log(this.level.enemies[number].energyEndboss);
        this.throwableObjects.splice(this.throwableObjects[i], 1);
    }

    ifEnemyAlive(number) {
        return this.level.enemies[number].energyEnemie > 0;
    }

    collisionEnemy(i, number) {
        this.level.enemies[number].hitEnemie();
        this.throwableObjects.splice(this.throwableObjects[i], 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas
        this.ctx.translate(this.camera_x, 0);//Forward
        this.addMovableObjects(); // add movable objects //
        this.ctx.translate(-this.camera_x, 0);//Back
        this.drawfixedObjects();// add fixed objects here //
        // draw is used again. Doesn't work directly. Therefor "self" is integrated
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addMovableObjects() {
        this.addObject(this.level.backgroundObjects);
        this.addObject(this.level.barriers);
        this.addToMap(this.character);
        this.addObject(this.level.enemies);
        this.addObject(this.throwableObjects);
        this.addObject(this.level.coinImg);
        this.addObject(this.level.poisonImg);
    }

    drawfixedObjects() {
        this.addObject(this.level.statusbar);
        this.ctx.translate(this.camera_x, 0);//Forward
        this.setWorld(this.keyboard);
        this.ctx.translate(-this.camera_x, 0);//Backward
        if (this.ifWin()) {
            this.addToMap(this.win);
        }
        if (this.ifLose()) {
            this.addToMap(this.lose);
        }
    }

    ifWin() {
        return this.level.enemies[7].energyEndboss == 0;
    }

    ifLose() {
        return this.character.energy == 0;
    }

    addObject(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    setWorld() {
        this.character.world = this;
    }

    flipImage(mo) {         // flip image if mo is changing direction
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {     // flip image if mo is changing direction again
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}