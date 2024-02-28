<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import type { ScreenDimensions, P5ProjectProps } from '../types';
import P5Canvas from "./P5Canvas.vue"

const props = defineProps<P5ProjectProps>();

const p5CanvasComponentKey = ref(0);

// TODO: explore if ref is the right thing to use here. probably should be 'computed'
const canvasAspectRatio = ref<number>(props.maxCanvasDimensions.height/props.maxCanvasDimensions.width);

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
    const width = Math.min(props.maxCanvasDimensions.width, liveScreenDimensions.value.width*0.95)
    const height = Math.min(props.maxCanvasDimensions.height, liveScreenDimensions.value.width*0.95*canvasAspectRatio.value)

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
    <div class="flex flex-col items-center text-center place-content-center h-screen snap-always snap-center">
        <p class="text-3xl font-bold">{{ props.title }}</p>
        <p>{{ props.description }}</p>
        <P5Canvas 
            :key="p5CanvasComponentKey"
            :scriptID="props.scriptID"
            :script="props.script"
            :screenDimensions="calculateCanvasDimensions()"
        />
        <p>{{ props.usageInstructions }}</p>
    </div>
</template>

<style scoped>  
</style>
