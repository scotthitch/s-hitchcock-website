import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'

const scriptWrapper: p5ScriptWrapper = (
    screenDimensions: ScreenDimensions
): { script: p5Script } => {
    const script = (p5Instance: P5): void => {
        const BACKGROUND_COLOUR = '#007271'
        const WAVE_COLOUR = '#06BAAD'

        // blood sea
        // const BACKGROUND_COLOUR = '#8F2D56'
        // const WAVE_COLOUR = '#D81159'

        const SCREEN_THETA = p5Instance.QUARTER_PI

        const WAVE_LENGTH =
            2 *
            p5Instance.max(screenDimensions.height, screenDimensions.width) *
            p5Instance.sin(SCREEN_THETA)

        const SCREEN_HYPOTENUSE = p5Instance.sqrt(
            screenDimensions.width * screenDimensions.width +
                screenDimensions.height * screenDimensions.height
        )

        const SCREEN_BEARING = p5Instance.PI + p5Instance.HALF_PI + SCREEN_THETA
        const WAVE_VERTEX_SPACING = 0.5 // Distance between each horizontal location
        const WAVE_AMPLITUDE = 16.0 // Height of wave
        const WAVE_STROKE_WEIGHT = 10
        const WAVE_PERIOD = 120.0 // How many pixels before the wave repeats
        const DELTA_X = (p5Instance.TWO_PI / WAVE_PERIOD) * WAVE_VERTEX_SPACING // Value for incrementing x
        const SPACE_BETWEEN_WAVES = 80
        const WAVES_THETA_DELTA = 0.01 // How quickly wave travels in local frame x dir
        const WAVES_SHIFT_DELTA = 0.4 // How quickly wave travels in local frame y dir

        let yValues: number[] = [] // Using an array to store height values for the waves
        let wavesTheta = 0.0 // Start angle at 0
        let wavesShift = 0

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)

            yValues = new Array(p5Instance.floor(WAVE_LENGTH / WAVE_VERTEX_SPACING))
        }

        p5Instance.draw = () => {
            p5Instance.rotate(SCREEN_BEARING)
            p5Instance.translate(-WAVE_LENGTH / 2, 0)
            p5Instance.background(BACKGROUND_COLOUR)
            calcWave()

            // console.log(BACKGROUND_COLOUR)
            const startHeight = wavesShift
            const endHeight = SCREEN_HYPOTENUSE + wavesShift
            for (let height = startHeight; height <= endHeight; height += SPACE_BETWEEN_WAVES) {
                renderWave(height)
            }

            // Shift the waves forward. Go back to start if exceeded space between waves
            wavesShift += WAVES_SHIFT_DELTA
            if (wavesShift > SPACE_BETWEEN_WAVES) {
                wavesShift = 0
            }
        }

        const calcWave = () => {
            // For every x value, calculate a y value with sine function
            let x = wavesTheta
            for (let i = 0; i < yValues.length; i++) {
                yValues[i] = p5Instance.sin(x) * WAVE_AMPLITUDE
                x += DELTA_X
            }

            // Angular velocity
            wavesTheta += WAVES_THETA_DELTA
        }

        const renderWave = (h: number) => {
            p5Instance.stroke(WAVE_COLOUR)
            p5Instance.strokeWeight(WAVE_STROKE_WEIGHT)
            p5Instance.noFill()

            p5Instance.beginShape()
            yValues.forEach((yValue, i) => {
                p5Instance.vertex(i * WAVE_VERTEX_SPACING, h + yValue)
            })

            p5Instance.endShape()
        }
    }
    return { script }
}

export default scriptWrapper
