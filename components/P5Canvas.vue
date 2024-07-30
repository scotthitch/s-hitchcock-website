<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, ref, onUnmounted, onUpdated } from 'vue'
import type { P5CanvasProps, emptyFunction } from '~/types'
import { useElementSize } from '@vueuse/core'

const el = ref(null)

const { width, height } = useElementSize(el)

const props = defineProps<P5CanvasProps>()

const p5 = ref<P5>()

const doNothing = () => {}

const p5Cleanup = ref<emptyFunction>(doNothing)

const generateNewP5Sketch = () => {
    const targetElement = document.getElementById(props.scriptID) || undefined
    const { script, cleanup } = props.scriptWrapper({ width: width.value, height: height.value })
    p5.value = new P5(script, targetElement)
    if (cleanup !== undefined) {
        p5Cleanup.value = cleanup
    }
}

const handleP5SketchGeneration = () => {
    switch (props.state) {
        // If invisible then do nothing
        case 'invisible':
            break

        // If it's visible then play the sketch
        case 'visible':
            // First check if one has been made yet
            if (p5.value === undefined) {
                generateNewP5Sketch()
            }
            p5.value?.loop()
            break

        // If it's a neighbour then remove the old sketch, make a new one then pause
        case 'neighbour':
            // First call the cleanup method
            p5Cleanup.value()
            p5.value?.remove()
            generateNewP5Sketch()
            p5.value?.noLoop()
            break
    }
}

onUpdated(() => {
    handleP5SketchGeneration()
})

onMounted(() => {
    // console.log('mounting', props.scriptID)

    handleP5SketchGeneration()
})

onUnmounted(() => {
    // console.log('onm')
    p5Cleanup.value()
    p5.value?.remove()
})
</script>

<template>
    <div ref="el" class="w-full h-full" :id="props.scriptID"></div>
</template>
