import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        const X_LEFT_DRAWING_BOUNDS = screenDimensions.width/20;
        const X_RIGHT_DRAWING_BOUNDS = screenDimensions.width - X_LEFT_DRAWING_BOUNDS;
        const Y_TOP_DRAWING_BOUNDS = screenDimensions.height/20;
        const Y_BOTTOM_DRAWING_BOUNDS = screenDimensions.height - Y_TOP_DRAWING_BOUNDS;
        const ONE_OVER_ROOT_2_PI = 1 / Math.sqrt(Math.PI);

        const X_STEP = (X_RIGHT_DRAWING_BOUNDS - X_LEFT_DRAWING_BOUNDS) / 100;
        const Y_STEP = (Y_BOTTOM_DRAWING_BOUNDS - Y_TOP_DRAWING_BOUNDS) / 60;
        const MIN_STANDARD_DEVIATION = screenDimensions.height / 45;
        const MAX_STANDARD_DEVIATION = screenDimensions.height / 6;
        let MU = 250;
        let PREVIOUS_MU = MU;
        let STANDARD_DEVIATION = 40;
        let preSd = STANDARD_DEVIATION;
        const magn = 800;
        let isLooping = 1;

        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height);
            p5.strokeWeight(p5.height / 350);
            firstRender();
        }

        function firstRender() {
            p5.background(0, 32, 63);
            for (let j = Y_TOP_DRAWING_BOUNDS; j <= Y_BOTTOM_DRAWING_BOUNDS; j += Y_STEP) {
                const y1 = j;
                const x1 = X_LEFT_DRAWING_BOUNDS;

                p5.beginShape();

                p5.curveVertex(x1, y1)
                let xVal = 0;
                let yVal = 0;
                for (let i = X_LEFT_DRAWING_BOUNDS; i <= X_RIGHT_DRAWING_BOUNDS; i += X_STEP) {

                    yVal = deltaY(i) + j
                    xVal = i;
                    p5.noFill();

                    p5.curveVertex(xVal, yVal);
                    if (p5.random() < 0.7) {
                        p5.stroke(173, 232, 244);
                    } else {
                        p5.stroke(72, 202, 228)
                    }

                }
                p5.curveVertex(xVal, yVal)
                p5.endShape();


            }
        }

        p5.draw = () => {

            MU = p5.mouseX;
            if (MU != PREVIOUS_MU) {
                muChanged();
            }

            STANDARD_DEVIATION = p5.map(p5.mouseY, 0, p5.height, MIN_STANDARD_DEVIATION, MAX_STANDARD_DEVIATION, true);
            if (STANDARD_DEVIATION != preSd) {
                sdChanged()
            }
        }

        function muChanged() {
            PREVIOUS_MU = MU;
            firstRender();
        }

        function sdChanged() {
            preSd = STANDARD_DEVIATION;
            firstRender();
        }



        function deltaY(x: number) {
            let sign = 1;
            if (Math.random() > 0.5) {
                sign *= -1;
            }
            const power = Math.exp(-((x - MU) * (x - MU)) / (2 * STANDARD_DEVIATION * STANDARD_DEVIATION))
            let y = ((power * ONE_OVER_ROOT_2_PI) / STANDARD_DEVIATION) * sign
            y *= magn;
            y *= p5.random(0.4, 1.4)
            return y;

        }

        p5.mouseClicked = () => {
            if (isLooping) {
                p5.noLoop();
                isLooping = 0;
            } else {
                p5.loop();
                isLooping = 1;
            }
        }
    }
    return s;
}


  
export default script;