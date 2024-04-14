<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Fireworks"
        scriptID="fireworks"
        description="Festivities"
        usageInstructions="Click to shoot some fireworks."
        :scriptWrapper="script"
        state="invisible"
    />
</template>
