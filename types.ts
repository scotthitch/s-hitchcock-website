import P5 from 'p5';

export type PolarCoordinates = {
    r: number;
    theta: number;
};

export type CartesianCoordinates = {
    x: number;
    y: number;
};

export type ScreenDimensions = {
    width: number;
    height: number;
};

export type P5CanvasProps = {
    scriptID: string;
    scriptWrapper: P5ScriptWrapper;
};

export type P5ProjectProps = {
    title: string;
    scriptID: string;
    description: string;
    scriptWrapper: P5ScriptWrapper;
};

export type Project = {
    title: string;
    scriptID: string;
    description: string;
    scriptWrapper: P5ScriptWrapper;
    isMobileOrTabletFriendly: boolean;
    date: Date;
};

export type P5Script = (p5: P5) => void;

export type P5ScriptWrapper = (screenDimensions: ScreenDimensions) => {
    script: P5Script;
    cleanup?: EmptyFunction;
};

export type Companies = 'trimble' | 'bluelab' | 'axys';

export type WorkExperience = {
    company: Companies;
    imgSrc: string;
    dateRange: string;
    href: string;
    skills: string[];
    brief: string;
};

export type ComapanyColourVariants = {
    bg: Record<Companies, string>;
    content: Record<Companies, string>;
};

export type EmptyFunction = () => void;

export type PixelHandler = (pixels: Uint8ClampedArray) => void;

export type QuadraticRoot = {
    real: number;
    imaginary: number;
};
