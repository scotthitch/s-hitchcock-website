import type { PolarCoordinates, CartesianCoordinates, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (): p5ScriptInnerFunction => {
    const s = (p5Instance: P5): void => {
        // if (!props.isPlaying) {
        //     console.log("stopped")
        //     p5.noLoop();
        // } else {
        //     console.log("started")
        //     p5.loop();
        // }
        const BACKGROUND_COLOUR = 0

        const STROKE_MULTIPLIER = 1 / 12
        const STROKE_MINIMUM = 2

        const DRAWING_SATURATION = 90
        const DRAWING_LIGHT = 70

        // Hue
        const HUE_MINIMUM = 180
        const HUE_MAXIMUM = 260
        const HUE_AVERAGE = (HUE_MINIMUM + HUE_MAXIMUM) / 2
        const HUE_HALF_RANGE = (HUE_MAXIMUM - HUE_MINIMUM) / 2

        let hueOffset = 0
        let prevTranslatedPolarMouse: PolarCoordinates

        let userHasInteracted = false
        let firstIterationOfInteraction = true
        let numberOfReflections = 5

        // Setup the canvas
        p5Instance.setup = () => {
            p5Instance.createCanvas(window.innerWidth, window.innerHeight)
            p5Instance.colorMode(p5Instance.HSL)
            p5Instance.background(BACKGROUND_COLOUR)
            translateCanvasToCenter()

            // For each reflection draw a new line with a slightly different colour
            const reflectionAngle = calculateAngleOfRelfection(numberOfReflections)

            const startingPolarPoint: PolarCoordinates = {
                r: p5Instance.min(p5Instance.width, p5Instance.height) * 0.4,
                theta: 0
            }
            for (let i = 0; i < numberOfReflections; i++) {
                const theta = reflectionAngle * i
                const hue = HUE_AVERAGE + HUE_HALF_RANGE * p5Instance.cos(theta + hueOffset)

                // Draw the line
                p5Instance.strokeWeight(startingPolarPoint.r * STROKE_MULTIPLIER + STROKE_MINIMUM)
                p5Instance.stroke(hue, DRAWING_SATURATION, DRAWING_LIGHT)
                p5Instance.point(
                    startingPolarPoint.r * p5Instance.cos(startingPolarPoint.theta + theta), // x1
                    startingPolarPoint.r * p5Instance.sin(startingPolarPoint.theta + theta)
                ) // y2
            }
        }

        // Redraw the canvas on every iteration
        p5Instance.draw = () => {
            // If the user hasn't yet interacted then don't bother to draw anything
            if (!checkUserInteraction()) {
                return
            }

            // Move origin to centre of canvas and calculate translated mouse (x, y) coords
            translateCanvasToCenter()
            const translatedCartesianMouse = getTranslatedCartesianMouse()

            const reflectionAngle = calculateAngleOfRelfection(numberOfReflections)
            const translatedPolarMouse = cartesianToPolar(translatedCartesianMouse)

            // If the first iteration, then set previous polar mouse coords to current
            if (firstIterationOfInteraction) {
                prevTranslatedPolarMouse = translatedPolarMouse
                firstIterationOfInteraction = false
                return
            }

            // For each reflection draw a new line with a slightly different colour
            for (let i = 0; i < numberOfReflections; i++) {
                const theta = reflectionAngle * i
                const hue = HUE_AVERAGE + HUE_HALF_RANGE * p5Instance.cos(theta + hueOffset)

                // Draw the line
                p5Instance.strokeWeight(translatedPolarMouse.r * STROKE_MULTIPLIER + STROKE_MINIMUM)
                p5Instance.stroke(hue, DRAWING_SATURATION, DRAWING_LIGHT)
                p5Instance.line(
                    prevTranslatedPolarMouse.r *
                        p5Instance.cos(prevTranslatedPolarMouse.theta + theta), // x1
                    prevTranslatedPolarMouse.r *
                        p5Instance.sin(prevTranslatedPolarMouse.theta + theta), // y1
                    translatedPolarMouse.r * p5Instance.cos(translatedPolarMouse.theta + theta), // x2
                    translatedPolarMouse.r * p5Instance.sin(translatedPolarMouse.theta + theta)
                ) // y2
            }

            prevTranslatedPolarMouse = translatedPolarMouse
        }

        const checkUserInteraction = (): boolean => {
            if (userHasInteracted) {
                return true
            }
            if (mouseInWindow()) {
                p5Instance.background(BACKGROUND_COLOUR)
                userHasInteracted = true
                return true
            }
            return false
        }

        const translateCanvasToCenter = () => {
            p5Instance.translate(p5Instance.width / 2, p5Instance.height / 2)
        }

        const calculateAngleOfRelfection = (nReflections: number): number => {
            return (2 * Math.PI) / nReflections
        }

        const getTranslatedCartesianMouse = (): CartesianCoordinates => {
            const translatedMouseX = p5Instance.mouseX - p5Instance.width / 2
            const translatedMouseY = p5Instance.mouseY - p5Instance.height / 2
            return { x: translatedMouseX, y: translatedMouseY }
        }

        const cartesianToPolar = (
            translatedCartesianMouse: CartesianCoordinates
        ): PolarCoordinates => {
            const r = Math.sqrt(
                translatedCartesianMouse.x * translatedCartesianMouse.x +
                    translatedCartesianMouse.y * translatedCartesianMouse.y
            )
            const theta = Math.atan2(translatedCartesianMouse.y, translatedCartesianMouse.x)
            return { r: r, theta: theta }
        }

        const mouseInWindow = () => {
            return (
                p5Instance.mouseX > 0 &&
                p5Instance.mouseX < p5Instance.width && // mouse in x bounds
                p5Instance.mouseY > 0 &&
                p5Instance.mouseY < p5Instance.height
            ) // mouse in y bounds
        }

        p5Instance.mouseClicked = () => {
            // On mouse click if the mouse is in the window then clear the
            // background and shift the colour wheel around
            if (mouseInWindow()) {
                p5Instance.background(BACKGROUND_COLOUR)
                hueOffset += 10
            }
        }

        p5Instance.keyPressed = () => {
            if (p5Instance.keyCode === p5Instance.UP_ARROW) {
                numberOfReflections++
            } else if (p5Instance.keyCode === p5Instance.DOWN_ARROW) {
                numberOfReflections = Math.max(1, numberOfReflections - 1)
            }
            p5Instance.background(BACKGROUND_COLOUR)
        }
    }
    return s
}

export default script
