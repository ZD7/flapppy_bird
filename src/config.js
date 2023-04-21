class Config {
    gravity = 200

    canvas = {
        id: 'game',
        width: 288,
        height: 512,
    }

    spritesheet = {
        width: 606,
        height: 428,
        src: 'assets/img/spritesheets.png',
    }

    pipeMove = [{
        x: 200,
        y: 0
    }]

    gap = 90

    score = 0

    bird = {
        x: 50,
        y: 100,
        width: 34, 
        height: 26,

        // src: '../assets/bird.png',
        flapSpeed: 100,
        
        frames: [
            {
                x: 276,
                y: 112,
                w: 34,
                h: 26,
            },
            {
                x: 276,
                y: 139,
                w: 34,
                h: 26,
            },
            {
                x: 276,
                y: 164,
                w: 34,
                h: 26,
            },
            {
                x: 276,
                y: 139,
                w: 34,
                h: 26,
            },
        ]
    }
}
