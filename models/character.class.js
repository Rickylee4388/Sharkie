/**
 * creates character (Sharkie) 
 */

class Character extends MovableObject {
    speed = 5;
    height = 250;
    width = 250;
    y = 250;

    IMAGES_WALKING = [
        'Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_STANDING = [
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/2.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/3.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/4.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/5.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/6.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/7.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/8.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/9.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/10.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/11.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/12.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/13.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/14.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/15.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/16.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/17.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_DEAD = [
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/4.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/5.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/6.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/7.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/8.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/9.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/10.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/11.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    IMAGES_HURT = [
        'Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];

    IMAGES_ATTACK_BUBBLE = [
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png',
        'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png',
    ];

    world;
    deadsound = true;

    constructor() {
        super().loadImage('Alternative Grafiken - Sharkie/1.Sharkie/3.Swim/1.png');
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    }

    /**
     * loads images
     */

    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    }

    /**
     * plays images as animation
     */

    animate() {
        this.fastAnimation();
        this.slowAnimation(); 
        this.attackAnimation(); 
    }
    
    /**
     * plays images as animation interval is faster to make the animation look smooth
     * intervall 1000/60 (16,67)
     */

    fastAnimation() {
        setInterval(() => {
            walking_sound.pause();
            this.blocked();
            this.move();
            this.jumpAnimation();
            this.world.camera_x = -this.x;
        }, 1000 / 60);
    }
    
    /**
     * plays images as animation interval is slower to make the animation look smooth
     * interval 150
     */

    slowAnimation() {
        let i = 0;
        setInterval(() => {
            if (this.isDead()) {
                this.dead(i);                               //Dead animation
                i++;
            }
            else if (this.isHurt()) {
                hurt_sound.play();
                this.playAnimation(this.IMAGES_HURT);        //Hurt animation
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);     //Walk animation
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_STANDING);    //Stand still animation
            }
            else {
                this.playAnimation(this.IMAGES_STANDING);    //Stand still animation
            }
        }, 150);
    }

    /**
     * plays images as animation for whale attack
     * intervall 50
     */

    attackAnimation() {
        setInterval(() => {
            if (this.world.keyboard.D) {
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE);  //attack animation
            }
        }, 50);
    }

    /**
     * lets character move left or right by pressing buttons
     * 
     */

    move() {        
        if (this.isFreeToMoveRightAndAlive()) {
            this.moveRight();
            walking_sound.play();
        }
        else if (this.isFreeToMoveLeftAndAlive()) {
            this.moveLeft();
            this.otherDirection = true;
            walking_sound.play();
        }
    }

    /**
     * @returns if anything is in the way of character and if character is alive
     * 
     */

    isFreeToMoveRightAndAlive() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead() && this.isBlocked == false;
    }
    
    /**
     * @returns if anything is in the way of character and if character is alive
     * 
     */

    isFreeToMoveLeftAndAlive() {
        return this.world.keyboard.LEFT && this.x > 0 && !this.isDead() && this.isBlocked == false;
    }

    /**
     * Character is blocked by Barrier and bounces back if hits barrier
     * 
     */

    blocked() {     
        if (this.hitsBarrierMovingRight()) {
            this.x -= 12; //bounce back
            this.playAnimation(this.IMAGES_HURT);
        }
        else if (this.hitsBarrierMovingLeft()) {
            this.x += 12;//bounce back
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * 
     * @returns if character is blocked on the right side
     */

    hitsBarrierMovingRight() {
        return this.isBlocked == true && this.world.keyboard.RIGHT;
    }
    
    /**
     * 
     * @returns if character is blocked on the left side
     */
    
    hitsBarrierMovingLeft() {
        return this.isBlocked == true && this.world.keyboard.LEFT;
    }

    /**
     * character swims upwards if button is pressed
     * 
     */

    jumpAnimation() {
        if (this.world.keyboard.UP && this.isOnTop() && !this.isDead()) {
            this.jump();
        }
    }

    /**
     * character swims upsidedown to the top
     * dead animation played
     * dead sound played
     * @param {i} number counting intervals to change images
     * 
     */

    dead(i) { //Character is dead
        if (i < 9) { // Play transformation from alive to dead
            if (this.deadsound == true) {
                dead_sound.play();
            }
            this.deadsound = false;
            this.playAnimation(this.IMAGES_DEAD);
        }
        else {  // Dead Sharkie floating to top
            this.loadImage('Alternative Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/12.png');
            this.speed = 0;
            this.speedY = 2;
            this.y -= this.speedY;
        }
    }
}
