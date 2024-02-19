<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    usageInstructions: String,
})

</script>

<template>
<div>{{ props.title }}</div>
<div>{{ props.description }}</div>
<div>{{ props.usageInstructions }}</div>

</template>

<style scoped>  
</style>
