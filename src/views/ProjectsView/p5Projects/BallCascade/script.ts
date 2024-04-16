import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '@/types'
import Ball from './Ball'

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
                balls.push(new Ball(p5Instance, p5Instance.mouseX, p5Instance.mouseY, gravDir))
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
    }
    return script
}

export default scriptWrapper
