class DrawEngine {
    drawImage({ spriteSheet, image, x, y, width, height }) {}
    clear() {}
}

class CanvasDrawEngine {
    constructor({ canvas }) {
        // super()
        this._canvas = canvas
        this._context = canvas.getContext("2d")
    }

    // drawImage({spriteSheet, image, x, y, width, height }) {
    drawImage(spriteSheet, dx=0, dy=0) {
        // super.drawImage({ spriteSheet, image, x, y, width, height })
        // console.log(typeof images[this.spriteCostumeCount])
        // console.log("spriteSheet1", spriteSheet)
        // console.log("image1", image)
        // this._context.drawImage(spriteSheet, image.x, image.y, image.w, image.y, x, y, width, height);
        this._context.drawImage(spriteSheet, dx, dy);
    }

    clear() {
        // super.clear()
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }
}