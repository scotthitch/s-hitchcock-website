import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5: P5): void => {
        let veils = [];
        let numVeils = 16;
        let veilsMin2 = numVeils - 2;
        let colours = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"]
        let inc;
        let flux;

        p5.setup = () => {
            p5.createCanvas(screenDimensions.width, screenDimensions.height);
            // let colVal = 255;
            inc = 2 * p5.height / veilsMin2;
            flux = 80;

            let colIndex = 1;
            let prevColIndex = colIndex;
            for (let j = -inc; j < p5.height + inc; j += inc / 2) {
                colIndex = generateRandomIndex(prevColIndex, colours.length);
                prevColIndex = colIndex;
                let v = new Veil(j, flux, colours[colIndex], colIndex);
                veils.push(v)
                v.calcTopRow();
            }

        }

        p5.draw = () => {
            p5.background(0);

            for (let v of veils) {
                v.draw();
                v.move();
                if (v.heightAvg > p5.height + inc) {
                    v.heightAvg = veils[0].heightAvg - inc / 2;
                    veils.unshift(veils.pop())

                }
            }

        }



        const generateRandomIndex = (prevVal, max) => {
            let val = prevVal;
            while (val === prevVal) {
                val = Math.floor(Math.random() * (max)); 
            }
            return val;
        }



        class Veil {
            constructor(heightAvg, flux, colVal, colIndex) {
              // this.yAvg = yAvg;
              this.heightAvg = heightAvg;
              this.colVal = colVal;
              this.flux = flux;
              this.colIndex = colIndex;
              this.topRowArray = [];
              this.xOff = p5.random(0, 100);
            }
          
            draw() {
              p5.fill(this.colVal);
              p5.noStroke();
          
              p5.beginShape();
              p5.curveVertex(0, p5.height);
              p5.curveVertex(0, p5.height);
              p5.curveVertex(-20, this.heightAvg);
              for (let i = 0; i < this.topRowArray.length; i++) {
                p5.curveVertex(this.topRowArray[i].x, this.topRowArray[i].y);
              }
              p5.curveVertex(p5.width + 20, this.heightAvg);
              p5.curveVertex(p5.width, p5.height);
              p5.curveVertex(p5.width, p5.height);
              p5.endShape();
            }
          
            calcTopRow() {
              this.topRowArray = [];
              for (let i = 0; i <= p5.width; i += p5.width / 5) {
                let yVal = this.heightAvg - p5.noise(i + this.xOff) * this.flux;
                this.topRowArray.push(p5.createVector(i, yVal));
              }
            }
          
            move() {
              this.heightAvg += 1;
              this.shimmer();
            }
          
            shimmer() {
              for (let i = 0; i < this.topRowArray.length; i++) {
                let newY = this.heightAvg - p5.noise(i + this.xOff) * this.flux;
                this.topRowArray[i].y = newY;
              }
              this.xOff += 0.009;
            }
          }
          
    }
    return s;
}


  
export default script;