import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5Instance: P5): void => {

        const GRAVITY = p5Instance.createVector(0, -0.25)
        const missiles: Missile[] = [];

        p5Instance.setup = () => {
          p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
        }
        
        p5Instance.draw = () => {
          console.log(missiles.length)
          p5Instance.background(0, 0, 0, 50)
          // p5Instance.
          missiles.forEach((missile, index, missilesArray) => {
            missile.fly()
            missile.draw()

            if (missile.hasExploded) {
              generateExplodedFireworks(missile.position, missile.velocity)
              missilesArray.splice(index, 1)
              return
            }

            // If missile out of screen then remove it
            if (missile.belowScreenBottom(0)) {
              missilesArray.splice(index, 1)
            }
          })
        }

        const generateExplodedFireworks = (parentPosition: P5.Vector, parentVelocity: P5.Vector) => {
          const n = 12;
          const angleDelta = p5Instance.TWO_PI / n;
          for (let i: number = 0; i < n; i++) {
            const angle = angleDelta * i * p5Instance.random(1, 1.08);
            const missileVelocity = P5.Vector.fromAngle(angle, 2.6).mult(p5Instance.random(1, 1.08));
            missiles.push(new Missile(parentPosition.copy(), missileVelocity, 1000))
          }          
        }

        const quadraticRoots = (a: number, b: number, c: number) => {
          let discriminant = b*b - 4*a*c;
          let roots = [];
      
          // Only checking for the valid case. might do something for other cases
          if (discriminant > 0) {
              let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
              let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
              roots.push(root1, root2);
          }
      
          return roots;
        }

        const calculateFlightParamsFromClick = (p0: P5.Vector, p2: P5.Vector): {initialVelocity: P5.Vector, explodeTime: number} => {
          const maxHeight = p2.y*1.15

          const initialVelocity_y = p5Instance.sqrt(-maxHeight*2*GRAVITY.y); 
          const t2 = p5Instance.max([... quadraticRoots(1/2 * GRAVITY.y, initialVelocity_y, -p2.y)])
          console.log(t2)
          const initialVelocity_x = (p2.x-p0.x)/t2
          
          const flightParams = {
            initialVelocity: p5Instance.createVector(initialVelocity_x, initialVelocity_y),
            explodeTime: t2
          }


          return flightParams;
        }
        
        p5Instance.mouseClicked = (event: MouseEvent) => {
          const launchLocation = p5Instance.createVector(p5Instance.width/2, 0)
          const targetLocation = p5Instance.createVector(event.x, event.y)
      
          const flightParams = calculateFlightParamsFromClick(launchLocation, targetLocation)

          missiles.push(new Missile(launchLocation, flightParams.initialVelocity, flightParams.explodeTime))   
        }






        class Missile {
          position: P5.Vector;
          velocity: P5.Vector;
          explodeCountdown: number;
          hasExploded: boolean;

          constructor(initialPosition: P5.Vector, initialVelocity: P5.Vector, explodeTime: number) {
            this.position = initialPosition;
            this.velocity = initialVelocity;
            this.explodeCountdown = explodeTime;
            this.hasExploded = false;
          }

          fly() {
            this.velocity.add(GRAVITY);
            this.position.add(this.velocity);
            this.explodeCountdown--;

            if (!this.hasExploded && this.explodeCountdown <= 0) {
              this.hasExploded = true;
            }
          }

          belowScreenBottom(screenBottom: number) {
            return (this.position.y < screenBottom);
          }

          draw() {
            p5Instance.noStroke();
            p5Instance.fill(255, 255, 255, 255)
            p5Instance.ellipse(this.position.x, this.position.y, 5)
          }
        }

          
    }
    return s;
}


  
export default script;