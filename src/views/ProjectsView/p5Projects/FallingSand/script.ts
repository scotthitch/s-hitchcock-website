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
        console.log(screenDimensions.width, screenDimensions.height)
        let grid: Grid
        const GRID_SIZE = 5 // px

        p5Instance.setup = () => {
            p5Instance.colorMode(p5Instance.HSL)
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)

            const nCols = Math.floor(p5Instance.width / GRID_SIZE) + 1
            const nRows = Math.floor(p5Instance.height / GRID_SIZE) + 1
            grid = new Grid(nRows, nCols, GRID_SIZE)
        }

        const mouseOnScreen = (x: number, y: number) => {
            return x > 0 && x < p5Instance.width && y > 0 && y < p5Instance.height
        }

        p5Instance.draw = () => {
            // p5Instance.frameRate(2)
            console.log(p5Instance.frameRate())
            p5Instance.noStroke()
            p5Instance.background(0, 0, 0)
            grid.render()
            grid.update()
        }

        p5Instance.mouseMoved = () => {
            if (mouseOnScreen(p5Instance.mouseX, p5Instance.mouseY)) {
                grid.addParticle(p5Instance.mouseX, p5Instance.mouseY)
            }
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

                // populate all the cells with a blank cell
                // add an additional row below the screen
                this.cells = Array.from(Array(nRows), () =>
                    Array(nCols).fill(structuredClone(blankCell))
                )
            }

            update() {
                const topIndex = 0
                const bottomIndex = this.nRows - 1
                // console.log(bottomIndex)
                const leftIndex = 0
                const rightIndex = this.nCols - 1
                // let j = bottomIndex

                for (let i = rightIndex; i >= leftIndex; i--) {
                    // Handle center rows
                    for (let j = bottomIndex; j > topIndex; j--) {
                        // If the current cell is filled then do nothing
                        if (this.cells[j][i].filled) {
                            continue
                        }

                        // const aboveFilled

                        // Then copy down whatever is above
                        this.cells[j][i] = structuredClone(this.cells[j - 1][i])

                        // set the cell above to empty
                        this.cells[j - 1][i].filled = false
                    }
                }
            }

            render() {
                for (let j = 0; j < this.nRows; j++) {
                    for (let i = 0; i < this.nCols; i++) {
                        const currentCell = this.cells[j][i]
                        if (!currentCell.filled) {
                            continue
                        }
                        p5Instance.fill(currentCell.hue, 100, 50)
                        p5Instance.rect(i * this.gridSize, j * this.gridSize, this.gridSize)
                    }
                }
            }

            addParticle(x: number, y: number) {
                const i = Math.floor(x / this.gridSize)
                const j = Math.floor(y / this.gridSize)

                this.cells[j][i] = { filled: true, hue: 50 }
            }
        }
    }
    return script
}

export default scriptWrapper
