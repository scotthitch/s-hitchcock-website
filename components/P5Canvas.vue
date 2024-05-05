<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, ref, onUnmounted, onUpdated } from 'vue'
import type { P5CanvasProps } from '~/types'
import { useElementSize } from '@vueuse/core'

const el = ref(null)

const { width, height } = useElementSize(el)

const props = defineProps<P5CanvasProps>()

const p5 = ref<P5>()

const generateNewP5Sketch = () => {
    const targetElement = document.getElementById(props.scriptID) || undefined
    p5.value = new P5(props.scriptWrapper({ width: width.value, height: height.value }), targetElement)
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
            p5.value?.remove()
            generateNewP5Sketch()
            p5.value?.noLoop()
    }
}

onUpdated(() => {
    handleP5SketchGeneration()
})

onMounted(() => {
    handleP5SketchGeneration()
})

onUnmounted(() => {
    p5.value?.remove()
})
</script>

<template>
    <div ref="el" class="w-full h-full" :id="props.scriptID"></div>
</template>
