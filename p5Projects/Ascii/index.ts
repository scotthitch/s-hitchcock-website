import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'
import toGreyScale from '~/helpers/toGreyScale'
import WebcamPixelComponent from '~/helpers/WebcamPixelComponent'

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
    let pixelStream: Uint8ClampedArray
    const handlePixels = (pixels: Uint8ClampedArray) => {
        pixelStream = pixels
    }
    const FONT = {
        name: 'Courier',
        aspectRatio: 5 / 3
    }
    const IMAGE_SIZE = 80
    const VIDEO_CONTRAINTS = {
        width: Math.ceil(IMAGE_SIZE * FONT.aspectRatio),
        height: IMAGE_SIZE,
        frameRate: 30
    }

    const TEXT_COLOUR = '#000000'
    const BACKGROUND_COLOUR = '#EB1E4E'
    const ASCII_ONLY_DENSITY_MAP =
        "░░░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~i!lI;:,^`'.".split('')
    let webcam: WebcamPixelComponent

    const script = (p5Instance: P5): void => {
        // Setup the ascii density map
        let nSpaces = 35

        let spaces = Array(nSpaces).fill(' ')
        let asciiDensityMap = ASCII_ONLY_DENSITY_MAP.concat(spaces)

        const brightnessToAscii = (brightnessValue: number): string => {
            // Map the brightness value to an index in the ascii density map
            const index = Math.floor(
                p5Instance.map(brightnessValue, 0, 255, 0, asciiDensityMap.length)
            )
            // Return a char from the map
            return asciiDensityMap[index]
        }

        const setTextFeatures = (): void => {
            const drawingSize = calculateTextSize(screenDimensions, IMAGE_SIZE)
            console.log(drawingSize)
            p5Instance.textFont(FONT.name)
            p5Instance.textSize(drawingSize)
            p5Instance.textLeading(drawingSize)
            p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER)
            p5Instance.fill(TEXT_COLOUR)
            p5Instance.textStyle('bold')
        }
        const initialiseWebCam = (): void => {
            webcam = new WebcamPixelComponent(handlePixels, VIDEO_CONTRAINTS)
            webcam.startWebcam()
        }

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            initialiseWebCam()
            setTextFeatures()
        }

        p5Instance.draw = () => {
            p5Instance.background(BACKGROUND_COLOUR)
            if (pixelStream === undefined) {
                return
            }
            let asciiImage: string = ''
            for (let j = 0; j < VIDEO_CONTRAINTS.height; j++) {
                // Iterate in reverse direction to horizontally flip the image
                for (let i = VIDEO_CONTRAINTS.width - 1; i >= 0; i--) {
                    // Get rgb values
                    let pixelIndex = (i + j * VIDEO_CONTRAINTS.width) * 4
                    const r = pixelStream[pixelIndex + 0]
                    const g = pixelStream[pixelIndex + 1]
                    const b = pixelStream[pixelIndex + 2]

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
            webcam.stopWebcam()
        }

        p5Instance.keyPressed = () => {
            // console.log(p5Instance.keyCode == p5Instance.LEFT_ARROW)
            switch (p5Instance.keyCode) {
                case p5Instance.UP_ARROW:
                    nSpaces += 5
                    break
                case p5Instance.DOWN_ARROW:
                    nSpaces -= 5
            }

            spaces = Array(nSpaces).fill(' ')
            asciiDensityMap = ASCII_ONLY_DENSITY_MAP.concat(spaces)
        }
    }
    return script
}

export default scriptWrapper
