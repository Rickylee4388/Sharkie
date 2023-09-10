class ThrowableObject extends MovableObject {
    IMAGE;
    IMAGE_BUBBLE = 'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    IMAGE_POISON = 'Alternative Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';
    percentage;
    

    constructor(x, y, percentage) {
        super();
        this.loadFloatingObjects(percentage);
        this.setProperties(x, y);
        this.throw();
    }

    setProperties(x, y){
        if (world.character.otherDirection == true) {
            this.x = x - 200;
        }
        else {
            this.x = x;
        }
        this.y = y;
    }

    loadFloatingObjects(percentage){
        if (percentage == 0) {
            this.loadFloatingPoison();
        }
        else {
            this.loadFloatingCoin();
        }
    }

    loadFloatingPoison() {
        this.loadImage(this.IMAGE_POISON);
        this.IMAGE = this.IMAGE_POISON;
        this.height = 80;
        this.width = 80;
    }

    loadFloatingCoin() {
        this.loadImage(this.IMAGE_BUBBLE);
        this.IMAGE = this.IMAGE_BUBBLE;
        this.height = 50;
        this.width = 50;
    }

    throw() {
        this.speedY = 5;
        this.acceleration = 1;
        this.applyGravity();
        bubble_sound.play();
        this.setThrowDirection();
    }

    setThrowDirection(){
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

