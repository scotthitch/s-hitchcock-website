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
import { parse, compareAsc } from 'date-fns';
import { isMobileOrTablet } from '~/helpers/deviceType';

import type { ProjectType } from '~/types';

const MONTH_YEAR_FORMAT = 'MM-yyyy';

const projects: ProjectType[] = [
    {
        title: 'Fourier Series',
        scriptID: 'fourier-series',
        description:
            'Sinusoidal terms summing to approximate a square wave. Click to change the number of terms',
        scriptWrapper: fourierSeriesScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('06-2022', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Waterfall',
        scriptID: 'waterfall',
        description: 'A cascade of veils built using Perlin Noise',
        scriptWrapper: waterfallScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('07-2022', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Ascii',
        scriptID: 'ascii',
        description: 'Converts the video feed into ASCII art',
        scriptWrapper: asciiScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2024', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Unknown Pleasures',
        scriptID: 'unknown-pleasures',
        description:
            "Inspired by Joy Division's Unknown Pleasures album art and built using Gaussian distribution plus some random noise",
        scriptWrapper: unknownPleasuresScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('02-2023', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Perlin Flow Field',
        scriptID: 'perlin-flow-field',
        description: 'A random vector flow field generated using 2D Perlin Noise',
        scriptWrapper: perlinFlowFieldScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('08-2023', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Tiling',
        scriptID: 'tiling',
        description: 'Click to change the zoom and tilt',
        scriptWrapper: tilingScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('02-2022', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Radial',
        scriptID: 'radial',
        description: 'Press the up and down arrows to change the number of reflections',
        scriptWrapper: radialScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('05-2021', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Ball Cascade',
        scriptID: 'ball-cascade',
        description: 'Not much to do here. You can flip gravity by clicking',
        scriptWrapper: ballCascadeScriptWrapper,
        isMobileOrTabletFriendly: false,
        date: parse('03-2021', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Growing Circle',
        scriptID: 'growing-circle',
        description: 'Just sit back and relax',
        scriptWrapper: growingCircleScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('02-2024', MONTH_YEAR_FORMAT, new Date())
    },
    {
        title: 'Fireworks',
        scriptID: 'fireworks',
        description: 'Click to shoot some fireworks',
        scriptWrapper: fireworksScriptWrapper,
        isMobileOrTabletFriendly: true,
        date: parse('05-2024', MONTH_YEAR_FORMAT, new Date())
    }
];

// Omit non-mobile friendly projects if on mobile or tablet
const filterProjects = (projects: ProjectType[]): ProjectType[] => {
    if (isMobileOrTablet()) {
        return projects.filter((project) => project.isMobileOrTabletFriendly);
    }

    return projects;
};

// Sort by date in descending order
const sortProjects = (projects: ProjectType[]): ProjectType[] => {
    const sortedProjects = [...projects].sort((a: ProjectType, b: ProjectType) =>
        compareAsc(b.date, a.date)
    );
    return sortedProjects;
};

// Filter then sort then export result
const filteredProjects = filterProjects(projects);
const sortedProjects = sortProjects(filteredProjects);
export default sortedProjects;
