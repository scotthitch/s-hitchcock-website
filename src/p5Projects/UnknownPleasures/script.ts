import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        const ONE_OVER_ROOT_2_PI = 1 / Math.sqrt(Math.PI)

        const DRAWING_WIDTH = p5.max(screenDimensions.width * 0.45, 300)
        const X_LEFT_DRAWING_BOUNDS = (screenDimensions.width - DRAWING_WIDTH) / 2
        const X_RIGHT_DRAWING_BOUNDS = screenDimensions.width - X_LEFT_DRAWING_BOUNDS

        const DRAWING_HEIGHT = p5.max(screenDimensions.height * 0.7, 100)
        // const HEIGHT_DRAWING_PERCENTAGE = 0.7; // as a percantage of screen height
        const Y_TOP_DRAWING_BOUNDS = (screenDimensions.height - DRAWING_HEIGHT) / 2

        // const Y_TOP_DRAWING_BOUNDS = screenDimensions.height * ((1-HEIGHT_DRAWING_PERCENTAGE)/2);;
        const Y_BOTTOM_DRAWING_BOUNDS = screenDimensions.height - Y_TOP_DRAWING_BOUNDS

        const N_LINES = 100
        const Y_STEP = (Y_BOTTOM_DRAWING_BOUNDS - Y_TOP_DRAWING_BOUNDS) / (N_LINES - 1)
        const X_STEP = (X_RIGHT_DRAWING_BOUNDS - X_LEFT_DRAWING_BOUNDS) / 100
        const MAX_STANDARD_DEVIATION = screenDimensions.width * 0.05
        const MIN_STANDARD_DEVIATION = screenDimensions.width * 0.01
        const magn = 600

        let mu = 0
        let previousMu = mu
        let standardDeviation = 0
        let previousStandardDeviation = standardDeviation
        let scriptIsLooping = 1

        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height)
            p5.strokeWeight(p5.height / 350)
            rendarLines()
        }

        function rendarLines() {
            p5.background(0)
            // p5.background(0, 32, 63);
            for (let j = Y_TOP_DRAWING_BOUNDS; j <= Y_BOTTOM_DRAWING_BOUNDS; j += Y_STEP) {
                const y1 = j
                const x1 = X_LEFT_DRAWING_BOUNDS

                p5.beginShape()

                p5.curveVertex(x1, y1)
                let xVal = 0
                let yVal = 0
                for (let i = X_LEFT_DRAWING_BOUNDS; i <= X_RIGHT_DRAWING_BOUNDS; i += X_STEP) {
                    yVal = deltaY(i) + j
                    xVal = i
                    p5.fill(0)
                    // p5.noFill()

                    p5.curveVertex(xVal, yVal)
                    p5.stroke(255)

                    // if (p5.random() < 0.7) {
                    //     p5.stroke(173, 232, 244);
                    // } else {
                    //     p5.stroke(72, 202, 228)
                    // }
                }
                p5.curveVertex(xVal, yVal)
                p5.endShape()
            }
        }

        p5.draw = () => {
            mu = p5.mouseX
            if (mu != previousMu) {
                handleMuChange()
            }

            standardDeviation = p5.map(
                p5.mouseY,
                Y_TOP_DRAWING_BOUNDS,
                Y_BOTTOM_DRAWING_BOUNDS,
                MIN_STANDARD_DEVIATION,
                MAX_STANDARD_DEVIATION,
                true
            )
            if (standardDeviation != previousStandardDeviation) {
                handleStandardDeviationChange()
            }
        }

        const handleMuChange = () => {
            previousMu = mu
            rendarLines()
        }

        const handleStandardDeviationChange = () => {
            previousStandardDeviation = standardDeviation
            rendarLines()
        }

        function deltaY(x: number) {
            let sign = -1
            if (Math.random() > 0.5) {
                sign *= 1
            }
            const power = Math.exp(
                -((x - mu) * (x - mu)) / (2 * standardDeviation * standardDeviation)
            )
            let y = ((power * ONE_OVER_ROOT_2_PI) / standardDeviation) * sign
            y *= magn
            y *= p5.random(0.4, 1.4)
            return y
        }

        p5.mouseClicked = () => {
            if (scriptIsLooping) {
                p5.noLoop()
                scriptIsLooping = 0
            } else {
                p5.loop()
                scriptIsLooping = 1
            }
        }
    }
    return s
}

export default script
