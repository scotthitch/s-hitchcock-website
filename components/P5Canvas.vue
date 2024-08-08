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

const applyStyling = () => {
    const p5Canvas = document.getElementById('defaultCanvas0')
    if (p5Canvas !== null) {
        p5Canvas.style.borderRadius = 'inherit'
    }
}

const generateNewP5Sketch = () => {
    const targetElement = document.getElementById(props.scriptID) || undefined
    const { script, cleanup } = props.scriptWrapper({ width: width.value, height: height.value })
    p5.value = new P5(script, targetElement)
    if (cleanup !== undefined) {
        p5Cleanup.value = cleanup
    }
    applyStyling()
}

onUpdated(() => {
    p5Cleanup.value()
    p5.value?.remove()
    generateNewP5Sketch()
})

onMounted(() => {
    generateNewP5Sketch()
})

onUnmounted(() => {
    p5Cleanup.value()
    p5.value?.remove()
})
</script>

<template>
    <div ref="el" class="w-full h-full rounded-[inherit]" :id="props.scriptID"></div>
</template>
