import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5, { Vector } from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        const GRID_ITEM_WIDTH = screenDimensions.width/400;
        const FORCE_SCALE_FACTOR = 50;
        const N_POINTS = 10000;
        const NOISE_SCALE = 0.04;
        const CURL = 0.6
        const POINT_VELOCITY_LIMIT = 1;
        const POINT_OPACITY = 3; // %
        const RANDOM_BASE_OFFSET = p5.random(2*p5.TWO_PI);
        const BACKGROUND_COLOUR = "#FF1B1C";
        const PRIMARY_COLOUR = "#FFE099";
        const POINT_SIZE = Math.min(screenDimensions.height, screenDimensions.width) / 200;
        
        let grassPatches = [];
        let points = [];
        
        function generatePerlinForcePatch(i, j) {
            let pos = p5.createVector(i * GRID_ITEM_WIDTH, j * GRID_ITEM_WIDTH);
            
            let angle = p5.noise(i * NOISE_SCALE, j * NOISE_SCALE)*CURL*p5.TWO_PI + RANDOM_BASE_OFFSET; // Adjust noise parameters
            let force = Vector.fromAngle(angle);
            // p5.fromAng÷
            // Vector.fromAngle
            // p5.Vec
            // p5.vec
            force.setMag(FORCE_SCALE_FACTOR);
            
            grassPatches[i][j] = (
                new GrassPatch(pos, GRID_ITEM_WIDTH, force, FORCE_SCALE_FACTOR)
            );
        }
        
        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height);
            p5.background(BACKGROUND_COLOUR);
        
            // Generate points
            for (let i = 0; i < N_POINTS; i++) {
                const screenBounds = p5.createVector(p5.width, p5.height);
                const pointPos = p5.createVector(Math.random() * p5.width, Math.random() * p5.height);
                points.push(new Point(pointPos, screenBounds));
            }
        
            // Generate grass patches
            for (let i = 0; i < p5.width/GRID_ITEM_WIDTH; i++) 
            {
                grassPatches[i] = [];
                for (let j = 0; j < p5.height/GRID_ITEM_WIDTH; j++) 
                {
                    generatePerlinForcePatch(i, j);
                }
            }
        }
        
        p5.draw = () => {
            // background(30);
        
            points.forEach((point) => {
                let [i, j] = point.positionAsIndex(GRID_ITEM_WIDTH);
                point.updatePosition(grassPatches[i][j].getForce())
                point.display();
            })

        }

        class Point {
            constructor(pos, screenBounds) {
                this.originalPos = pos.copy();
                this.pos = pos;
                this.vel = p5.createVector(0, 0);
                this.acc = p5.createVector(0, 0);
                this.screenBounds = screenBounds;
            }
        
            withinBounds() {
                return ((this.pos.x <= this.screenBounds.x) &&
                        (this.pos.y <= this.screenBounds.y) &&
                        this.pos.x >= 0 &&
                        this.pos.y >= 0)
            }
        
            resetPoint() {
                // this.pos = this.originalPos.copy();
        
                this.pos = p5.createVector(Math.random() * this.screenBounds.x, Math.random() * this.screenBounds.y);
                this.vel = p5.createVector(0, 0);
                this.acc = p5.createVector(0, 0);
            }
        
            updatePosition(force) {
                this.acc = force;
                this.vel.add(this.acc);
                this.vel.limit(POINT_VELOCITY_LIMIT)
                this.pos.add(this.vel);
        
  
                if (!this.withinBounds()) {
                    this.resetPoint();
                }
            }
        
            display() {
                // let col = ;
                // col.setAlpha
                const pointColour = p5.color(PRIMARY_COLOUR);
                pointColour.setAlpha(POINT_OPACITY);
                p5.fill(pointColour);
                p5.noStroke();
                p5.ellipse(this.pos.x, this.pos.y, POINT_SIZE);
            }
        
            // need some bounds checker
            positionAsIndex(scaleFactor) {
                let i = Math.floor(this.pos.x / scaleFactor);
                let j = Math.floor(this.pos.y / scaleFactor);
        
                return [i, j]
            }
        }

        class GrassPatch {
            constructor(pos, width, force, forceScaleFactor) {
                this.pos = pos;
                this.width = width;
                this.force = force;
                this.forceScaleFactor = forceScaleFactor;
            }
        
            displayWind() {
                // Calculate the line
                let forceArm = p5.Vector.mult(this.force, this.width/(2*this.forceScaleFactor));
        
                let xWindBase = this.pos.x + this.width/2;
                let yWindBase = this.pos.y + this.width/2;
                let xWindTip = xWindBase + forceArm.x;
                let yWindTip = yWindBase + forceArm.y;
        
                // Display
                p5.noFill();
                p5.stroke(255);
                p5.strokeWeight(this.force.mag() * 50);
                p5.line(xWindBase, yWindBase, xWindTip, yWindTip);
            }
        
            displayGrid() {
                p5.noFill();
                p5.stroke(255, 255, 255);
                p5.strokeWeight(1)
                p5.rect(this.pos.x, this.pos.y, this.width, this.width);
            }
        
            indicateGrid() {
                p5.noFill();
                p5.stroke(255, 0, 0);
                p5.strokeWeight(1)
                p5.rect(this.pos.x, this.pos.y, this.width, this.width);
            }
        
            getForce() {
                return this.force;
            }
        }
        
        

    }
    return s;
}


  
export default script;