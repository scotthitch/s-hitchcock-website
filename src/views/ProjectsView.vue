<script setup lang="ts">
import RadialProject from '../p5Projects/Radial/RadialProject.vue';
import BallCascadeProject from '../p5Projects/BallCascade/BallCascadeProject.vue';
import JoyDivisionLinesProject from '../p5Projects/JoyDivisionLines/JoyDivisionLinesProject.vue';
import GrowingCircleProject from '../p5Projects/GrowingCircle/GrowingCircleProject.vue'
import WaterfallProject from '../p5Projects/Waterfall/WaterfallProject.vue'
import PerlinFlowFieldProject from "../p5Projects/PerlinFlowField/PerlinFlowFieldProject.vue"
import FireworksProject from "../p5Projects/Fireworks/FireworksProject.vue"
import FourierSeriesProject from "../p5Projects/FourierSeries/FourierSeriesProject.vue"


import { onMounted, onUnmounted, shallowRef } from 'vue'

const projects = shallowRef([FourierSeriesProject, WaterfallProject, PerlinFlowFieldProject, GrowingCircleProject, FireworksProject, JoyDivisionLinesProject, RadialProject, BallCascadeProject]);



function preventDefaultForScrollKeys(event: KeyboardEvent) {
    const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']; // Arrow keys
    if (keysToPrevent.includes(event.code)) {
        event.preventDefault();
    }
}

onMounted(() => {
    window.addEventListener('keydown', e => {preventDefaultForScrollKeys(e)});
})

onUnmounted(() => {
    window.removeEventListener('keydown', e => {preventDefaultForScrollKeys(e)});
})

</script>

<template>
<div class="snap-y snap-mandatory h-screen overflow-scroll">
  <component v-for="project in projects" 
            v-bind:is="project"
            v-bind:key="project.title">
  </component>
</div>  
</template>
