import P5 from 'p5'

export interface PolarCoordinates {
    r: number
    theta: number
}

export interface CartesianCoordinates {
    x: number
    y: number
}

export interface ScreenDimensions {
    width: number
    height: number
}

export type P5ProjectState = 'visible' | 'neighbour' | 'invisible'

export interface P5CanvasProps {
    scriptID: string
    scriptWrapper: p5ScriptWrapper
    screenDimensions: ScreenDimensions
    state: P5ProjectState
}

export interface P5ProjectProps {
    title: string
    scriptID: string
    description: string
    usageInstructions: string
    scriptWrapper: p5ScriptWrapper
    state: P5ProjectState
}

export type p5Script = (p5: P5) => void

export type p5ScriptWrapper = (screenDimensions: ScreenDimensions) => p5Script

export type emptyFunction = () => void

export interface QuadraticRoot {
    real: number
    imaginary: number
}
