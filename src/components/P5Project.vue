<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import type { ScreenDimensions, P5ProjectProps } from '../types';
import P5Canvas from "./P5Canvas.vue"

const props = defineProps<P5ProjectProps>();

const p5CanvasComponentKey = ref(0);

const canvasAspectRatio = ref<number>(props.defaultCanvasDimensions.height/props.defaultCanvasDimensions.width);
// console.log(canvasAspectRatio)

const liveScreenDimensions = ref<ScreenDimensions>({
    width: window.innerWidth, 
    height: window.innerHeight
});

const handleResize = () => {
    p5CanvasComponentKey.value++; // Update key to force re render of P5Canvas component
    liveScreenDimensions.value.width = window.innerWidth;
    liveScreenDimensions.value.height = window.innerHeight;
}

const calculateCanvasDimensions = (): ScreenDimensions => {
    const width = Math.min(props.defaultCanvasDimensions.width, liveScreenDimensions.value.width*0.95)
    const height = Math.min(props.defaultCanvasDimensions.height, liveScreenDimensions.value.width*0.95*canvasAspectRatio.value)

    return {width: width, height: height}
}

onMounted(() => {
    window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
})

</script>

<template>
    <p class="text-3xl font-bold">{{ props.title }}</p>
    <p>{{ props.description }}</p>
    <P5Canvas 
        :key="p5CanvasComponentKey"
        :scriptName="props.scriptName"
        :script="props.script"
        :screenDimensions="calculateCanvasDimensions()"
    />
    <p>{{ props.usageInstructions }}</p>
</template>

<style scoped>  
</style>
