import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        // Params for drawing the initial shape
        const INITAL_SHAPE_MEAN_RADIUS = 120;
        const INITIAL_SHAPE_NOISE_FACTOR = 0.2;
        
        // Shape parameters
        const N_SHAPE_NODES = 15;
        const ANGLE_BETWEEN_NODES = 2 * Math.PI / N_SHAPE_NODES;
        const STROKE_WEIGHT =  2.5;
        const OPACITY = 30; // %
        
        // Growth rate constants
        const GROWTH_INCREMENT = 0.22;
        const GROWTH_NOISE = 17; // % of growth increment

        // const BACKGROUND_COLOUR = "#D2BBA0"
        // const PRIMARY_COLOUR = "#54457F"
        
        const BACKGROUND_COLOUR = "#f00000";
        const PRIMARY_COLOUR = "#ffedc7";

        const shapeNodesRadii: number[] = [];

        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height);
            p5.background(BACKGROUND_COLOUR)
            
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
            const col = p5.color(PRIMARY_COLOUR)
            col.setAlpha(OPACITY)

            p5.stroke(col);
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