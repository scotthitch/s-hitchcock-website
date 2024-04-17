import P5 from 'p5'
import selectRandomElementFromArray from '@/helpers/selectRandomElementFromArray'

const COLOURS = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']
const MIN_BALL_RADIUS = 5
const MAX_BALL_RADIUS = 10
const INITIAL_VELOCITY_X = 1.1
const INITIAL_VELOCITY_Y = 2

class Ball {
    p5Instance: P5
    r: number

    position: P5.Vector
    velocity: P5.Vector
    acceleration: P5.Vector
    colour: string

    constructor(p5Instance: P5, position: P5.Vector, gravity: number) {
        this.p5Instance = p5Instance
        this.r = p5Instance.random(MIN_BALL_RADIUS, MAX_BALL_RADIUS)

        // Set position
        this.position = position

        // Set initial velocity
        this.velocity = p5Instance.createVector(
            p5Instance.random(-INITIAL_VELOCITY_X, INITIAL_VELOCITY_X),
            p5Instance.random(-INITIAL_VELOCITY_Y, INITIAL_VELOCITY_Y)
        )

        // Set acceleration only in y direction (assume unit mass)
        this.acceleration = p5Instance.createVector(0, gravity)

        // Set a random ball colour
        this.colour = selectRandomElementFromArray(COLOURS)
    }

    move() {
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
    }

    render() {
        this.p5Instance.noStroke()
        this.p5Instance.fill(this.colour)
        this.p5Instance.ellipse(this.position.x, this.position.y, this.r)
    }
}

export default Ball
