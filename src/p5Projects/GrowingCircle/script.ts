import type { p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (): p5ScriptInnerFunction => {
    const s = (p5Instance: P5): void => {
        // Params for drawing the initial shape
        const INITAL_SHAPE_MEAN_RADIUS = 120
        const INITIAL_SHAPE_NOISE_FACTOR = 0.2

        // Shape parameters
        const N_SHAPE_NODES = 15
        const ANGLE_BETWEEN_NODES = (2 * Math.PI) / N_SHAPE_NODES
        const STROKE_WEIGHT = 2.5
        const OPACITY = 30 // %

        // Growth rate constants
        const GROWTH_INCREMENT = 0.22
        const GROWTH_NOISE = 17 // % of growth increment

        // const BACKGROUND_COLOUR = "#D2BBA0"
        // const PRIMARY_COLOUR = "#54457F"

        const BACKGROUND_COLOUR = '#f00000'
        const PRIMARY_COLOUR = '#ffedc7'

        const shapeNodesRadii: number[] = []

        p5Instance.setup = () => {
            p5Instance.createCanvas(window.innerWidth, window.innerHeight)
            p5Instance.background(BACKGROUND_COLOUR)

            for (let i = 0; i < N_SHAPE_NODES; i++) {
                const nodeRadius = p5Instance.random(
                    INITAL_SHAPE_MEAN_RADIUS * (1 - INITIAL_SHAPE_NOISE_FACTOR),
                    INITAL_SHAPE_MEAN_RADIUS * (1 + INITIAL_SHAPE_NOISE_FACTOR)
                )
                shapeNodesRadii.push(nodeRadius)
            }
        }

        p5Instance.draw = () => {
            setDrawParameters()
            drawShape()
            growShape()
        }

        const growShape = () => {
            for (let i = 0; i < N_SHAPE_NODES; i++) {
                shapeNodesRadii[i] +=
                    GROWTH_INCREMENT * (1 + p5Instance.random(-GROWTH_NOISE, GROWTH_NOISE))
            }
        }

        const setDrawParameters = () => {
            p5Instance.translate(p5Instance.width / 2, p5Instance.height / 2)
            const col = p5Instance.color(PRIMARY_COLOUR)
            col.setAlpha(OPACITY)

            p5Instance.stroke(col)
            p5Instance.strokeWeight(STROKE_WEIGHT)
            p5Instance.noFill()
        }

        const drawShape = () => {
            // drawShape();
            p5Instance.beginShape()
            addVertexAtIndex(shapeNodesRadii.length - 1)
            for (let i = 0; i < N_SHAPE_NODES; i++) {
                addVertexAtIndex(i)
            }
            addVertexAtIndex(0)
            addVertexAtIndex(1)
            p5Instance.endShape()
        }

        const addVertexAtIndex = (index: number) => {
            const radius = shapeNodesRadii[index]
            const theta = index * ANGLE_BETWEEN_NODES

            p5Instance.curveVertex(radius * p5Instance.cos(theta), radius * p5Instance.sin(theta))
        }
    }
    return s
}

export default script
