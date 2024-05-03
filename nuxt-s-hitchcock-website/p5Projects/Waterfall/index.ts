import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        const veils: Veil[] = []
        const NUM_VEILS = 16
        const COLOURS = ['#464655', '#F4D35E', '#8ACDEA', '#A89B9D', '#FF521B']
        const FLUX = 80 // TODO: give this a better name
        let inc: number // TODO: name this

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            console.log(p5Instance.width, p5Instance.height)
            inc = (2 * p5Instance.height) / (NUM_VEILS - 2)

            let colIndex = 1
            let prevColIndex = colIndex
            for (let j = -inc; j < p5Instance.height + inc; j += inc / 2) {
                colIndex = generateRandomIndex(prevColIndex, COLOURS.length)
                prevColIndex = colIndex
                const newVeil = new Veil(j, FLUX, COLOURS[colIndex], colIndex)
                veils.push(newVeil)
                newVeil.calcTopRow()
            }
        }

        p5Instance.draw = () => {
            p5Instance.background(0)

            for (const veil of veils) {
                veil.draw()
                veil.move()

                if (veil.heightAvg > p5Instance.height + inc) {
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
                this.xOff = p5Instance.random(0, 100)
            }

            draw() {
                p5Instance.fill(this.colVal)
                p5Instance.noStroke()

                p5Instance.beginShape()
                p5Instance.curveVertex(0, p5Instance.height)
                p5Instance.curveVertex(0, p5Instance.height)
                p5Instance.curveVertex(-20, this.heightAvg)
                for (let i = 0; i < this.topRowArray.length; i++) {
                    p5Instance.curveVertex(this.topRowArray[i].x, this.topRowArray[i].y)
                }
                p5Instance.curveVertex(p5Instance.width + 20, this.heightAvg)
                p5Instance.curveVertex(p5Instance.width, p5Instance.height)
                p5Instance.curveVertex(p5Instance.width, p5Instance.height)
                p5Instance.endShape()
            }

            calcTopRow() {
                this.topRowArray = []
                for (let i = 0; i <= p5Instance.width; i += p5Instance.width / 5) {
                    const yVal = this.heightAvg - p5Instance.noise(i + this.xOff) * this.flux
                    this.topRowArray.push(p5Instance.createVector(i, yVal))
                }
            }

            move() {
                this.heightAvg += 1
                this.shimmer()
            }

            shimmer() {
                for (let i = 0; i < this.topRowArray.length; i++) {
                    const newY = this.heightAvg - p5Instance.noise(i + this.xOff) * this.flux
                    this.topRowArray[i].y = newY
                }
                this.xOff += 0.006
            }
        }
    }
    return script
}

export default scriptWrapper
