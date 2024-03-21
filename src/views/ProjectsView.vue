<script setup lang="ts">
import RadialProject from '../p5Projects/Radial/RadialProject.vue'
import BallCascadeProject from '../p5Projects/BallCascade/BallCascadeProject.vue'
import JoyDivisionLinesProject from '../p5Projects/JoyDivisionLines/JoyDivisionLinesProject.vue'
import GrowingCircleProject from '../p5Projects/GrowingCircle/GrowingCircleProject.vue'
import WaterfallProject from '../p5Projects/Waterfall/WaterfallProject.vue'
import PerlinFlowFieldProject from '../p5Projects/PerlinFlowField/PerlinFlowFieldProject.vue'
import FireworksProject from '../p5Projects/Fireworks/FireworksProject.vue'
import FourierSeriesProject from '../p5Projects/FourierSeries/FourierSeriesProject.vue'
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import type { ScreenDimensions } from '../types'

const p5ProjectKey = ref(0)

const liveScreenDimensions = ref<ScreenDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
})

const projects = shallowRef([
    FourierSeriesProject,
    WaterfallProject,
    PerlinFlowFieldProject,
    GrowingCircleProject,
    FireworksProject,
    JoyDivisionLinesProject,
    RadialProject,
    BallCascadeProject
])

const preventDefaultForScrollKeys = (event: KeyboardEvent) => {
    const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] // Arrow keys
    if (keysToPrevent.includes(event.code)) {
        event.preventDefault()
    }
}

const handleResize = () => {
    p5ProjectKey.value++ // Update key to force re render of P5Canvas component
    liveScreenDimensions.value.width = window.innerWidth
    liveScreenDimensions.value.height = window.innerHeight
}

onMounted(() => {
    window.addEventListener('resize', handleResize)

    window.addEventListener('keydown', (e) => {
        preventDefaultForScrollKeys(e)
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)

    window.removeEventListener('keydown', (e) => {
        preventDefaultForScrollKeys(e)
    })
})
</script>

<template>
    <div class="snap-y snap-mandatory h-screen overflow-scroll">
        <component
            v-for="project in projects"
            :is="project"
            :key="`${project.title}-${p5ProjectKey}`"
            :projectDimensions="liveScreenDimensions"
        >
        </component>
    </div>
</template>
