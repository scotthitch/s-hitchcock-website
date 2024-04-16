import P5 from 'p5'

class Ball {
    p5Instance: P5
    r: number
    xPos: number
    yPos: number
    xVel: number
    yVel: number
    yAcc: number
    colours: string[]
    index: number
    colour: string

    constructor(p5Instance: P5, xPos: number, yPos: number, gravDir: number) {
        this.p5Instance = p5Instance
        this.r = p5Instance.random(5, 10)
        this.xPos = xPos
        this.yPos = yPos
        this.xVel = p5Instance.random(-1.1, 1.1)
        if (gravDir > 0) {
            this.yVel = p5Instance.random(0, -2)
        } else {
            this.yVel = p5Instance.random(0, 1)
        }
        this.yAcc = 0.1 * gravDir

        this.colours = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']
        this.index = p5Instance.floor(p5Instance.random(0, this.colours.length))
        this.colour = this.colours[this.index]
    }

    move() {
        this.yVel += this.yAcc
        this.xPos += this.xVel
        this.yPos += this.yVel
    }

    render() {
        this.p5Instance.noStroke()
        this.p5Instance.fill(this.colour)
        this.p5Instance.ellipse(this.xPos, this.yPos, this.r)
    }
}

export default Ball
