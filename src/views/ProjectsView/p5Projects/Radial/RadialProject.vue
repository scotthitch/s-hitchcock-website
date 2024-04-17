<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Radial"
        scriptID="radial"
        usageInstructions="Press the up and down arrows to change the number of reflections"
        :scriptWrapper="script"
        state="invisible"
    />
</template>
