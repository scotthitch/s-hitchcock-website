import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5Instance: P5): void => {

        const N_ORBITERS_MAX = 101;
        const orbiters: Orbiter[] = [];
        const AMPLITUDE_COEFFICIENT = p5Instance.max(screenDimensions.width/20, 40);
        const FREQUENCY_COEFFICIENT = 1 / 40;
        let yVals: number[] = [];
        let origin: P5.Vector;
        const NODE_RADIUS = p5Instance.max(screenDimensions.width/230, 4.5); // TODO: make this a fnc of screensize
        const WAVE_MOVE_SPEED = screenDimensions.width/800;
        const WAVE_X_SHIFT = p5Instance.max(screenDimensions.width/2.5, 200);
        let nTermsInSeries = 1;
        let nPreviousTermsInSeries = nTermsInSeries;
        const MAX_LEN = 700;

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height);
            // aSlider = p5Instance.createSlider(1, a, aChoose, 2);
            origin = p5Instance.createVector(p5Instance.width / 5, p5Instance.height / 2);
            // orbiters.push(new Orbiter(atude, 1, radius))
            for (let n = 1; n <= N_ORBITERS_MAX; n++) {
                const amplitude = (1 - Math.pow(-1, n)) / n;
                const frequency = n;
                orbiters.push(new Orbiter(amplitude * AMPLITUDE_COEFFICIENT, frequency * FREQUENCY_COEFFICIENT, NODE_RADIUS))
            }
        }

        p5Instance.draw = () => {
            p5Instance.background(247, 37, 133);
            orbiters[0].orbit(origin.x, origin.y);
            orbiters[0].render();
            p5Instance.fill(250, 243, 221)
            p5Instance.ellipse(origin.x, origin.y, NODE_RADIUS);

            for (let i = 1; i < N_ORBITERS_MAX; i++) {
                orbiters[i].orbit(orbiters[i - 1].x, orbiters[i - 1].y);
                if (i <= nTermsInSeries) {
                    orbiters[i].render();

                }
            }

            orbiters[nTermsInSeries - 1].render(250, 243, 221)
            const finalY = orbiters[nTermsInSeries - 1].y
            yVals.unshift(finalY)
            p5Instance.strokeWeight(NODE_RADIUS*0.4)
            p5Instance.stroke(250, 243, 221);
            p5Instance.line(orbiters[nTermsInSeries - 1].x, finalY, WAVE_X_SHIFT, finalY)
            p5Instance.beginShape();
            p5Instance.noFill();
            for (let j = 0; j < yVals.length; j++) {
                p5Instance.strokeWeight(NODE_RADIUS*0.75)
                p5Instance.vertex(WAVE_MOVE_SPEED * j + WAVE_X_SHIFT, yVals[j])
            }

            p5Instance.endShape();
            p5Instance.strokeWeight(0.4)
            p5Instance.ellipse(origin.x, origin.y, orbiters[0].amplitude * 2)
            for (let i = 1; i < nTermsInSeries - 1; i++) {
                p5Instance.ellipse(orbiters[i].x, orbiters[i].y, orbiters[i + 1].amplitude * 2);
            }

            if (yVals.length > MAX_LEN) {
                yVals = yVals.slice(0, -1);
            }

            if (nTermsInSeries != nPreviousTermsInSeries) {
                // changeA();
                yVals = []
                nPreviousTermsInSeries = nTermsInSeries
            }
        }

        p5Instance.keyPressed = () => {
            if (p5Instance.keyCode === p5Instance.UP_ARROW) {
                nTermsInSeries = Math.min(N_ORBITERS_MAX, nTermsInSeries + 2);
            } else if (p5Instance.keyCode === p5Instance.DOWN_ARROW) {
                nTermsInSeries = Math.max(1, nTermsInSeries - 2)
            }
        }



        class Orbiter {
            amplitude: number;
            frequency: number;
            r: number;
            x: number;
            y: number;
            refX: number;
            refY: number;

            constructor(amplitude: number, f: number, r: number) {
                this.frequency = f;
                this.amplitude = amplitude;
                this.r = r
                this.x = 0;
                this.y = 0;
                this.refX = 0;
                this.refY = 0;
            }
        
            orbit(refX: number, refY: number) {
                this.refX = refX;
                this.refY = refY;
                this.x = refX + this.amplitude * p5Instance.cos(this.frequency * p5Instance.frameCount);
                this.y = refY + this.amplitude * p5Instance.sin(this.frequency * p5Instance.frameCount);
            }

            render(r = 250, g = 243, b = 221) {
                p5Instance.stroke(r, g, b);
                p5Instance.strokeWeight(3)
                p5Instance.line(this.refX, this.refY, this.x, this.y)
                p5Instance.fill(r, g, b);
                p5Instance.ellipse(this.x, this.y, this.r)
                p5Instance.noFill();
            }
        }
    }
    return s;
}


  
export default script;