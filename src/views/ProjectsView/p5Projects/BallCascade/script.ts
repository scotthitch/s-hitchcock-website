import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '@/types'
import Ball from './Ball'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        const BACKGROUND_COLOUR = 0
        const MAX_NUMBER_BALLS = 250
        const balls: Ball[] = []
        let gravity = 0.1

        // Setup the canvas
        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
        }

        // Redraw the canvas on every iterations
        p5Instance.draw = () => {
            p5Instance.background(BACKGROUND_COLOUR)

            // If the mouse is at (0,0) this indicates the sketch likely hasn't been interacted with yet
            if (p5Instance.mouseX == 0 && p5Instance.mouseY == 0) {
                // So do nothing and return
                return
            }

            const mousePosition = p5Instance.createVector(p5Instance.mouseX, p5Instance.mouseY)
            balls.push(new Ball(p5Instance, mousePosition, gravity))
            for (const ball of balls) {
                ball.move()
                ball.render()
            }

            if (balls.length > MAX_NUMBER_BALLS) {
                balls.splice(0, 1)
            }
        }

        p5Instance.mousePressed = () => {
            gravity *= -1
        }
    }
    return script
}

export default scriptWrapper
