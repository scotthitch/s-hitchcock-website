<script setup lang="ts">
import P5Project from '../../components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Fourier Series"
        scriptID="fourier-series"
        description="spin"
        usageInstructions="Sinusoidal terms summing to approximate a square wave. Click to adjust the number of terms"
        :script="script"
        :projectDimensions="{
            width: 400,
            height: 500
        }"
      state="invisible"
    />
</template>
