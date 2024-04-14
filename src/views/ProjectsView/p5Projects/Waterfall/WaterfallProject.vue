<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Waterfall"
        scriptID="waterfall"
        description="Wee watch them fall"
        usageInstructions="A cascade of veils built using Perlin Noise"
        :scriptWrapper="script"
        state="invisible"
    />
</template>
