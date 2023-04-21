class Game {
    constructor() {
        this._config = new Config()
        
        this._canvas = document.getElementById(this._config.canvas.id)
        this._canvas.width = this._config.canvas.width
        this._canvas.height = this._config.canvas.height

        this._context = this._canvas.getContext("2d")


        this.fly_audio = new Audio()
        this.score_audio = new Audio()

        this.fly_audio.src = "assets/audio/fly.mp3"
        this.score_audio.src = "assets/audio/score.mp3"

        this.height = this._config.canvas.height
        this.width = this._config.canvas.width

        this._drawEngine = new CanvasDrawEngine({canvas: this._canvas})
        this._physicsEngine = new PhysicsEngine({ gravity: this._config.gravity}) 
        this._resourceLoader = new ResourceLoader()
        this._inputHandler = new MouseInputHandler({
            left: ({ x, y }) => {
                this._bird.flap()
            },
        })

        this.gap = this._config.gap
        this.score = this._config.score

    }

    async prepare() {

        this._bg = new Image()
        this._fg = new Image()
        this._pipeUp = new Image()
        this._pipeBottom = new Image()

        this._bg.src = "assets/img/bg.png"
        this._fg.src = "assets/img/fg.png"
        this._pipeUp.src = "assets/img/pipeUp.png"
        this._pipeBottom.src = "assets/img/pipeBottom.png"

        this._spriteSheet = new Image(this._config.spritesheet.width, this._config.spritesheet.height)
        this._spriteSheet.src = this._config.spritesheet.src 


        // this._spriteSheet = this._resourceLoader.load({
        //     type: RESOURCE_TYPE.IMAGE,
        //     src: this._config.spritesheet.src,
        //     width: this._config.spritesheet.width,
        //     height: this._config.spritesheet.height,
        // })
    }

    reset() {
        // this.score = 0

        
        this._bird = new Bird({
            x: this._config.bird.x,
            y: this._config.bird.y,
            width: this._config.bird.width,
            height: this._config.bird.height,
            frames: this._config.bird.frames,
            spriteSheet: this._spriteSheet,
            flapSpeed: this._config.bird.flapSpeed,
            physicsEngine: this._physicsEngine,
            game: this,
            canvas: this._canvas,
            fly_audio: this.fly_audio
        })

        this.pipe = new Pipe({
            width: this.width,
            spriteSheet: {
                up: this._pipeUp,
                bottom: this._pipeBottom,
            },
            pipeMove: this._config.pipeMove,
            drawEngine: this._drawEngine,
            gap: this.gap,
            
            canvas: this._canvas,
            game: this,
            bird: this._bird,
            fg: this._fg,
            score: this.score,
            score_audio: this.score_audio,
        })

        this._context.fillStyle = "rgb(10, 66, 114)"
        this._context.font = "28px Verdana"
    }

    update(delta) {
        this._bird.update(delta)

        // this._pipe.update(this._pipe)
    }

    draw() {
        // this._drawEngine.drawImage({spriteSheet: this._spriteSheet})
        this._drawEngine.drawImage(this._bg)

        this.pipe.draw()
        
        this._drawEngine.drawImage(this._fg, 0, this.height - this._fg.height)
        this._context.fillText(`Current score: ${this.pipe.score}`, 15, this._canvas.height - 65)
        this._context.fillText(`Best score: ${this.bestScore}`, 15, this._canvas.height - 25)

        if (this._playing) {
            this._bird.draw()
        }
    
    }

    _loop() {
        const now = Date.now()
        const delta = now - this._lastUpdate

        if (this._playing) {

            this.update(delta/800.0)
            this._bird.clear()  

            this.draw()
            this._lastUpdate = now

            requestAnimationFrame(this._loop.bind(this))
        }
    }

    start() {
        this._playing = true
        this._inputHandler.subscribe()
        this._lastUpdate = Date.now()
        this.reset()
        this._loop()
        this.bestScore = localStorage.getItem("bestScore") === null ? this.score : localStorage.getItem("bestScore")
    }

    gameOver() {
        this._playing = false

        if (this.bestScore < this.pipe.score) {
            localStorage.setItem("bestScore", this.pipe.score)
            bestScore = localStorage.getItem("bestScore")
        }
        document.getElementsByClassName('replay')[0].classList.toggle("hidden")
    }
 }
