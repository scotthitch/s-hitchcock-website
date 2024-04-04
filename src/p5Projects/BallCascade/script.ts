import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '../../types'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        const BACKGROUND_COLOUR = 0
        const balls: Ball[] = []
        let gravDir = 1

        // Setup the canvas
        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
        }

        // Redraw the canvas on every iteration
        p5Instance.draw = () => {
            p5Instance.background(BACKGROUND_COLOUR)
            if (!(p5Instance.mouseX == 0 && p5Instance.mouseY == 0)) {
                balls.push(new Ball(p5Instance.mouseX, p5Instance.mouseY, gravDir))
                for (const ball of balls) {
                    ball.move()
                    ball.render()
                }

                if (balls.length > 100) {
                    balls.splice(0, 1)
                }
            }
        }

        p5Instance.mousePressed = () => {
            gravDir *= -1
        }

        class Ball {
            r: number
            xPos: number
            yPos: number
            xVel: number
            yVel: number
            yAcc: number
            colours: string[]
            index: number
            colour: string

            constructor(xPos: number, yPos: number, gravDir: number) {
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
                p5Instance.noStroke()
                p5Instance.fill(this.colour)
                p5Instance.ellipse(this.xPos, this.yPos, this.r)
            }
        }
    }
    return script
}

export default scriptWrapper
