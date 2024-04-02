import P5 from 'p5' // Package from npm

const script = (p5: P5): void => {
    const veils: Veil[] = []
    const NUM_VEILS = 16
    // let colours = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"]
    const COLOURS = ['#464655', '#F4D35E', '#8ACDEA', '#A89B9D', '#FF521B']
    let inc: number
    const FLUX = 80 // TODO: give this a better name

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight)
        // console.log(window.innerWidth , p5.windowHeight)
        inc = (2 * p5.height) / (NUM_VEILS - 2)

        let colIndex = 1
        let prevColIndex = colIndex
        for (let j = -inc; j < p5.height + inc; j += inc / 2) {
            colIndex = generateRandomIndex(prevColIndex, COLOURS.length)
            prevColIndex = colIndex
            const newVeil = new Veil(j, FLUX, COLOURS[colIndex], colIndex)
            veils.push(newVeil)
            newVeil.calcTopRow()
        }
    }

    p5.draw = () => {
        p5.background(0)

        for (const veil of veils) {
            veil.draw()
            veil.move()

            if (veil.heightAvg > p5.height + inc) {
                veil.heightAvg = veils[0].heightAvg - inc / 2
                const removedVeil = veils.pop()
                if (removedVeil !== undefined) {
                    veils.unshift(removedVeil)
                }
            }
        }
    }

    const generateRandomIndex = (prevVal: number, max: number) => {
        let val = prevVal
        while (val === prevVal) {
            val = Math.floor(Math.random() * max)
        }
        return val
    }

    class Veil {
        heightAvg: number
        flux: number
        colVal: string
        colIndex: number
        topRowArray: P5.Vector[]
        xOff: number

        constructor(heightAvg: number, flux: number, colVal: string, colIndex: number) {
            // this.yAvg = yAvg;
            this.heightAvg = heightAvg
            this.colVal = colVal
            this.flux = flux
            this.colIndex = colIndex
            this.topRowArray = []
            this.xOff = p5.random(0, 100)
        }

        draw() {
            p5.fill(this.colVal)
            p5.noStroke()

            p5.beginShape()
            p5.curveVertex(0, p5.height)
            p5.curveVertex(0, p5.height)
            p5.curveVertex(-20, this.heightAvg)
            for (let i = 0; i < this.topRowArray.length; i++) {
                p5.curveVertex(this.topRowArray[i].x, this.topRowArray[i].y)
            }
            p5.curveVertex(p5.width + 20, this.heightAvg)
            p5.curveVertex(p5.width, p5.height)
            p5.curveVertex(p5.width, p5.height)
            p5.endShape()
        }

        calcTopRow() {
            this.topRowArray = []
            for (let i = 0; i <= p5.width; i += p5.width / 5) {
                const yVal = this.heightAvg - p5.noise(i + this.xOff) * this.flux
                this.topRowArray.push(p5.createVector(i, yVal))
            }
        }

        move() {
            this.heightAvg += 1
            this.shimmer()
        }

        shimmer() {
            for (let i = 0; i < this.topRowArray.length; i++) {
                const newY = this.heightAvg - p5.noise(i + this.xOff) * this.flux
                this.topRowArray[i].y = newY
            }
            this.xOff += 0.006
        }
    }
}

export default script
