import QuadraticRoots from '../../helpers/QuadraticRoots'

import type { ScreenDimensions, p5ScriptInnerFunction } from '../../types'
import P5 from 'p5' // Package from npm

interface FlightParams {
  initialVelocity: P5.Vector, explodeTime: number
}

const script = (screenDimensions: ScreenDimensions): p5ScriptInnerFunction => {
    const s = (p5Instance: P5): void => {

        const GRAVITY = p5Instance.createVector(0, 0.15);
        const PARENT_MASS = 1;
        const CHILD_MASS_AVG = 0.05;
        const PARENT_FIREWORK_COLOUR = "#FFFFFF"
        const CHILD_FIREWORK_COLOURS = ["#ED254E", "#F9DC5C", "#0FA3B1", "#8A4FFF", "#33CA7F"]
        const CHILD_OPACITY_FADE_RATE = 2.5
        const N_CHILD_FIREWORKS = 300;
        const fireworks: Missile[] = [];

        p5Instance.setup = () => {
          p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
        }
        
        p5Instance.draw = () => {
          p5Instance.background(0, 0, 0, 50)

          // Iterate through all the fireworks
          fireworks.forEach((firework, index, fireworksArray) => {
            firework.fly()
            firework.draw()

            // If the missile is ready to explode then generate it's children and remove it
            if (firework.readyToExplode()) {
              generateExplodedFireworks(N_CHILD_FIREWORKS, firework.position)
              fireworksArray.splice(index, 1)
            }

            // If missile out of screen then remove it
            if (firework.belowScreenBottom(p5Instance.height)) {
              fireworksArray.splice(index, 1)
            }

            // If the missile has faded away then remove it
            if (firework.hasFaded()) {
              fireworksArray.splice(index, 1)
            }
          })
        }

        const calculateChildFlightParams = (phi: number, theta: number, velocityMagnitude: number): FlightParams => {
          const xVelocity = p5Instance.cos(phi) * p5Instance.random(1, 1.5);
          const yVelocity = p5Instance.sin(phi) * p5Instance.sin(theta) * p5Instance.random(1, 1.5);
          const missileVelocity = p5Instance.createVector(xVelocity, yVelocity).mult(velocityMagnitude);

          return {
            initialVelocity: missileVelocity,
            explodeTime: 1000 // set unrealistically high so it doesn't explode
          }
        }

        const generateExplodedFireworks = (nFireworks: number, parentPosition: P5.Vector) => {
          // const nFireworks = 
          const angleDelta = p5Instance.TWO_PI / p5Instance.sqrt(nFireworks);
          const velocityMagnitude = p5Instance.random(0.8, 1.5)

          for (let phi = 0; phi < p5Instance.TWO_PI; phi += angleDelta) {
            for (let theta = 0; theta < p5Instance.TWO_PI; theta += angleDelta) {
              const phiRandom = phi * p5Instance.random(0.8, 1.5);
              const thetaRandom = theta * p5Instance.random(0.8, 1.5);
              const flightParams = calculateChildFlightParams(phiRandom, thetaRandom, velocityMagnitude);
              const colour = CHILD_FIREWORK_COLOURS[Math.floor(Math.random() * CHILD_FIREWORK_COLOURS.length)];
              const randomMass = CHILD_MASS_AVG * p5Instance.random(0.8, 1.5)
              fireworks.push(new Missile(parentPosition.copy(), flightParams.initialVelocity, flightParams.explodeTime, randomMass, true, colour))
            }
          }     
        }

        const calculateFlightParamsFromClick = (p0: P5.Vector, p2: P5.Vector): FlightParams => {
          const flightParams: FlightParams = {initialVelocity: p5Instance.createVector(0, 0), explodeTime: 0};

          const maxHeight = p2.y*1.15
          const initialVelocity_y = p5Instance.sqrt(maxHeight*2*GRAVITY.y);
          const roots = new QuadraticRoots(1/2 * -GRAVITY.y, initialVelocity_y, -p2.y)

          // Only real roots should ever be return
          if (!roots.containsImaginaryRoots()) {
            const t2 = p5Instance.max(roots.getRealRoots())
            const initialVelocity_x = (p2.x-p0.x)/t2
            
            flightParams.initialVelocity = p5Instance.createVector(initialVelocity_x, -initialVelocity_y)
            flightParams.explodeTime = t2

          }

          return flightParams;
        }
        
        p5Instance.mouseClicked = (event: MouseEvent) => {
          const launchLocation = p5Instance.createVector(p5Instance.width/2, 0)
          const effectiveLaunchLocation = p5Instance.createVector(p5Instance.width/2, p5Instance.height)

          const clickLocation = p5Instance.createVector(event.x, p5Instance.height-event.y)
          const flightParams = calculateFlightParamsFromClick(launchLocation, clickLocation)


          fireworks.push(new Missile(effectiveLaunchLocation, flightParams.initialVelocity,
                                     flightParams.explodeTime, PARENT_MASS, false, PARENT_FIREWORK_COLOUR))
        }

        class Missile {
          position: P5.Vector;
          velocity: P5.Vector;
          explodeCountdown: number;
          mass: number
          opacity: number
          willFade: boolean
          colour: string

          constructor(initialPosition: P5.Vector, initialVelocity: P5.Vector, explodeTime: number, mass: number, willFade: boolean, colour: string) {
            this.position = initialPosition;
            this.velocity = initialVelocity;
            this.explodeCountdown = explodeTime;
            this.mass = mass;
            this.colour = colour
            this.willFade = willFade;  
            this.opacity = 255;
          
          }

          fly() {
            const acceleration = GRAVITY.copy().mult(this.mass)
            this.velocity.add(acceleration);
            this.position.add(this.velocity);
            this.explodeCountdown--;

            if (this.willFade) {
              this.opacity -= CHILD_OPACITY_FADE_RATE;
            }
          }

          hasFaded() {
            return (this.opacity < 0)
          }

          readyToExplode() {
            return this.explodeCountdown <= 0;
          }

          belowScreenBottom(screenBottom: number) {
            return (this.position.y > screenBottom);
          }

          draw() {
            p5Instance.noStroke();
            const colour = p5Instance.color(this.colour)
            colour.setAlpha(this.opacity)
            p5Instance.fill(colour)
            p5Instance.ellipse(this.position.x, this.position.y, 5)
          }
        }

          
    }
    return s;
}


  
export default script;