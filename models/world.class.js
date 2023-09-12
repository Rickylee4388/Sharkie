/**
 * creates world
 */

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

    /**
     * loads canvas and draws objects
     * @param {canvas} canvas 
     */

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();
    }

    /**
     * runs the intervals for the game
     */

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

    /**
     * 
     * @returns if throwable objects exist in ctx
     */

    throwableObjectsExist() {
        return this.throwableObjects.length > 0
    }

    /**
     * checks how long ago last bubble was thrown
     * only possible every 500ms
     * 
     * if not thrown for 500ms new bubble will be created
     * else nothing happens
     * @returns back to main function
     */

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

    /**
     * only three poison bubbles are given
     * if used up normal bubbles will be thrown
     * statusbar of poison will be set to zero
     */

    checkIfPoisonBubblesLeft() {
        if (this.amountPoisonBubbles > 0 && this.character.poisonBar == 0) { //if Poisonbubbles left reduce by one
            this.amountPoisonBubbles--
        }
        if (this.amountPoisonBubbles == 0 && this.character.poisonBar == 0) {//if no Poisonbubbles left reset Poisonbar
            this.character.poisonBar = 100;
            this.level.statusbar[2].setPercentage(this.character.poisonBar); // setPercentage of poison  -  statusbar[1]
        }
    }

    /**
     *  new bubble is generated an add to array
     */

    createNewBubble() {
        this.bubble = new ThrowableObject(this.character.x + 200, this.character.y + 70, this.character.poisonBar);
        this.throwableObjects.push(this.bubble);
    }

    /**
     * checks if character is hit by enemie
     * set percentage of character if is hit
     * 
     */

    checkCollision() {
        this.level.enemies.forEach((enemy) => { // check if character touches any of all enemies
            let number = this.level.enemies.indexOf(enemy);
            if (this.ifNormalEnemy(enemy, number) || this.ifEndboss(enemy, number)) {
                this.character.hit();
                this.level.statusbar[1].setPercentage(this.character.energy); // setPercentage of life of character -  statusbar[1]
            }
        });
    }

    /**
     * 
     * @param {class} enemy 
     * @param {number} number of enemie in array
     * @returns true/false
     */

    ifNormalEnemy(enemy, number) {
        return this.character.isColliding(enemy) && this.level.enemies[number].energyEnemie > 0;
    }

    /**
     * 
     * @param {class} enemy 
     * @param {number} number of enemie in array
     * @returns true/false
     */

    ifEndboss(enemy, number) {
        return this.character.isColliding(enemy) && this.level.enemies[number].energyEndboss > 0
    }

    /**
     * check if character hits floating object. 
     * Deletes this object and sets Statusbar
     * 
     * @param {string} a image path 
     * @param {string} c coin/poison
     */

    checkCollisionCoinsAndPoison(a, c) {
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

    /**
     * check if character hits barrier
     */

    checkCollisionBarrier() {
        this.level.barriers.forEach((barrier) => {
            if (this.character.isColliding(barrier)) {
                this.character.isBlocked = true;
            }
            else {
                this.character.isBlocked = false;
            }
        });
    }

    /**
     * check if bubble hits enemie/endboss
     * if endboss dead no collision
     * if enemy dead no collision
     * 
     */

    checkCollisionBubble() {
        let i = this.throwableObjects.length - 1;
        let throwableObject = this.throwableObjects[i];
        this.level.enemies.forEach((enemy) => {
            if (throwableObject.isColliding(enemy)) {
                let number = this.level.enemies.indexOf(enemy);
                if (enemy instanceof Endboss && this.ifEndbossAlive(number)) {
                    this.collisionEndboss(i, number);
                }
                else if (this.ifEnemyAlive(number)) {
                    this.collisionEnemy(i, number);
                }
            }
        });
    }

    /**
     * is endboss alive
     * @param {number} number of enemie in array
     * @returns true /false 
     */

    ifEndbossAlive(number) {
        return this.level.enemies[number].energyEndboss > 0;
    }

    /**
     * 
     * @param {number} i number of position in array throwableobjects
     * @param {number} number of position in array enemies
     */

    collisionEndboss(i, number) {
        this.level.enemies[number].hitEndboss(i);
        this.throwableObjects.splice(this.throwableObjects[i], 1);
    }

    /**
   * is enemie alive
   * @param {number} number of enemie in array
   * @returns true /false 
   */

    ifEnemyAlive(number) {
        return this.level.enemies[number].energyEnemie > 0;
    }

    /**
     * 
     * @param {number} i number of position in array throwableobjects
     * @param {number} number of position in array enemies
     */

    collisionEnemy(i, number) {
        this.level.enemies[number].hitEnemie();
        this.throwableObjects.splice(this.throwableObjects[i], 1);
    }

    /**
     * draws canvas
     * draws all images in canvas 
     * 
     */

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

    /**
     * adds all movable objects to canvas
     */

    addMovableObjects() {
        this.addObject(this.level.backgroundObjects);
        this.addObject(this.level.barriers);
        this.addToMap(this.character);
        this.addObject(this.level.enemies);
        this.addObject(this.throwableObjects);
        this.addObject(this.level.coinImg);
        this.addObject(this.level.poisonImg);
    }

    /**
     * adds all fixed objects to canvas
     */

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

    /**
     * if game win
     * @returns true
     */

    ifWin() {
        return this.level.enemies[7].energyEndboss == 0;
    }

    /**if game lost
     * @returns true
     */ 

    ifLose() {
        return this.character.energy == 0;
    }

    /**
     * 
     * @param {*} objects 
     */
    addObject(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * 
     * @param {class} mo draws movable objects like character or enemie
     * if borders around objects should be drawn uncomment mo.drawborder(this.ctx)
     */

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawBorder(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    
    /**
     * Doesn't work directly. Therefor "this" is integrated
    */

    setWorld() {
        this.character.world = this;
    }

    /**
     * flip image if mo is changing direction
     * @param {class} mo (character)
     */

    flipImage(mo) {        
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * flip image if mo is changing direction again
     * @param {class} mo (character)
     */

    flipImageBack(mo) {    
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}