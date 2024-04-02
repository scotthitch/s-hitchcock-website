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
    script: p5ScriptFunction
    scriptID: string
    state: P5ProjectState
}

export interface P5ProjectProps {
    title: string
    scriptID: string
    description: string
    usageInstructions: string
    script: p5ScriptFunction
    state: P5ProjectState
}

export type p5ScriptFunction = (p5: P5) => void

export type emptyFunction = () => void

export interface QuadraticRoot {
    real: number
    imaginary: number
}
