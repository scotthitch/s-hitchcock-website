<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    title: string,
    description: string,
    usageInstructions: string,
    p5Canvas: object, // TODO: this shouldn't be of type object. need to find a custom component type
    defaultScreenWidth: number,
    defaultScreenHeight: number
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

// const calculateScreenDimension = () => {

// }

</script>

<template>
    <p class="text-3xl font-bold">{{ props.title }}</p>
    <p>{{ props.description }}</p>
    <component 
        :key="componentKey"
        :is="p5Canvas" 
        :screenWidth="Math.min(props.defaultScreenWidth, screenDimensions.width)"
        :screenHeight="Math.min(props.defaultScreenHeight, screenDimensions.width)"
        :scriptIsPlaying="true">
    </component>
    <p>{{ props.usageInstructions }}</p>
</template>

<style scoped>  
</style>
