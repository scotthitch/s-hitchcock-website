import P5 from 'p5'

interface Cell {
    filled: boolean
    hue: number
}

const blankCell: Cell = {
    filled: false,
    hue: 0
}

class Grid {
    p5Instance: P5
    nCols: number
    nRows: number
    gridSize: number
    currentHue: number
    cells: Cell[][]

    constructor(p5Instance: P5, nRows: number, nCols: number, gridSize: number) {
        this.p5Instance = p5Instance
        this.nRows = nRows
        this.nCols = nCols
        this.gridSize = gridSize
        this.currentHue = 0

        // populate all the cells with a blank cell
        this.cells = Array.from(Array(nRows), () => Array(nCols).fill({ ...blankCell }))
    }

    updateCells() {
        const topIndex = 0
        const bottomIndex = this.nRows - 1
        const leftIndex = 0
        const rightIndex = this.nCols - 1

        // Iterate through 2D grid array in reverse (starting from screen bottom right)
        for (let i = rightIndex; i >= leftIndex; i--) {
            for (let j = bottomIndex; j >= topIndex + 1; j--) {
                // -- If the current cell is empty --
                if (!this.cells[j][i].filled) {
                    this.cells[j][i] = { ...this.cells[j - 1][i] } // Then copy down whatever is above
                    this.cells[j - 1][i].filled = false // Set the cell above to empty
                }

                // -- If the current cell is full --
                else {
                    // -- Then check the cell to the left --
                    if (i > 0 && !this.cells[j][i - 1].filled) {
                        this.cells[j][i - 1] = { ...this.cells[j - 1][i] } // Copy whatever is above into left cell
                        this.cells[j - 1][i].filled = false // Set the cell above to empty
                    }

                    // -- Then check the cell to the right --
                    else if (i < this.nCols - 1 && !this.cells[j][i + 1].filled) {
                        this.cells[j][i + 1] = { ...this.cells[j - 1][i] } // Copy whatever is above into right cell
                        this.cells[j - 1][i].filled = false // Set the cell above to empty
                    }

                    // -- Otherwise do nothing --
                }
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
                this.p5Instance.fill(currentCell.hue, 100, 50)
                this.p5Instance.rect(i * this.gridSize, j * this.gridSize, this.gridSize)
            }
        }
    }

    updateHue() {
        this.currentHue++
        if (this.currentHue > 360) {
            this.currentHue = 0
        }
    }

    addParticles(x: number, y: number) {
        const i = Math.floor(x / this.gridSize)
        const j = Math.floor(y / this.gridSize)

        this.cells[j][i] = { filled: true, hue: this.currentHue }

        this.updateHue()
    }
}

export default Grid
