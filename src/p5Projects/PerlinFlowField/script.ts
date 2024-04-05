import P5 from 'p5' // Package from npm

import type { p5Script, p5ScriptWrapper, ScreenDimensions } from '../../types'

const scriptWrapper: p5ScriptWrapper = (screenDimensions: ScreenDimensions): p5Script => {
    const script = (p5Instance: P5): void => {
        const GRID_ITEM_WIDTH = screenDimensions.width / 400
        const FORCE_SCALE_FACTOR = 50
        const N_POINTS = 10000
        const NOISE_SCALE = 0.05
        const CURL = 6.3
        const POINT_VELOCITY_LIMIT = 1
        const POINT_OPACITY = 3 // %
        const RANDOM_BASE_OFFSET = p5Instance.random(2 * p5Instance.TWO_PI)

        const BACKGROUND_COLOUR = '#3A3335'
        const PRIMARY_COLOUR = '#F0EC57'

        const POINT_SIZE = Math.min(screenDimensions.width, screenDimensions.height) / 200

        const grassPatches: GrassPatch[][] = []
        const points: Point[] = []

        function generatePerlinForcePatch(i: number, j: number) {
            const pos = p5Instance.createVector(i * GRID_ITEM_WIDTH, j * GRID_ITEM_WIDTH)

            const angle =
                p5Instance.noise(i * NOISE_SCALE, j * NOISE_SCALE) * CURL + RANDOM_BASE_OFFSET // Adjust noise parameters
            const force = P5.Vector.fromAngle(angle)

            force.setMag(FORCE_SCALE_FACTOR)

            grassPatches[i][j] = new GrassPatch(pos, GRID_ITEM_WIDTH, force, FORCE_SCALE_FACTOR)
        }

        p5Instance.setup = () => {
            p5Instance.createCanvas(screenDimensions.width, screenDimensions.height)
            p5Instance.background(BACKGROUND_COLOUR)

            // Generate points
            for (let i = 0; i < N_POINTS; i++) {
                const screenBounds = p5Instance.createVector(p5Instance.width, p5Instance.height)
                const pointPos = p5Instance.createVector(
                    Math.random() * p5Instance.width,
                    Math.random() * p5Instance.height
                )
                points.push(new Point(pointPos, screenBounds))
            }

            // Generate grass patches
            for (let i = 0; i < p5Instance.width / GRID_ITEM_WIDTH; i++) {
                grassPatches[i] = []
                for (let j = 0; j < p5Instance.height / GRID_ITEM_WIDTH; j++) {
                    generatePerlinForcePatch(i, j)
                }
            }
        }

        p5Instance.draw = () => {
            // background(30);

            points.forEach((point) => {
                const [i, j] = point.positionAsIndex(GRID_ITEM_WIDTH)
                point.updatePosition(grassPatches[i][j].getForce())
                point.display()
            })
        }

        class Point {
            originalPos: P5.Vector
            pos: P5.Vector
            vel: P5.Vector
            acc: P5.Vector
            screenBounds: P5.Vector

            constructor(pos: P5.Vector, screenBounds: P5.Vector) {
                this.originalPos = pos.copy()
                this.pos = pos
                this.vel = p5Instance.createVector(0, 0)
                this.acc = p5Instance.createVector(0, 0)
                this.screenBounds = screenBounds
            }

            withinBounds() {
                return (
                    this.pos.x <= this.screenBounds.x &&
                    this.pos.y <= this.screenBounds.y &&
                    this.pos.x >= 0 &&
                    this.pos.y >= 0
                )
            }

            resetPoint() {
                // this.pos = this.originalPos.copy();

                this.pos = p5Instance.createVector(
                    Math.random() * this.screenBounds.x,
                    Math.random() * this.screenBounds.y
                )
                this.vel = p5Instance.createVector(0, 0)
                this.acc = p5Instance.createVector(0, 0)
            }

            updatePosition(force: P5.Vector) {
                // TODO: units don't match
                this.acc = force
                this.vel.add(this.acc)
                this.vel.limit(POINT_VELOCITY_LIMIT)
                this.pos.add(this.vel)

                if (!this.withinBounds()) {
                    this.resetPoint()
                }
            }

            display() {
                const pointColour = p5Instance.color(PRIMARY_COLOUR)
                pointColour.setAlpha(POINT_OPACITY)
                p5Instance.fill(pointColour)
                p5Instance.noStroke()
                p5Instance.ellipse(this.pos.x, this.pos.y, POINT_SIZE)
            }

            // need some bounds checker
            positionAsIndex(scaleFactor: number) {
                const i = Math.floor(this.pos.x / scaleFactor)
                const j = Math.floor(this.pos.y / scaleFactor)

                return [i, j]
            }
        }

        class GrassPatch {
            pos: P5.Vector
            width: number
            force: P5.Vector
            forceScaleFactor: number

            constructor(pos: P5.Vector, width: number, force: P5.Vector, forceScaleFactor: number) {
                this.pos = pos
                this.width = width
                this.force = force
                this.forceScaleFactor = forceScaleFactor
            }

            getForce() {
                return this.force
            }
        }
    }
    return script
}

export default scriptWrapper
