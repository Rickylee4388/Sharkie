/**
 * creates lost screen
 */

class Lose extends MovableObject{

    width = 300;
    height = 100;

    constructor(){
        super();
        this.loadImage('Alternative Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 12.png');
        this.x = 200;
        this.y = 200;
    }

}