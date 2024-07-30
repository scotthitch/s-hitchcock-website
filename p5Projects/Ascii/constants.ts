export const FONT = {
    name: 'Courier',
    aspectRatio: 5 / 3
}
export const IMAGE_SIZE = 100

export const VIDEO_CONTRAINTS: MediaTrackConstraints = {
    width: Math.floor(IMAGE_SIZE * FONT.aspectRatio),
    height: IMAGE_SIZE,
    frameRate: 60,
    facingMode: { ideal: 'user' }
} as const

export const TEXT_COLOUR = '#000000'
export const BACKGROUND_COLOUR = '#EB1E4E'
export const ASCII_ONLY_DENSITY_MAP =
    "░░░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~i!lI;:,^`'.".split('')