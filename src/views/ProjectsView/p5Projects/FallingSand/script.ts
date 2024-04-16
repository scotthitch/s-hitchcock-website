import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '@/types'
import Grid from './Grid'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        console.log(screenDimensions.width, screenDimensions.height)
        let grid: Grid
        const GRID_SIZE = 5 // px

        p5Instance.setup = () => {
            p5Instance.colorMode(p5Instance.HSL)
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)

            const nCols = Math.floor(p5Instance.width / GRID_SIZE) + 1
            const nRows = Math.floor(p5Instance.height / GRID_SIZE) + 1
            grid = new Grid(p5Instance, nRows, nCols, GRID_SIZE)
        }

        const mouseOnScreen = (x: number, y: number) => {
            return x > 0 && x < p5Instance.width && y > 0 && y < p5Instance.height
        }

        p5Instance.draw = () => {
            // p5Instance.frameRate(2)
            p5Instance.background(0, 0, 0)
            console.log(p5Instance.frameRate())
            p5Instance.noStroke()
            grid.render()
            grid.updateCells()
        }

        p5Instance.mouseMoved = () => {
            if (mouseOnScreen(p5Instance.mouseX, p5Instance.mouseY)) {
                grid.addParticles(p5Instance.mouseX, p5Instance.mouseY)
            }
        }
    }
    return script
}

export default scriptWrapper
