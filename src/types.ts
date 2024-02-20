export interface PolarCoordinates {
    r: number,
    theta: number,
}

export interface CartesianCoordinates {
    x: number,
    y: number,
}

export interface ScreenDimensions {
    width: number,
    height: number,
}

export interface P5CanvasProps {
    screenDimensions: ScreenDimensions,
    script: Function,
    scriptName: HTMLElement
}