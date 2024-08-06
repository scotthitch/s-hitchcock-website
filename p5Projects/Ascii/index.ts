import P5 from 'p5' // Package from npm
import type {
    emptyFunction,
    p5Script,
    p5ScriptWrapper,
    pixelHandler,
    ScreenDimensions
} from '~/types'
import pixelsToAscii from './pixelsToAscii'
import WebcamPixelComponent from './WebcamPixelComponent'
import calculateTextSize from './calculateTextSize'
import * as CONSTANTS from './constants'

const scriptWrapper: p5ScriptWrapper = (
    screenDimensions: ScreenDimensions
): { script: p5Script; cleanup: emptyFunction } => {
    let webcam: WebcamPixelComponent
    const cleanup = () => {
        webcam.stopWebcam()
    }

    let pixelStream: Uint8ClampedArray
    const handlePixels: pixelHandler = (pixels: Uint8ClampedArray) => {
        pixelStream = pixels
    }

    const script = (p5Instance: P5): void => {
        // Setup the ascii density map
        let nSpaces = 35
        let asciiImage: string = ''
        let spaces = Array(nSpaces).fill(' ')
        let asciiDensityMap = CONSTANTS.ASCII_ONLY_DENSITY_MAP.concat(spaces)

        const pixelToAsciiMapper = (brightnessValue: number): string => {
            // Map the brightness value to an index in the ascii density map
            const index = Math.floor(
                p5Instance.map(brightnessValue, 0, 255, 0, asciiDensityMap.length)
            )
            // Return a char from the map
            return asciiDensityMap[index]
        }

        const setTextFeatures = (): void => {
            const drawingSize = calculateTextSize(screenDimensions, CONSTANTS.IMAGE_SIZE)
            p5Instance.textFont(CONSTANTS.FONT.name)
            p5Instance.textSize(drawingSize)
            p5Instance.textLeading(drawingSize)
            p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER)
            p5Instance.fill(CONSTANTS.TEXT_COLOUR)
            p5Instance.textStyle('bold')
        }
        const initialiseWebCam = async () => {
            try {
                webcam = new WebcamPixelComponent(handlePixels, CONSTANTS.MEDIA_CONSTRAINTS)
                await webcam.startWebcam()
            } catch (err) {
                console.log(err)
            }
        }

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            initialiseWebCam()
            setTextFeatures()
        }

        p5Instance.draw = () => {
            p5Instance.background(CONSTANTS.BACKGROUND_COLOUR)
            if (pixelStream === undefined) {
                return
            }
            asciiImage = pixelsToAscii(
                pixelStream,
                CONSTANTS.MEDIA_CONSTRAINTS.width,
                CONSTANTS.MEDIA_CONSTRAINTS.height,
                pixelToAsciiMapper
            )

            // Display the image in the middle of the screen
            p5Instance.text(asciiImage, p5Instance.width / 2, p5Instance.height / 2)
        }
        p5Instance.mouseClicked = () => {
            navigator.clipboard.writeText(asciiImage)
            console.log(asciiImage)
            // webcam.stopWebcam()
        }

        p5Instance.keyPressed = () => {
            switch (p5Instance.keyCode) {
                case p5Instance.UP_ARROW:
                    nSpaces += CONSTANTS.BRIGHTNESS_INCREMENT
                    break
                case p5Instance.DOWN_ARROW:
                    nSpaces = Math.max(nSpaces - CONSTANTS.BRIGHTNESS_INCREMENT, 0)
                    break
            }

            spaces = Array(nSpaces).fill(' ')
            asciiDensityMap = CONSTANTS.ASCII_ONLY_DENSITY_MAP.concat(spaces)
        }
    }
    return { script, cleanup }
}

export default scriptWrapper
