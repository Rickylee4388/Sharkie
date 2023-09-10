class Coin extends MovableObject{
    IMAGES_COINS_FLOAT = [
        'Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/2.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/4.png'
    ]

    constructor(x){
        super().loadImage('Alternative Grafiken - Sharkie/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_COINS_FLOAT);
        this.animate();
        this.x = x;
        this.y = 150 - Math.random()*100;
        this.height = 50;
        this.width = 50;

    }
    animate(){
        setInterval(()=>{
        this.playAnimation(this.IMAGES_COINS_FLOAT);
        },100);
    }    
}