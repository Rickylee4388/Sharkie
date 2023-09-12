/**
 * creates and draws drawable objects
 */

class DrawableObject {
    img;
    imageChache = {};
    currentImage = 0;
    x = 0;
    y = 0;
    height = 400;
    width = 400;

    /**
     * loads one image from path
     * @param {Image} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads different images from array
     * @param {Array} arr array contains different paths
     * @param {Image} path path loaded from array
     */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageChache[path] = img;
        });
    }

    /**
     * 
     * @param {Object} ctx draw images in canvas
     */

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading Image', e);
            console.log('Could not load', this.img.src);
        }

    }

    /**
     * draw square border around images in canvas
     * @param {Object} ctx 
     */

    drawBorder(ctx) { 
        if (this instanceof Enemy || this instanceof Barrier || this instanceof ThrowableObject || this instanceof Jellyfish || this instanceof EnemyRed) {
            ctx.beginPath();
            ctx.linewidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        else if (this instanceof Character) {
            ctx.beginPath();
            ctx.linewidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 50, this.y + 120, this.width - 60, this.height - 160);
            ctx.stroke();
        }
        else if (this instanceof Endboss) {
            ctx.beginPath();
            ctx.linewidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 30, this.y + 170, this.width - 100, this.height - 220);
            ctx.stroke();
        }

    }
}