<script setup lang="ts">
import RadialProject from '../p5Projects/Radial/RadialProject.vue'
import BallCascadeProject from '../p5Projects/BallCascade/BallCascadeProject.vue'
import JoyDivisionLinesProject from '../p5Projects/JoyDivisionLines/JoyDivisionLinesProject.vue'
import GrowingCircleProject from '../p5Projects/GrowingCircle/GrowingCircleProject.vue'
import WaterfallProject from '../p5Projects/Waterfall/WaterfallProject.vue'
import PerlinFlowFieldProject from '../p5Projects/PerlinFlowField/PerlinFlowFieldProject.vue'
import FireworksProject from '../p5Projects/Fireworks/FireworksProject.vue'
import FourierSeriesProject from '../p5Projects/FourierSeries/FourierSeriesProject.vue'
import ScrollDownIndicator from "../components/ScrollDownIndicator.vue"
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import type { P5ProjectState } from '../types'

import type { ScreenDimensions } from '../types'

const p5ProjectKey = ref(0)

const liveScreenDimensions = ref<ScreenDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
})

const projects = shallowRef([
    WaterfallProject,
    PerlinFlowFieldProject,
    FourierSeriesProject,
    GrowingCircleProject,
    FireworksProject,
    JoyDivisionLinesProject,
    RadialProject,
    BallCascadeProject
])

const projectStates = ref<P5ProjectState[]>(Array(projects.value.length).fill('invisible'))

const setProjectVisibilityStates = () => {
    let wasPreviousProjectVisible = false
    projects.value.forEach((project, i) => {
        const el = document.getElementById(`project-${i}`)

        if (el === null) {
            return
        }

        const projectBoundingRect = el.getBoundingClientRect()

        if (projectBoundingRect.top < window.innerHeight - 5 && projectBoundingRect.bottom > 0) {
            //TODO need 10?
            projectStates.value[i] = 'visible'
            wasPreviousProjectVisible = true

            if (projectStates.value[i - 1] === 'invisible') {
                projectStates.value[i - 1] = 'neighbour'
            }
        } else if (wasPreviousProjectVisible) {
            projectStates.value[i] = 'neighbour'
            wasPreviousProjectVisible = false
        } else {
            projectStates.value[i] = 'invisible'
        }
    })
}

const preventDefaultForScrollKeys = (event: KeyboardEvent) => {
    const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] // Arrow keys
    if (keysToPrevent.includes(event.code)) {
        event.preventDefault()
    }
}

const handleResize = () => {
    p5ProjectKey.value++ // Update key to force re render of each P5 project component
    liveScreenDimensions.value.width = window.innerWidth
    liveScreenDimensions.value.height = window.innerHeight
}

onMounted(() => {
    setProjectVisibilityStates()
    window.addEventListener('resize', handleResize)

    window.addEventListener('keydown', (e) => {
        preventDefaultForScrollKeys(e)
    })

    document.getElementById('projects-view')?.addEventListener('scroll', setProjectVisibilityStates)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)

    window.removeEventListener('keydown', (e) => {
        preventDefaultForScrollKeys(e)
    })
    document
        .getElementById('projects-view')
        ?.removeEventListener('scroll', setProjectVisibilityStates)
})
</script>

<template>
    <div id="projects-view" class="snap-y snap-mandatory h-[100svh] overflow-scroll">
        <ScrollDownIndicator />
        <component
            v-for="(project, i) in projects"
            :is="project"
            :key="`${i}-${p5ProjectKey}`"
            :id="`project-${i}`"
            :projectDimensions="liveScreenDimensions"
            :state="projectStates[i]"
        >
        </component>
    </div>
</template>
