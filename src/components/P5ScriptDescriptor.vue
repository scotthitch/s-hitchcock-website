<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    usageInstructions: String,
    p5Script: Object,
})

</script>

<template>
      <div>{{ props.title }}</div>
      <div>{{ props.description }}</div>
      <component :is="p5Script" :screenWidth="450" :screenHeight="450" :scriptIsPlaying="true"></component>
      <div>{{ props.usageInstructions }}</div>
</template>

<style scoped>  
</style>
