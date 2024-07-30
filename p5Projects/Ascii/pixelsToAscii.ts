import toGreyScale from './toGreyScale'
import mapping from '../../helpers/mapping'

const ASCII_ONLY_DENSITY_MAP =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~i!lI;:,^`'.".split('')
const N_SPACES = 35
const ASCII_DENSITY_MAP = ASCII_ONLY_DENSITY_MAP.concat(Array(N_SPACES).fill(' '))

const defaultPixelToAsciiMapper = (brightnessValue: number): string => {
    // Map the brightness value to an index in the ascii density map
    const index = Math.floor(mapping(brightnessValue, 0, 255, 0, ASCII_DENSITY_MAP.length))
    // Return a char from the map
    return ASCII_DENSITY_MAP[index]
}

const pixelsToAscii = (
    pixels: Uint8ClampedArray | number[],
    imageWidth: number,
    imageHeight: number,
    pixelToAsciiMapper: (brightnessValue: number) => string = defaultPixelToAsciiMapper
): string => {
    let newAsciiImage = ''
    for (let j = 0; j < imageHeight; j++) {
        // Iterate in reverse direction to horizontally flip the image
        for (let i = imageWidth - 1; i >= 0; i--) {
        // for (let i = 0; i < imageWidth; i++) {
            // Get rgb values
            let pixelIndex = (i + j * imageWidth) * 4
            const r = pixels[pixelIndex + 0]
            const g = pixels[pixelIndex + 1]
            const b = pixels[pixelIndex + 2]

            // Convert rbg to greyscale
            const greyScale = toGreyScale(r, g, b)

            // Add on new char from the mapper
            newAsciiImage += pixelToAsciiMapper(greyScale)
        }

        // Append a new line character after each row
        newAsciiImage += '\n'
    }
    return newAsciiImage
}

export default pixelsToAscii
