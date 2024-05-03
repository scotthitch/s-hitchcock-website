import P5 from 'p5' // Package from npm
import createUpDownLeftOrRightP5Button from '@/helpers/createUpDownLeftOrRightP5Button'
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '@/types'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        const BACKGROUND_COLOUR = '#037171'
        const RECTANGLE_COLOUR = '#00B9AE'
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

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)

            createUpDownLeftOrRightP5Button(p5Instance, '+', handleUpEvent)
            createUpDownLeftOrRightP5Button(p5Instance, '-', handleDownEvent)
            createUpDownLeftOrRightP5Button(p5Instance, '>', handleRightEvent)
            createUpDownLeftOrRightP5Button(p5Instance, '<', handleLeftEvent)

            iFirst = -p5Instance.width / 20
            iLast = p5Instance.width + p5Instance.width / 20
            jFirst = -p5Instance.height / 20
            jLast = p5Instance.height + p5Instance.height / 20
            a1 = (3 * Math.PI) / 4
            a2 = Math.PI / 4
            cosPiOver4 = p5Instance.cos(Math.PI / 4)
            setNewDimensions(80)
            renderAll()
        }

        const setNewDimensions = (newL: number) => {
            l = newL
            w = l / 6
            r = w / 2
        }

        const calcDeltaX = () => (l / 2 - w / 2) * cosPiOver4 * 2

        const renderAll = () => {
            p5Instance.background(BACKGROUND_COLOUR) //Blue

            p5Instance.rectMode(p5Instance.CENTER)
            p5Instance.fill(RECTANGLE_COLOUR)
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

        const handleUpEvent = () => {
            if (l < 320) {
                setNewDimensions(p5Instance.min(320, l * 2))
                renderAll()
            }
        }

        const handleDownEvent = () => {
            if (l > 10) {
                setNewDimensions(p5Instance.max(10, l / 2))
                renderAll()
            }
        }

        const handleLeftEvent = () => {
            if (avg < 1) {
                avg += 0.125
                renderAll()
            }
        }

        const handleRightEvent = () => {
            if (avg > 0) {
                avg -= 0.125
                renderAll()
            }
        }

        p5Instance.keyPressed = () => {
            switch (p5Instance.keyCode) {
                case p5Instance.UP_ARROW:
                    handleUpEvent()
                    break
                case p5Instance.DOWN_ARROW:
                    handleDownEvent()
                    break
                case p5Instance.LEFT_ARROW:
                    handleLeftEvent()
                    break
                case p5Instance.RIGHT_ARROW:
                    handleRightEvent()
                    break
                default:
                    // Default behavior for other keys
                    break
            }
        }
    }
    return script
}

export default scriptWrapper
