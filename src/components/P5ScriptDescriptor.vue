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
    <div class="flex flex-col items-center text-center justify-center h-screen">
      <div>{{ props.title }}</div>
      <div>{{ props.description }}</div>
      <component :is="p5Script" :screenWidth="400" :screenHeight="400" :scriptIsPlaying="true"></component>
      <div>{{ props.usageInstructions }}</div>
    </div>
  </template>

<style scoped>  
</style>
