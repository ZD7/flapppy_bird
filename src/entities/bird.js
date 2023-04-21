class Bird extends Entity {
    constructor( params ) {
        super(params)
        this._flapSpeed = params.flapSpeed
        this._physicsEngine = params.physicsEngine
        this.falling = true
    }

    update(delta) {
        super.update(delta)

        this._physicsEngine.update(this, delta)
    }

    flap() {
        this.speed = -this._flapSpeed
        this.fly_audio.play()
    }
}