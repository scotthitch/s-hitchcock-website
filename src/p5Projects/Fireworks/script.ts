import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5Instance: P5): void => {

        const GRAVITY = p5Instance.createVector(0, 0.025)
        const fireworks: Firework[] = [];

        p5Instance.setup = () => {
          p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
        }
        
        p5Instance.draw = () => {
          p5Instance.background(0, 0, 0, 50)
          // p5Instance.background(0);
          fireworks.forEach(firework => {
          // if (firework) {
            firework.fly()
            firework.draw()
          // }
          })
        }

        p5Instance.mouseClicked = (event: MouseEvent) => {
          const targetLocation = p5Instance.createVector(event.x, event.y)
          const launchLocation = p5Instance.createVector(p5Instance.width/2, p5Instance.height)
          const horisontalVelocity = p5Instance.random(-1, 1)
          const initialVelocity = p5Instance.createVector(horisontalVelocity, -6.2);
          fireworks.push(new Firework(targetLocation, launchLocation, initialVelocity))
        }











        class Projectile {
          position: P5.Vector;
          velocity: P5.Vector;

          constructor(origin: P5.Vector, initialVelocity: P5.Vector) {
            this.position = origin;
            this.velocity = initialVelocity;
          }

          fly() {
            this.velocity.add(GRAVITY);
            this.position.add(this.velocity);
          }

          draw() {
            p5Instance.noStroke();
            p5Instance.fill(255, 255, 255, 255)
            p5Instance.ellipse(this.position.x, this.position.y, 5)
          }
        }






        class Firework extends Projectile {
          origin: P5.Vector;
          targetLocation: P5.Vector;
          childProjectile: Projectile[];
          hasExploded: boolean;

          constructor(targetLocation: P5.Vector, origin: P5.Vector, initialVelocity: P5.Vector) {
            super(origin, initialVelocity);
            this.origin = origin;
            this.targetLocation = targetLocation;
            this.childProjectile = [];
            this.hasExploded = false;
          }

          fly() {
            
            if (this.position.y < 80 && !this.hasExploded) {
              this.explode()
            } else {
              super.fly()
            }
          }

          explode() {
            const n = 12;
            const angleDelta = p5Instance.TWO_PI / n;
            for (let i: number = 0; i < n; i++) {
              const angle = angleDelta * i * p5Instance.random(1, 1.08);
              const missileVelocity = P5.Vector.fromAngle(angle, 0.6).add(this.velocity).mult(p5Instance.random(1, 1.08));
              this.childProjectile.push(new Projectile(this.position.copy(), missileVelocity))
            }

            this.hasExploded = true;
          }

          draw() {
            if (!this.hasExploded) {
              super.draw()
            }
            this.childProjectile.forEach((projectile) => {
              projectile.fly()
              projectile.draw()
            })
            
          }
        }
   
          
    }
    return s;
}


  
export default script;