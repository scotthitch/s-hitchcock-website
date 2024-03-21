import P5 from "p5";

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
    script: p5ScriptWrapperFunction,
    scriptID: string
}

export interface P5ProjectProps {
    title: string,
    scriptID: string,
    description: string,
    usageInstructions: string,
    script: p5ScriptWrapperFunction,
    projectDimensions: ScreenDimensions
}

export type p5ScriptInnerFunction = (p5: P5) => void;
export type p5ScriptWrapperFunction = (screenDimensions: ScreenDimensions) => p5ScriptInnerFunction;

export interface QuadraticRoot {
    real: number,
    imaginary: number
}