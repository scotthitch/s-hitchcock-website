<script setup lang="ts">
import P5Project from '../../components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Fourier Series"
        scriptID="fourier-series"
        description="spin"
        usageInstructions="A sum of sinusoidal curves approximating a square wave"
        :script="script"
        :projectDimensions="{
            width: 400,
            height: 500
        }"
      state="invisible"
    />
</template>
