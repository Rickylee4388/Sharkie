class StatusBar extends DrawableObject{
    y = 0;
    type;
    IMAGES = [];
    IMAGES_LIFE = [
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Life/0_  copia 3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Life/20_ copia 4.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Life/40_  copia 3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Life/60_  copia 3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Life/80_  copia 3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    IMAGES_COIN = [
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Coin/100_ copia 4.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Coin/80_  copia 4.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Coin/60_  copia 4.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Coin/40_  copia 4.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Coin/20_  copia 2.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/Coin/0_  copia 4.png'
    ];

    IMAGES_POISON = [
        'Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'Alternative Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/0_ copia 2.png'
    ];
    percentage = 100;

    constructor(a){
        super();
        if(a == 'coin'){
            this.loadCoinBar();
        }
        else if(a == 'life'){
            this.loadLifeBar();
        }
        else if(a == 'poison'){
            this.loadPoisonBar();
        }
        this.setPercentage(100);
        this.x = 10;      
        this.height = 40;
        this.width = 150;  
    }

    loadCoinBar(){
        this.IMAGES = this.IMAGES_COIN;
        this.y = 50;
        this.loadImages(this.IMAGES_COIN);
    }

    loadLifeBar(){
        this.IMAGES = this.IMAGES_LIFE;
        this.y = 10;
        this.loadImages(this.IMAGES_LIFE);
    }

    loadPoisonBar(){
        this.IMAGES = this.IMAGES_POISON;
        this.y = 100;
        this.loadImages(this.IMAGES_POISON);
    }

    setPercentage(percentage){ // setPercentage(50) example
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img =this.imageChache[path];
    }

    resolveImageIndex(){
        if(this.percentage ==100){
            return 5;
        }
        else if (this.percentage >=80){
            return 4;
        }
        else if (this.percentage >=60){
            return 3;
        }
        else if (this.percentage >=40){
            return 2;
        }
        else if (this.percentage >=20){
            return 1;
        }
        else {
            return 0;
        }
    }
}