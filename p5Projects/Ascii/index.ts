import P5 from 'p5' // Package from npm
import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '~/types'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const myAscii = "@&%$#[]{}|()?/*!+<>;=^,_:'-.`"
    console.log(myAscii.length)

    const script = (p5Instance: P5): void => {
        let video: P5.Element

        // const img = p5Instance.loadImage('cam.jpg')
        // Setup the canvas
        p5Instance.setup = () => {
            let constraints = {
                audio: false
            }

            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            p5Instance.background(0)
            video = p5Instance.createCapture('video')
            video.hide()

            // p5Instance.image(img, 0, 0)
        }
        let counter = 0
        p5Instance.draw = () => {
            p5Instance.background(0)

            // p5Instance.translate(capture.width, 0)
            // p5Instance.scale(-1, 1)
            video.loadPixels()
            for (let j = 0; j < video.height; j++) {
                for (let i = 0; i < video.width; i++) {
                    let pixelIndex = (i + j * video.width) * 4
                    let r = video.pixels[pixelIndex + 0]
                    let g = video.pixels[pixelIndex + 1]
                    let b = video.pixels[pixelIndex + 2]

                    let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b
                    // console.log(r, g, b)
                    video.pixels[pixelIndex + 0] = bright
                    video.pixels[pixelIndex + 1] = bright
                    video.pixels[pixelIndex + 2] = bright
                    // console.log('get')
                    // let px = capture.get(x, y)
                    // r = px
                }
            }
            video.updatePixels()
            p5Instance.image(video, 0, 0)


            //         let px = capture.get(x, y)
            //         let r = px[0]
            //         let g = px[1]
            //         let b = px[2]
            //         let bright = 0.2126 * r + 0.7152 * g + 0.0722 * b
            //         capture.set(x, y, p5Instance.color(bright))
            //     }
            // }
            // capture.updatePixels();
            // p5Instance.image(capture, p5Instance.width/2,0);
        }
    }
    return script
}

export default scriptWrapper
