<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';
import type { ScreenDimensions, p5ScriptWrapperFunction } from '../types';
import P5Canvas from "./P5Canvas.vue"

// TODO: create props for this
const props = defineProps<{
    title: string,
    scriptName: HTMLElement,
    description: string,
    usageInstructions: string,
    script: p5ScriptWrapperFunction,
    defaultScreenDimensions: ScreenDimensions
}>();

const componentKey = ref(0);

const screenDimensions = ref({
    width: window.innerWidth * 0.95,
    height: window.innerHeight * 0.95
});

const handleResize = () => {
    componentKey.value++;
    screenDimensions.value.width = window.innerWidth*0.95;
    screenDimensions.value.height = window.innerHeight*0.95;
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
            width: Math.min(props.defaultScreenDimensions.width, screenDimensions.width),
            height: Math.min(props.defaultScreenDimensions.height, screenDimensions.width)
        }" />
    
    <p>{{ props.usageInstructions }}</p>
</template>

<style scoped>  
</style>
