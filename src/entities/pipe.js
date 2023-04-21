class Pipe {
    constructor({width, spriteSheet, pipeMove, drawEngine, gap, canvas, game, bird, fg, score, score_audio}) {
        this.width = width
        this.spriteSheet = spriteSheet
        this.pipeMove = pipeMove
        this._drawEngine = drawEngine
        this._gap = gap
        this._canvas = canvas
      
        this._game = game
        this.bird = bird
        this.fg = fg
        this.score = score
        this.score_audio = score_audio
    }
  
    draw() {
        for (let i=0; i< this.pipeMove.length; i++) {

            if (this.bird.y < 0 || this.bird.y + this.bird.height >= this._game.height - this.fg.height
                || this.bird.x + this.bird.width >= this.pipeMove[0].x
                && (this.bird.y <= this.pipeMove[0].y + this.spriteSheet.up.height
                ||  this.bird.y + this.bird.height >= this.pipeMove[0].y + this.spriteSheet.up.height + this._gap)
                ) {

                this._game.gameOver()
                return false;
                // break;
            }

            this._drawEngine.drawImage(this.spriteSheet.up, this.pipeMove[i].x, this.pipeMove[i].y)
            this._drawEngine.drawImage(this.spriteSheet.bottom, this.pipeMove[i].x, this.pipeMove[i].y+this.spriteSheet.up.height + this._gap)

            this.pipeMove[i].x -= 1

            if (this.pipeMove[i].x == 125) {
                this.pipeMove.push({
                    x : this.width,
                    y : Math.floor(Math.random() * this.spriteSheet.up.height) - this.spriteSheet.up.height
                });
            }

            if (this.pipeMove[i].x + this.spriteSheet.up.width == this.bird.x) {
                this.pipeMove.shift();
                this.score += 1;
                this.score_audio.play()
            }
        }
    }
}