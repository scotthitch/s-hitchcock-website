import { isMobileOrTablet } from '~/helpers/deviceType'

export const FONT = {
    name: 'Courier' as const,
    aspectRatio: 5 / 3
} as const
export const IMAGE_SIZE = isMobileOrTablet ? 85 : 100

// Ensure that width and height are numbers
interface CustomMediaTrackConstraints extends MediaTrackConstraints {
    width: number
    height: number
}

export const MEDIA_CONSTRAINTS: CustomMediaTrackConstraints = {
    width: Math.floor(IMAGE_SIZE * FONT.aspectRatio),
    height: IMAGE_SIZE,
    frameRate: 60
    // facingMode: { ideal: 'user' }
}

export const TEXT_COLOUR = '#000000'
export const BACKGROUND_COLOUR = '#EB1E4E'
export const ASCII_ONLY_DENSITY_MAP =
    "░░░$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~i!lI;:,^`'.".split('')

export const BRIGHTNESS_INCREMENT = 5
