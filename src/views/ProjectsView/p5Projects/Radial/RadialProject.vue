<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Radial"
        scriptID="radial"
        description="Draw some symmetrical pictures"
        usageInstructions="instructions"
        :scriptWrapper="script"
        state="invisible"
    />
</template>
