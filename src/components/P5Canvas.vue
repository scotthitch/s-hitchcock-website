<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps, ref, onUnmounted } from 'vue';
import type { P5CanvasProps } from '../types'


const props = defineProps<P5CanvasProps>()

const wasP5CanvasInViewport = ref(false);

const p5 = ref<P5>();

const generateNewP5Sketch = () => {
    const targetElement = document.getElementById(props.scriptID) || undefined;
    p5.value = new P5(props.script(props.screenDimensions), targetElement);
}

// Function to check if element is in viewport
const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    // rect.
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

const handleP5ViewportInteraction = () => {
    const targetElement = document.getElementById(props.scriptID);

    // If the target element is not an elemnent on the DOM
    if (targetElement === null) {
        console.log('Not an element');
        return
    }
    
    let isP5CanvasInViewport = isElementInViewport(targetElement);

    // P5 canvas just moved into viewport
    if (isP5CanvasInViewport && !wasP5CanvasInViewport.value) {
        // Reset the p5 sketch
        p5.value?.remove();
        generateNewP5Sketch();

        // Set visibility to true
        wasP5CanvasInViewport.value = true;
        
        return;
    }

    // P5 canvas just moved out of viewport
    if (!isP5CanvasInViewport && wasP5CanvasInViewport.value) {
        // Stop the script from looping
        p5.value?.noLoop();

        // Set old visibility to false
        wasP5CanvasInViewport.value = false;
        return;
    }
}

onMounted(() => {
    // Initially start up all projects and immediately pause them
    generateNewP5Sketch()
    p5.value?.noLoop();

    handleP5ViewportInteraction();
    window.addEventListener('wheel', handleP5ViewportInteraction);
})

onUnmounted(() => {
    p5.value?.remove()
    window.removeEventListener('wheel', handleP5ViewportInteraction);
})
</script>

<template>
    <div class="border-8 border-black shadow-lg" :id="props.scriptID"></div>
</template>