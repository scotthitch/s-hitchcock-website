<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps } from 'vue';

const props = defineProps({width: Number, height: Number})

let reflectionAngle;
let userHasInteracted = false;
let prevTheta;
let prevmagM;
let flag = 0;
let magM;
let theta;
let isDrawing = 1;
const hMin = 180;
const hMax = 260;
const sat = 90;
let light = 70;
let ranOff = 20;
let hAvg = ((hMin + hMax) / 2);
let hDif = ((hMin - hMax) / 2);
let numberOfReflections = 4;

const script = p5 => {
    
    // Setup the canvas
    p5.setup = () => {
        p5.createCanvas(props.width, props.height);
        p5.colorMode(p5.HSL);
        p5.background(0);
    };

    // Redraw the canvas on every iteration
    p5.draw = () => {
        // If the user hasn't yet interacted then don't bother to draw anything
        if (!checkUserInteraction()) {
            return;
        }

        p5.translate(p5.width/2, p5.height/2); // Move origin of the canvas to the centre
        let translatedMouseX = p5.mouseX - p5.width / 2;
        let translatedMouseY = p5.mouseY - p5.height / 2;
        reflectionAngle = 2 * Math.PI / numberOfReflections;

        
        
        if (!flag) {
            prevTheta = cartesian2Polar(translatedMouseX, translatedMouseY);
            prevmagM = calcMag(translatedMouseX, translatedMouseY);
            theta = cartesian2Polar(translatedMouseX, translatedMouseY);
            magM = calcMag(translatedMouseX, translatedMouseY);
        } else {
            prevmagM = magM;
            prevTheta = theta;
        }
        flag++;
        
        if (p5.mouseX != 0 && p5.mouseY != 0) {
            // stroke(255);
            p5.strokeWeight(magM / 15 + 2);

            magM = calcMag(translatedMouseX, translatedMouseY);
            theta = cartesian2Polar(translatedMouseX, translatedMouseY);
            // stk = hAvg + hDif * cos(theta + ranOff);

            if (isDrawing) {
                for (let i = 0; i < 2 * Math.PI; i += reflectionAngle) 
                {
                    let stk = hAvg + hDif * p5.cos(i + ranOff);
                    p5.stroke(stk, sat, light)
                    p5.line(magM * p5.cos(theta + i), magM * p5.sin(theta + i), prevmagM * p5.cos(prevTheta + i), prevmagM * p5.sin(prevTheta + i));

                }
            }

        }

    }; 

    const checkUserInteraction = () => {
        if (userHasInteracted) {
            return true;
        }
        if (mouseInWindow()) {
            userHasInteracted = true;
            return true;
        }
        return false;        
    }

    function calcMag(x, y) {
        magM = Math.sqrt(x * x + y * y)
        return magM
    }
    
    function cartesian2Polar(x, y) {
        theta = Math.atan2(y, x)
        return theta
    }

    function mouseInWindow() {
        return (p5.mouseX > 0 && p5.mouseX < p5.width   // mouse in x bounds
             && p5.mouseY > 0 && p5.mouseY < p5.height) // mouse in y bounds 
    }

    p5.mouseClicked = () => {
    if (mouseInWindow()) {
        p5.background(0);
        ranOff += 10;
    }
    }

    p5.keyPressed = () => {
        if (p5.keyCode === p5.UP_ARROW) {
            numberOfReflections++;
            p5.background(0);
        } else if (p5.keyCode === p5.DOWN_ARROW) {
            numberOfReflections = Math.max(1, numberOfReflections - 1)
            p5.background(0);

        }
    }
}

onMounted(() => {
    const p5canvas = new P5(script, 'Kaleidoscope');
})

</script>

<template>
    <div>This is a home page</div>
  <div id="Kaleidoscope"></div>
</template>