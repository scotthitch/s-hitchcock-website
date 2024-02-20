import type { P5Props } from '../../types'
import P5 from 'p5' // Package from npm

const script = (props: P5Props) => {
    const s = (p5: P5) => {
        const balls: Ball[] = [];
        let gravDir = 1;
        
        
        // Setup the canvas
        p5.setup = () => {
            p5.createCanvas(props.screenWidth, props.screenHeight);

        };
    
        // Redraw the canvas on every iteration
        p5.draw = () => {
            p5.background(30);
            if (!(p5.mouseX == 0 && p5.mouseY == 0)){
            balls.push(new Ball(p5.mouseX, p5.mouseY, gravDir));
                for (const ball of balls) {
                    ball.move();
                    ball.render();
                }
        
                if (balls.length > 250) {
                    balls.splice(0, 1);
                }
            }
        }

        p5.mousePressed = () => {
            gravDir *= -1;
        }

        class Ball {
            r: number;
            xPos: number;
            yPos: number;
            xVel: number;
            yVel: number;
            yAcc: number;
            colours: string[];
            index: number;
            colour: string;

            constructor(xPos: number, yPos: number, gravDir: number) {
                this.r = p5.random(5, 10);
                this.xPos = xPos;
                this.yPos = yPos;
                this.xVel = p5.random(-1.1, 1.1);
                if(gravDir > 0) {
                    this.yVel = p5.random(0, -2);
        
                }else {
                    this.yVel = p5.random(0, 1);
        
                }
                this.yAcc = 0.05 * gravDir;
                
                this.colours = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"]
                this.index = p5.floor(p5.random(0, this.colours.length));
                this.colour = this.colours[this.index];
            }
        
            move() {
                this.yVel += this.yAcc;
                this.xPos += this.xVel
                this.yPos += this.yVel
            }
        
            render() {
                p5.noStroke();
                p5.fill(this.colour);
                p5.ellipse(this.xPos, this.yPos, this.r);
        
            }
        }
    }
    return s;
}


  
export default script;