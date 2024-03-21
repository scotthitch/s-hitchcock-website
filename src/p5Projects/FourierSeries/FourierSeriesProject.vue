<script setup lang="ts">
import P5Project from '../../components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Fourier Series"
        scriptID="fourier-series"
        description="spin"
        usageInstructions="Approximating a square wave with a sum of trigonometric functions. Press the up and down arrow2s"
        :script="script"
        :maxCanvasDimensions="{
            width: 400,
            height: 500
        }"
    />
</template>
