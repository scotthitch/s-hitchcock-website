import P5 from 'p5'

export type PolarCoordinates = {
    r: number
    theta: number
}

export type CartesianCoordinates = {
    x: number
    y: number
}

export type ScreenDimensions = {
    width: number
    height: number
}

// export type P5ProjectState = 'visible' | 'neighbour' | 'invisible'

export type P5CanvasProps = {
    scriptID: string
    scriptWrapper: p5ScriptWrapper
}

export type P5ProjectProps = {
    title: string
    scriptID: string
    description: string
    scriptWrapper: p5ScriptWrapper
}

export type projectsType = {
    title: string
    scriptID: string
    description: string
    scriptWrapper: p5ScriptWrapper
    isMobileOrTabletFriendly: boolean
}

export type p5Script = (p5: P5) => void

export type p5ScriptWrapper = (screenDimensions: ScreenDimensions) => {
    script: p5Script
    cleanup?: emptyFunction
}

export type emptyFunction = () => void

export type pixelHandler = (pixels: Uint8ClampedArray) => void

export type QuadraticRoot = {
    real: number
    imaginary: number
}
