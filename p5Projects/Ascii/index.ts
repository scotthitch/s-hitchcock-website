import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'
import toGreyScale from '~/helpers/toGreyScale'
// interface P5VideoElement extends P5.Element {
//     pixels: number[]
//     loadPixels: () => null
//     updatePixels: () => null
// }

const FONT = {
    name: 'Courier',
    aspectRatio: 5 / 3
}

const TEXT_COLOUR = '#000000'
const BACKGROUND_COLOUR = '#EB1E4E'
const N_SPACES = 45

const calculateTextSize = (screenDimensions: ScreenDimensions, imageSize: number): number => {
    if (screenDimensions.width > screenDimensions.height) {
        // Large screen e.g. desktop
        return (screenDimensions.height / imageSize) * 0.9
    } else {
        // Small screen e.g. mobile
        return (screenDimensions.width / imageSize) * 0.9
    }
}

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        // Setup the ascii density map
        const ASCII_ONLY_DENSITY_MAP =
            "░░░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~i!lI;:,^`'.".split('')
        const SPACES = Array(N_SPACES).fill(' ')
        const ASCII_DENSITY_MAP = ASCII_ONLY_DENSITY_MAP.concat(SPACES)

        const brightnessToAscii = (brightnessValue: number): string => {
            // Map the brightness value to an index in the ascii density map
            const index = Math.floor(
                p5Instance.map(brightnessValue, 0, 255, 0, ASCII_DENSITY_MAP.length)
            )
            // Return a char from the map
            return ASCII_DENSITY_MAP[index]
        }

        const setTextFeatures = (imageSize: number): void => {
            const textSize = calculateTextSize(screenDimensions, imageSize)
            p5Instance.textFont(FONT.name)
            p5Instance.textSize(textSize)
            p5Instance.textLeading(textSize)
            p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER)
            p5Instance.fill(TEXT_COLOUR)
            p5Instance.textStyle('bold')
        }
        let video: P5.Element

        const imageSize = 80
        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            video = p5Instance.createCapture('video')
            video.size(imageSize * FONT.aspectRatio, imageSize)
            video.hide()
            setTextFeatures(imageSize)
        }

        p5Instance.draw = () => {
            p5Instance.background(BACKGROUND_COLOUR)
            video.loadPixels()
            let asciiImage: string = ''
            for (let j = 0; j < video.height; j++) {
                // Iterate in reverse direction to horizontally flip the image
                for (let i = video.width - 1; i >= 0; i--) {
                    // Get rgb values
                    let pixelIndex = (i + j * video.width) * 4
                    const r = video.pixels[pixelIndex + 0]
                    const g = video.pixels[pixelIndex + 1]
                    const b = video.pixels[pixelIndex + 2]

                    // Convert rbg to greyscale
                    const grey = toGreyScale(r, g, b)

                    // Add on new char
                    asciiImage += brightnessToAscii(grey)
                }

                // Append a new line character after each row
                asciiImage += '\n'
            }

            // Display the image in the middle of the screen
            p5Instance.text(asciiImage, p5Instance.width / 2, p5Instance.height / 2)
        }
        p5Instance.mouseClicked = () => {
            console.log(video)
            video.remove()
            p5Instance.noLoop()
        }
    }
    return script
}

export default scriptWrapper
