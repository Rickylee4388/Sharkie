class DrawableObject{
    img;
    imageChache ={};
    currentImage = 0;
    x=0;
    y=0;
    height = 400;
    width = 400;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChache[path] = img;
        });
    }

    draw(ctx){
        try{ ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e){
            console.warn('Error loading Image', e);
            console.log('Could not load' , this.img.src);
        }
       
    }

    drawBorder(ctx){ //drwas a square around Movable Objects 
        if(this instanceof Enemy || this instanceof Barrier || this instanceof ThrowableObject || this instanceof Jellyfish||this instanceof EnemyRed){
            ctx.beginPath();
            ctx.linewidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        else if(this instanceof Character){
            ctx.beginPath();
            ctx.linewidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x+50, this.y+120, this.width-60, this.height-160);
            ctx.stroke();
            }
        else if(this instanceof Endboss){
            ctx.beginPath();
            ctx.linewidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x+30, this.y+170, this.width-100, this.height-220);
            ctx.stroke();
            }
        
    }
}