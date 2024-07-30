import P5 from 'p5' // Package from npm
import type { emptyFunction, p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'
import pixelsToAscii from './pixelsToAscii'
import WebcamPixelComponent from './WebcamPixelComponent'

const calculateTextSize = (screenDimensions: ScreenDimensions, imageSize: number): number => {
    if (screenDimensions.width > screenDimensions.height) {
        // Large screen e.g. desktop
        return (screenDimensions.height / imageSize) * 0.9
    } else {
        // Small screen e.g. mobile
        return (screenDimensions.width / imageSize) * 0.9
    }
}

const FONT = {
    name: 'Courier',
    aspectRatio: 5 / 3
}
const IMAGE_SIZE = 100
const VIDEO_CONTRAINTS = {
    width: Math.floor(IMAGE_SIZE * FONT.aspectRatio),
    // width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    frameRate: 60
}

const TEXT_COLOUR = '#000000'
const BACKGROUND_COLOUR = '#EB1E4E'
const ASCII_ONLY_DENSITY_MAP =
    "░░░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~i!lI;:,^`'.".split('')

const scriptWrapper: p5ScriptWrapper = (
    screenDimensions: ScreenDimensions
): { script: p5Script; cleanup: emptyFunction } => {
    let pixelStream: Uint8ClampedArray
    const handlePixels = (pixels: Uint8ClampedArray) => {
        pixelStream = pixels
    }

    let webcam: WebcamPixelComponent
    // const canvasElement = document.createElement('canvas')
    // document.body.appendChild(canvasElement) // Append to the body to ensure it's part of the DOM
    // const canvasContext = canvasElement.getContext('2d')
    // canvasElement.style.display = 'none' // Hide the canvas

    // canvasElement.width = VIDEO_CONTRAINTS.width
    // canvasElement.height = VIDEO_CONTRAINTS.height

    // const img = new Image()

    // img.addEventListener('load', () => {
    //     if (canvasContext !== null) {
    //         console.log('Image loaded successfully.')
    //         canvasContext.drawImage(img, 0, 0, canvasElement.width, canvasElement.height)

    //         const imageData = canvasContext.getImageData(
    //             0,
    //             0,
    //             canvasElement.width,
    //             canvasElement.height
    //         )
    //         const pixels = imageData.data

    //         console.log(pixels.every((val) => val === 0))
    //         console.log(pixels)

    //         pixelStream = pixels // Ensure pixelStream is defined in the appropriate scope
    //     } else {
    //         console.error('Canvas context is null.')
    //     }
    // })

    // img.addEventListener('error', (e) => {
    //     console.error('Failed to load the image.', e)
    // })

    // img.src = '/vidfeed.png' // Ensure the correct path to the image

    // if (canvasContext !== null) {
    //     // Draw the video element frame onto the canvas
    //     canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height)
    // }

    // const ctx = document.getElementById("canvas2").getContext("2d");

    const cleanup = () => {
        webcam.stopWebcam()
    }

    const script = (p5Instance: P5): void => {
        // Setup the ascii density map
        let nSpaces = 35
        let asciiImage: string = ''

        let spaces = Array(nSpaces).fill(' ')
        let asciiDensityMap = ASCII_ONLY_DENSITY_MAP.concat(spaces)

        const pixelToAsciiMapper = (brightnessValue: number): string => {
            // Map the brightness value to an index in the ascii density map
            const index = Math.floor(
                p5Instance.map(brightnessValue, 0, 255, 0, asciiDensityMap.length)
            )
            // Return a char from the map
            return asciiDensityMap[index]
        }

        const setTextFeatures = (): void => {
            const drawingSize = calculateTextSize(screenDimensions, IMAGE_SIZE)
            p5Instance.textFont(FONT.name)
            p5Instance.textSize(drawingSize)
            p5Instance.textLeading(drawingSize)
            p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER)
            p5Instance.fill(TEXT_COLOUR)
            p5Instance.textStyle('bold')
        }
        const initialiseWebCam = async () => {
            try {
                webcam = new WebcamPixelComponent(handlePixels, VIDEO_CONTRAINTS)
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
            p5Instance.background(BACKGROUND_COLOUR)
            if (pixelStream === undefined) {
                return
            }
            asciiImage = pixelsToAscii(
                pixelStream,
                VIDEO_CONTRAINTS.width,
                VIDEO_CONTRAINTS.height,
                pixelToAsciiMapper
            )

            // Display the image in the middle of the screen
            p5Instance.text(asciiImage, p5Instance.width / 2, p5Instance.height / 2)
        }
        p5Instance.mouseClicked = () => {
            navigator.clipboard.writeText(asciiImage)
            console.log(asciiImage)
            webcam.stopWebcam()
        }

        p5Instance.keyPressed = () => {
            switch (p5Instance.keyCode) {
                case p5Instance.UP_ARROW:
                    nSpaces += 5
                    break
                case p5Instance.DOWN_ARROW:
                    nSpaces = Math.max(nSpaces - 5, 0)
                    break
            }

            spaces = Array(nSpaces).fill(' ')
            asciiDensityMap = ASCII_ONLY_DENSITY_MAP.concat(spaces)
        }
    }
    return { script, cleanup }
}

export default scriptWrapper
