import ballCascadeScriptWrapper from '~/p5Projects/BallCascade';
import fireworksScriptWrapper from '~/p5Projects/Fireworks';
import fourierSeriesScriptWrapper from '~/p5Projects/FourierSeries';
import growingCircleScriptWrapper from '~/p5Projects/GrowingCircle';
import perlinFlowFieldScriptWrapper from '~/p5Projects/PerlinFlowField';
import radialScriptWrapper from '~/p5Projects/Radial';
import tilingScriptWrapper from '~/p5Projects/Tiling';
import unknownPleasuresScriptWrapper from '~/p5Projects/UnknownPleasures';
import waterfallScriptWrapper from '~/p5Projects/Waterfall';
import asciiScriptWrapper from '~/p5Projects/Ascii';
import { parse } from 'date-fns';

import type { projectType } from '~/types';

const inputFormat = 'MM-yyyy';

const projects: projectType[] = [
    {
        title: 'Fourier Series',
        scriptID: 'fourier-series',
        description:
            'Sinusoidal terms summing to approximate a square wave. Click to change the number of terms',
        scriptWrapper: fourierSeriesScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2024', inputFormat, new Date())
    },
    {
        title: 'Waterfall',
        scriptID: 'waterfall',
        description: 'A cascade of veils built using Perlin Noise',
        scriptWrapper: waterfallScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2024', inputFormat, new Date())
    },
    {
        title: 'Ascii',
        scriptID: 'ascii',
        description: 'Converts the video feed into ASCII art',
        scriptWrapper: asciiScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Unknown Pleasures',
        scriptID: 'unknown-pleasures',
        description:
            "Inspired by Joy Division's Unknown Pleasures album art and built using Gaussian distribution plus some random noise",
        scriptWrapper: unknownPleasuresScriptWrapper,
        isMobileOrTabletFriendly: false,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Perlin Flow Field',
        scriptID: 'perlin-flow-field',
        description: 'A random vector flow field generated using 2D Perlin Noise',
        scriptWrapper: perlinFlowFieldScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Tiling',
        scriptID: 'tiling',
        description: 'Click to change the zoom and tilt',
        scriptWrapper: tilingScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Radial',
        scriptID: 'radial',
        description: 'Press the up and down arrows to change the number of reflections',
        scriptWrapper: radialScriptWrapper,
        isMobileOrTabletFriendly: false,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Ball Cascade',
        scriptID: 'ball-cascade',
        description: 'Not much to do here. You can flip gravity by clicking',
        scriptWrapper: ballCascadeScriptWrapper,
        isMobileOrTabletFriendly: false,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Growing Circle',
        scriptID: 'growing-circle',
        description: 'Just sit back and relax',
        scriptWrapper: growingCircleScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2023', inputFormat, new Date())
    },
    {
        title: 'Fireworks',
        scriptID: 'fireworks',
        description: 'Click to shoot some fireworks',
        scriptWrapper: fireworksScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2023', inputFormat, new Date())
    }
];

export default projects;
