<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Tiling"
        scriptID="tiling"
        description="Wee watch them fall"
        usageInstructions="Click to change the zoom and tilt"
        :scriptWrapper="script"
        state="invisible"
    />
</template>
