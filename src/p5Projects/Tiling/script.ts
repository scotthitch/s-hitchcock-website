import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    let a1: number
    let a2: number
    let l: number
    let w: number
    let r: number
    let cosPiOver4: number
    let avg = 0.5
    let iFirst: number
    let iLast: number
    let jLast: number
    let jFirst: number
    let deltaX
    let ang

    const s = (p5Instance: P5): void => {
        p5Instance.setup = () => {
            p5Instance.createCanvas(p5Instance.windowWidth, p5Instance.windowHeight)
            restartSketch()
        }

        p5Instance.windowResized = () => {
            p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight)
            restartSketch()
        }

        const restartSketch = () => {
            iFirst = -p5Instance.width / 20
            iLast = p5Instance.width + p5Instance.width / 20
            jFirst = -p5Instance.height / 20
            jLast = p5Instance.height + p5Instance.height / 20
            a1 = (3 * Math.PI) / 4
            a2 = Math.PI / 4
            cosPiOver4 = p5Instance.cos(Math.PI / 4)
            newDimensions(80)
            renderAll()
        }

        function newDimensions(newL: number) {
            l = newL
            w = l / 6
            r = w / 2
        }

        const calcDeltaX = () => (l / 2 - w / 2) * cosPiOver4 * 2

        function renderAll() {
            p5Instance.background(18, 130, 162) //Blue

            p5Instance.rectMode(p5Instance.CENTER)
            p5Instance.fill(234, 252, 251)
            deltaX = calcDeltaX()
            for (let i = iFirst; i < iLast; i += deltaX) {
                for (let j = jFirst; j < jLast; j += deltaX) {
                    ang = randomAngle()
                    // stroke(255);
                    p5Instance.noStroke()
                    p5Instance.translate(i, j)
                    p5Instance.rotate(ang)
                    p5Instance.rect(0, 0, w, l, r)
                    p5Instance.rotate(-ang)
                    p5Instance.translate(-i, -j)
                }
            }
        }

        const randomAngle = () => {
            if (p5Instance.random() > avg) {
                return a1
            } else {
                return a2
            }
        }

        p5Instance.keyPressed = () => {
            switch (p5Instance.keyCode) {
                case p5Instance.UP_ARROW:
                    if (l >= 320) {
                        // pass
                    } else {
                        newDimensions(p5Instance.min(320, l * 2))
                        renderAll()
                    }
                    break
                case p5Instance.DOWN_ARROW:
                    if (l <= 10) {
                        // pass
                    } else {
                        newDimensions(p5Instance.max(10, l / 2))
                        renderAll()
                    }
                    break
                case p5Instance.LEFT_ARROW:
                    if (avg >= 1) {
                        // pass
                    } else {
                        avg += 0.125
                        renderAll()
                    }
                    break
                case p5Instance.RIGHT_ARROW:
                    if (avg <= 0) {
                        // pass
                    } else {
                        avg -= 0.125
                        renderAll()
                    }
                    break
                default:
                    // Default behavior for other keys
                    break
            }
        }
    }
    return s
}

export default script
