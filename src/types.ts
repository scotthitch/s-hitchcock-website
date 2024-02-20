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
    scriptIsPlaying: boolean,
}

export interface P5ScriptProps {
    screenWidth: number,
    screenHeight: number,
    script: Function,
    scriptIsPlaying: boolean,
    scriptName: HTMLElement

}