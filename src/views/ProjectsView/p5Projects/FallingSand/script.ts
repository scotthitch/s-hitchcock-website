import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '@/types'

interface Cell {
    filled: boolean
    hue: number
}

const blankCell: Cell = {
    filled: false,
    hue: 0
}

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        let grid: Grid
        const GRID_SIZE = 50 // px

        p5Instance.setup = () => {
            p5Instance.colorMode(p5Instance.HSL)
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)

            const nCols = Math.floor(p5Instance.width / GRID_SIZE) + 1
            const nRows = Math.floor(p5Instance.height / GRID_SIZE) + 1
            grid = new Grid(nCols, nRows, GRID_SIZE)
        }

        p5Instance.draw = () => {
            p5Instance.background(0, 0, 0)
            grid.render()
        }

        p5Instance.mouseClicked = () => {
            grid.addParticle(p5Instance.mouseX, p5Instance.mouseY)
        }

        class Grid {
            nCols: number
            nRows: number
            gridSize: number
            cells: Cell[][]

            constructor(nRows: number, nCols: number, gridSize: number) {
                this.nRows = nRows
                this.nCols = nCols
                this.gridSize = gridSize

                this.cells = Array(nCols).fill(Array(nRows).fill(blankCell))
            }

            render() {
                // p5Instance.fill(100, 100, 50)
                // p5Instance.rect(50, 50, GRID_SIZE, GRID_SIZE)

                for (let i = 0; i < this.nCols; i++) {
                    for (let j = 0; j < this.nRows; j++) {
                        const currentCell = this.cells[i][j]
                        if (!currentCell.filled) {
                            continue
                        }
                        p5Instance.fill(currentCell.hue, 100, 50)
                        p5Instance.rect(
                            i * this.gridSize,
                            j * this.gridSize,
                            this.gridSize,
                            this.gridSize
                        )
                    }
                }
            }

            addParticle(x: number, y: number) {
                const i = Math.floor(x / this.gridSize)
                const j = Math.floor(y / this.gridSize)

                this.cells[i][j] = { filled: true, hue: 10 }
            }
        }
    }
    return script
}

export default scriptWrapper
