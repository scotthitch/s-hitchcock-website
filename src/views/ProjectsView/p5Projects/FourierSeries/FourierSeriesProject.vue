<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Fourier Series"
        scriptID="fourier-series"
        description="Sinusoidal terms summing to approximate a square wave. Click to change the number of terms"
        :scriptWrapper="script"
        state="invisible"
    />
</template>
