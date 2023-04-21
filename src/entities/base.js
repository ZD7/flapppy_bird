
class Entity {
  constructor({x, y, width, height, frames, spriteSheet, canvas, game, pipe, fg, fly_audio}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = 0
    this.falling = false

    this._frames = frames
    this._frameIdx = 0
    this._spriteSheet = spriteSheet
    this._canvas = canvas
    this._context = canvas.getContext("2d")
    this._game = game
    // this.image = this._frames[this._frameIdx]
    this.pipe = pipe
    this.fg = fg
    this.fly_audio = fly_audio
  }

  draw() {
    this.image = this._frames[this._frameIdx]
    this._context.drawImage(this._spriteSheet, this.image.x, this.image.y, 
      this.image.w, this.image.h, this.x, this.y, this.width, this.height);
  }

  update(delta) {
    this._frameIdx = (this._frameIdx + Math.ceil(delta*150)) % this._frames.length;
  }

  clear() {
      // super.clear()
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }

}

