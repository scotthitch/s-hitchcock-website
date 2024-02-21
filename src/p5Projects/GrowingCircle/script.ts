import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        let pts = [];
        let r = 120;
        let numPts = 15;
        let angChng = 2 * Math.PI / numPts;
        let theta = 0;
        let buffer;
        let radii = [];
        let xOffArray = [];
        let xOff = 0;
        let colVal = 0;
        let xP;
        let yP;
        let counter;

        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height);
            // pixelDensity(1);
            // frameRate(10)
            // radii = Array(numPts).fill(random(r - r * 0.1, r + r * 0.1));
            counter = 0;

            for (let o = 0; o < numPts; o++) {
                radii[o] = p5.random(r - r * 0.2, r + r * 0.2);
                // radii[o] = r;
                xOffArray[o] = counter;
                counter += 1000;
            }

            buffer = p5.createGraphics(p5.width, p5.height);

            for (let i = 0; i < numPts; i++) {
                r = radii[i];

                xP = r * p5.sin(theta) + p5.width / 2;
                yP = -r * p5.cos(theta) + p5.height / 2;
                pts.push(p5.createVector(xP, yP));
                theta += angChng;
                // po = 0;

            }
            // console.log(pts);

            // points.push(createVector(150, 150));
        }

        p5.draw = () => {
            p5.background(0);
            // po += 10;
            buffer.noFill();
            // fill(255,0,0);
            p5.image(buffer, 0, 0);
            // buffer.background(255);

            // translate(width / 2, height / 2)
            buffer.stroke(255, 255, 255);
            // buffer.stroke(254, 250, 215);
            buffer.strokeWeight(0.1);

            buffer.beginShape();
            buffer.curveVertex(pts[pts.length - 1].x, pts[pts.length - 1].y);

            for (let j = 0; j < pts.length; j++) {
                buffer.curveVertex(pts[j].x, pts[j].y);
                // buffer.strokeWeight(1);

                // buffer.ellipse(pts[j].x, pts[j].y, 2)
                // console.log(j);

            }
            buffer.curveVertex(pts[0].x, pts[0].y);
            buffer.curveVertex(pts[1].x, pts[1].y);
            buffer.endShape();

            theta = 0;
            for (let nn = 0; nn < pts.length; nn++) {

                r = radii[nn] + p5.random(-3, 3.5);
                // r = min(r, 200);
                // r = max(r, 30);        
                xOffArray[nn] += 0.001;
                radii[nn] = r;
                xP = r * p5.sin(theta) + p5.width / 2;
                yP = -r * p5.cos(theta) + p5.height / 2;
                pts[nn] = (p5.createVector(xP, yP));
                theta += angChng;
            }
            // colVal += 0.4;

            // ellipse(0, 0, r*2)
        }


    }
    return s;
}


  
export default script;