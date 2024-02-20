export interface PolarCoordinates {
    r: number,
    theta: number,
}

export interface CartesianCoordinates {
    x: number,
    y: number,
}

export interface P5Props {
    screenWidth: number,
    screenHeight: number,
}

export interface P5CanvasProps {
    screenWidth: number,
    screenHeight: number,
    script: Function,
    scriptName: HTMLElement
}