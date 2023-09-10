class EnemyRed extends MovableObject {
    energyEnemie = 100;
    IMAGES_WALKING = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];
    IMAGES_TRANSITION_GREEN = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png',
    ]
    IMAGES_HURTONCE = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png'
    ];
    IMAGES_DEAD = [
        'Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png'
    ];
    enemiedeadsound = true;
    


    constructor() {
        super().loadImage('Alternative Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadAllImages();
        this.animate();
        this.setStartPosition();
        this.setProperties();
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_TRANSITION_GREEN);
        this.loadImages(this.IMAGES_HURTONCE);
        this.loadImages(this.IMAGES_DEAD);
    }

    setProperties() {
        this.height = 80;
        this.width = 80;
    }

    setStartPosition() {
        this.x = 600 + Math.random() * 1400;
        this.y = 380 - Math.random() * 100;
    }

    animate() {
        this.moveInterval();
        this.statusAnimation();
    }

    moveInterval() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    statusAnimation() {
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

    enemieHitOnceAnimation(i) {
        if (i < 5) {
            this.playAnimation(this.IMAGES_TRANSITION_GREEN); //transition to big fish
            this.speed = 0;

        }
        else {
            this.playAnimation(this.IMAGES_HURTONCE); //big fish animation
            this.speed = 0.15 + Math.random() * 1.5;
        }
    }

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

    swimAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
    }
}

