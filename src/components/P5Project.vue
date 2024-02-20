<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import type { ScreenDimensions, P5ProjectProps } from '../types';
import P5Canvas from "./P5Canvas.vue"

const props = defineProps<P5ProjectProps>();

const componentKey = ref(0);

const liveScreenDimensions = ref<ScreenDimensions>({
    width: window.innerWidth, 
    height: window.innerHeight
});

const handleResize = () => {
    componentKey.value++; // Update key to force re render of P5Canvas component
    liveScreenDimensions.value.width = window.innerWidth;
    liveScreenDimensions.value.height = window.innerHeight;
}

const calculateCanvasDimensions = (): ScreenDimensions => {
    const width = Math.min(props.defaultCanvasDimensions.width, liveScreenDimensions.value.width*0.95)
    const height = Math.min(props.defaultCanvasDimensions.height, liveScreenDimensions.value.width*0.95)

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
        :key="componentKey"
        :scriptName="props.scriptName"
        :script="props.script"
        :screenDimensions="calculateCanvasDimensions()"
    />
    <p>{{ props.usageInstructions }}</p>
</template>

<style scoped>  
</style>
