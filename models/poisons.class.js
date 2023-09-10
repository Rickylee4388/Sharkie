class Poison extends MovableObject{
    IMAGES_POISON_FLOAT = [
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/1.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/2.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/4.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/5.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/6.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/7.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/8.png'
    ]

    constructor(x){
        super().loadImage('Alternative Grafiken - Sharkie/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES_POISON_FLOAT);
        this.animate();
        this.x = x;
        this.y = 170 - Math.random()*120;
        this.height = 50;
        this.width = 50;
    }
    
    animate(){
        setInterval(()=>{
        this.playAnimation(this.IMAGES_POISON_FLOAT);
        },100);
    }    
}