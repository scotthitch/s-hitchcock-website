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

        this.cells = []
        this.resetCells()
        // populate all the cells with a blank cell
        // this.cells = Array.from(Array(nRows), () => Array(nCols).fill({ ...blankCell }))
    }

    resetCells() {
        this.cells= Array.from(Array(this.nRows), () => Array(this.nCols).fill({ ...blankCell }))
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

                // -- If the current cell is full then try slide the sand to the left or the right --
                else {
                    // -- Then check the cell to the right --
                    if (i < this.nCols - 1 && !this.cells[j][i + 1].filled) {
                        this.cells[j][i + 1] = { ...this.cells[j - 1][i] } // Copy whatever is above into right cell
                        this.cells[j - 1][i].filled = false // Set the cell above to empty
                    }
                    // -- Then check the cell to the left --
                    else if (i > 0 && !this.cells[j][i - 1].filled) {
                        this.cells[j][i - 1] = { ...this.cells[j - 1][i] } // Copy whatever is above into left cell
                        this.cells[j - 1][i].filled = false // Set the cell above to empty
                    }

                    // -- If left and right also full then do nothing --
                }
            }
        }
    }

    render() {
        for (let j = 0; j < this.nRows; j++) {
            for (let i = 0; i < this.nCols; i++) {
                const currentCell = this.cells[j][i]

                // Render the cell if filled
                if (currentCell.filled) {
                    this.p5Instance.fill(currentCell.hue, 100, 50)
                    this.p5Instance.rect(i * this.gridSize, j * this.gridSize, this.gridSize)
                }
            }
        }
    }

    updateHue() {
        this.currentHue += 0.4
        if (this.currentHue > 360) {
            this.currentHue = 0
        }
    }

    addParticles(x: number, y: number) {
        const iCenter = Math.floor(x / this.gridSize)
        const jCenter = Math.floor(y / this.gridSize)

        const matrixSize = 2

        const indexLeft = this.p5Instance.max(0, iCenter - matrixSize)
        const indexRight = this.p5Instance.min(this.nCols, iCenter + matrixSize - 1)

        const indexTop = this.p5Instance.max(0, jCenter - matrixSize)
        const indexBottom = this.p5Instance.min(this.nRows, jCenter + matrixSize - 1)

        let kk = 0
        for (let i = indexLeft; i <= indexRight; i++) {
            for (let j = indexTop; j <= indexBottom; j++) {
                const randomVal = this.p5Instance.random()
                console.log(randomVal)
                if (randomVal > 0.5) {
                    this.cells[j][i] = { filled: true, hue: this.currentHue }
                }
                console.log(kk++)
            }
        }

        this.updateHue()
    }
}

export default Grid
