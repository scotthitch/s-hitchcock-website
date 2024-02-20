import type { PolarCoordinates, CartesianCoordinates, P5Props } from '../../types'
import P5 from 'p5' // Package from npm

const script = (props: P5Props) => {
    const s = (p5: P5) => {
        const X_LEFT_DRAWING_BOUNDS = props.screenWidth/20;
        const X_RIGHT_DRAWING_BOUNDS = props.screenWidth - X_LEFT_DRAWING_BOUNDS;
        const Y_TOP_DRAWING_BOUNDS = props.screenHeight/20;
        const Y_BOTTOM_DRAWING_BOUNDS = props.screenHeight - Y_TOP_DRAWING_BOUNDS;
        const ONE_OVER_ROOT_2_PI = 1 / Math.sqrt(Math.PI);

        let xStep;
        let yStep;
        let mu = 250;
        let preMu = mu;
        let sd = 40;
        let sdMin;
        let sdMax;
        let preSd = sd;
        let magn = 600;
        let preMagn = magn;
        let isLooping = 1;

        p5.setup = () => {
            p5.createCanvas(props.screenWidth, props.screenWidth);       

            xStep = (X_RIGHT_DRAWING_BOUNDS - X_LEFT_DRAWING_BOUNDS) / 100;
            yStep = (Y_BOTTOM_DRAWING_BOUNDS - Y_TOP_DRAWING_BOUNDS) / 60;


            sdMin = p5.height / 45;
            sdMax = p5.height / 6;

            p5.strokeWeight(p5.height / 350);
            renderAll();
        }

        function renderAll() {
            p5.background(0, 32, 63);
            for (let j = Y_TOP_DRAWING_BOUNDS; j <= Y_BOTTOM_DRAWING_BOUNDS; j += yStep) {
                let y1 = j;
                let x1 = X_LEFT_DRAWING_BOUNDS;



                p5.beginShape();

                p5.curveVertex(x1, y1)
                let yVal, xVal;
                for (let i = X_LEFT_DRAWING_BOUNDS; i <= X_RIGHT_DRAWING_BOUNDS; i += xStep) {

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

            mu = p5.mouseX;
            if (mu != preMu) {
                muChanged();
            }

            sd = p5.map(p5.mouseY, 0, p5.height, sdMin, sdMax, true);
            if (sd != preSd) {
                sdChanged()
            }
        }

        function muChanged() {
            preMu = mu;
            renderAll();
        }

        function sdChanged() {
            preSd = sd;
            renderAll();
        }



        function deltaY(x) {
            let sign = 1;
            if (Math.random() > 0.5) {
                sign *= -1;
            }
            let power = Math.exp(-((x - mu) * (x - mu)) / (2 * sd * sd))
            let y = ((power * ONE_OVER_ROOT_2_PI) / sd) * sign
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

        p5.keyPressed = () => {
            if (p5.keyCode === p5.UP_ARROW) {
                if (magn === 1000) {
                    
                } else {
                    magn = Math.min(1000, magn + 50);
                    renderAll();
                }
            } else if (p5.keyCode === p5.DOWN_ARROW) {
                if (magn === 0) {

                } else {
                    magn = Math.max(0, magn - 50);
                    renderAll();
                }
            }
        }







    }
    return s;
}


  
export default script;