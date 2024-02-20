<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import type { ScreenDimensions, P5ProjectProps } from '../types';
import P5Canvas from "./P5Canvas.vue"

// TODO: create props for this
const props = defineProps<P5ProjectProps>();

const componentKey = ref(0);

const liveScreenDimensions = ref<ScreenDimensions>({
    width: window.innerWidth * 0.95,
    height: window.innerHeight * 0.95
});

const handleResize = () => {
    componentKey.value++;
    liveScreenDimensions.value.width = window.innerWidth*0.95;
    liveScreenDimensions.value.height = window.innerHeight*0.95;
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
        :screenDimensions="{
            width: Math.min(props.defaultCanvasDimensions.width, liveScreenDimensions.width),
            height: Math.min(props.defaultCanvasDimensions.height, liveScreenDimensions.width)
        }" />
    
    <p>{{ props.usageInstructions }}</p>
</template>

<style scoped>  
</style>
