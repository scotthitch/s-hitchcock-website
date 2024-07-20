import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'

interface P5VideoElement extends P5.Element {
    pixels: number[]
    loadPixels: () => null
    updatePixels: () => null
}

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        // const myAscii = "░░░@&%$#[]{}|()?/*!+>;=^,_:'-.`                       "
        // const myAscii = '        .:░▒▓█'.split('').reverse().join('')
        const myAscii = "░░░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~i!lI;:,^`'.                                         "
        const brightnessToAscii = (brightnessValue: number): string => {
            const index = Math.floor(p5Instance.map(brightnessValue, 0, 255, 0, myAscii.length - 1))
            return myAscii[index]
        }
        let video: P5VideoElement
        let asciiDiv: P5.Element
        // const img = p5Instance.loadImage('cam.jpg')
        // Setup the canvas

        const size = 96
        p5Instance.setup = () => {
            asciiDiv = p5Instance.createDiv()
            asciiDiv.style(
                "margin: 0; padding: 0; font-family: 'Courier'; font-size: 8pt; color: #0A100D; background-color: #DAFEB7; line-height: 6pt; display: block"
            )
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            video = p5Instance.createCapture('video', { flipped: true })
            video.size(size*2, size)
            video.hide()
            p5Instance.noCanvas()

            // p5Instance.image(img, 0, 0)
        }
        let counter = 0
        p5Instance.draw = () => {
            video.loadPixels()
            let asciiImage: string = ''
            for (let j = 0; j < video.height; j++) {
                for (let i = 0; i < video.width; i++) {
                    let pixelIndex = (i + j * video.width) * 4
                    let r = video.pixels[pixelIndex + 0]
                    let g = video.pixels[pixelIndex + 1]
                    let b = video.pixels[pixelIndex + 2]

                    let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b

                    let char = brightnessToAscii(bright)

                    asciiImage += char == ' ' ? '&nbsp;' : char
                    // asciiImage += char
                }
                asciiImage += '<br/>'
            }
            asciiDiv.html(asciiImage)
        }
        p5Instance.mouseClicked = () => {
            // p5Instance.noLoop()
        }
    }
    return script
}

export default scriptWrapper
