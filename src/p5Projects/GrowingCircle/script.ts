import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        // Params for drawing the initial shape
        const INITAL_SHAPE_MEAN_RADIUS = screenDimensions.width * 0.25;
        const INITIAL_SHAPE_NOISE_FACTOR = 0.2;
        
        // Shape parameters
        const N_SHAPE_NODES = 15;
        const ANGLE_BETWEEN_NODES = 2 * Math.PI / N_SHAPE_NODES;
        const STROKE_WEIGHT =  screenDimensions.width * 0.005;
        const OPACITY = 25; // %
        
        // Growth rate constants
        const GROWTH_INCREMENT = screenDimensions.width * 0.0004;
        const GROWTH_NOISE = screenDimensions.width * 0.04; // % of growth increment
        
        const shapeNodesRadii: number[] = [];

        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height);
            p5.background(0)
            
            for (let i = 0; i < N_SHAPE_NODES; i++) {
                const nodeRadius = p5.random(
                    INITAL_SHAPE_MEAN_RADIUS * (1-INITIAL_SHAPE_NOISE_FACTOR),
                    INITAL_SHAPE_MEAN_RADIUS * (1+INITIAL_SHAPE_NOISE_FACTOR)
                );
                shapeNodesRadii.push(nodeRadius)                    
            }
        }
        
        p5.draw = () => {
            setDrawParameters();
            drawShape();
            growShape();
        }

        const growShape = () => {
            for (let i = 0; i < N_SHAPE_NODES; i++) {
                shapeNodesRadii[i] += 
                    GROWTH_INCREMENT * (1 + p5.random(-GROWTH_NOISE, GROWTH_NOISE))
            }
        }

        const setDrawParameters = () => {
            p5.translate(p5.width/2, p5.height/2)
            p5.stroke(255, 255, 255, OPACITY);
            p5.strokeWeight(STROKE_WEIGHT);
            p5.noFill();
        }

        const drawShape = () => {
            // drawShape();
            p5.beginShape();
            addVertexAtIndex(shapeNodesRadii.length-1);
            for (let i = 0; i < N_SHAPE_NODES; i++) {
                addVertexAtIndex(i);
            }
            addVertexAtIndex(0);
            addVertexAtIndex(1);            
            p5.endShape()
        }

        const addVertexAtIndex = (index: number) => {
            const radius = shapeNodesRadii[index];
            const theta = index * ANGLE_BETWEEN_NODES;

            p5.curveVertex(radius*p5.cos(theta), radius*p5.sin(theta)           
            )
        }


    }
    return s;
}


  
export default script;