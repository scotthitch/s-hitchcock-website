<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import type { ScreenDimensions, P5ProjectProps } from '../types'
import P5Canvas from './P5Canvas.vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<P5ProjectProps>()

const p5CanvasComponentKey = ref(0)

const target = ref(null)
const targetIsVisible = ref(false)

const liveScreenDimensions = ref<ScreenDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
})

const handleResize = () => {
    p5CanvasComponentKey.value++ // Update key to force re render of P5Canvas component
    liveScreenDimensions.value.width = window.innerWidth
    liveScreenDimensions.value.height = window.innerHeight
}

const calculateCanvasDimensions = (): ScreenDimensions => {
    // const width = Math.min(props.maxCanvasDimensions.width, liveScreenDimensions.value.width*0.95)
    // const height = Math.min(props.maxCanvasDimensions.height, liveScreenDimensions.value.width*0.95*canvasAspectRatio.value)
    const width = liveScreenDimensions.value.width
    const height = liveScreenDimensions.value.height
    return { width: width, height: height }
}

onMounted(() => {
    window.addEventListener('resize', handleResize)

    const intersectionObserverOptions = {
        root: null,
        rootMargin: '500px',
        threshold: 0.00001
    }

    useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            targetIsVisible.value = isIntersecting
        },
        intersectionObserverOptions
    )
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <div ref="target" class="verticalPan relative h-screen snap-always snap-center">
        <div v-if="targetIsVisible">
            <div class="absolute">
                <P5Canvas
                    :key="p5CanvasComponentKey"
                    :scriptID="props.scriptID"
                    :script="props.script"
                    :screenDimensions="calculateCanvasDimensions()"
                />
            </div>

            <div class="absolute bottom-2 left-2">
                <p class="text-6xl sm:text-7xl md:text-8xl font-bold text-white opacity-80">
                    {{ props.title }}
                </p>
            </div>

            <div class="absolute top-2 right-2">
                <p class="text-xl lg:text-3xl font-bold text-white opacity-80">
                    {{ props.usageInstructions }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.verticalPan {
    touch-action: pan-y;
}
</style>
