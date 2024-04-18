import P5 from 'p5'

const CHILD_OPACITY_FADE_RATE = 2.5

class Missile {
    p5Instance: P5
    position: P5.Vector
    velocity: P5.Vector
    explodeCountdown: number
    mass: number
    opacity: number
    willFade: boolean
    colour: string

    constructor(
        p5Instance: P5,
        initialPosition: P5.Vector,
        initialVelocity: P5.Vector,
        explodeTime: number,
        mass: number,
        willFade: boolean,
        colour: string
    ) {
        this.p5Instance = p5Instance
        this.position = initialPosition
        this.velocity = initialVelocity
        this.explodeCountdown = explodeTime
        this.mass = mass
        this.colour = colour
        this.willFade = willFade
        this.opacity = 255
    }

    fly(gravity: P5.Vector) {
        const acceleration = gravity.copy().mult(this.mass)
        this.velocity.add(acceleration)
        this.position.add(this.velocity)
        this.explodeCountdown--

        if (this.willFade) {
            this.opacity -= CHILD_OPACITY_FADE_RATE
        }
    }

    hasFaded() {
        return this.opacity < 0
    }

    readyToExplode() {
        return this.explodeCountdown <= 0
    }

    belowScreenBottom(screenBottom: number) {
        return this.position.y > screenBottom
    }

    draw() {
        this.p5Instance.noStroke()
        const colour = this.p5Instance.color(this.colour)
        colour.setAlpha(this.opacity)
        this.p5Instance.fill(colour)
        this.p5Instance.ellipse(this.position.x, this.position.y, 5)
    }
}

export default Missile
