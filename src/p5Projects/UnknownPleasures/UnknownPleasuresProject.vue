<script setup lang="ts">
import P5Project from '../../components/P5Project.vue'
import script from './script'
</script>

<template>
    <P5Project
        title="Unknown Pleasures"
        scriptID="unknown-pleasures"
        description="Inspired by Joy Division's Unknown Pleasures album art and built using the Gaussian distribution plus some random noise."
        usageInstructions="Inspired by Joy Division's Unknown Pleasures album art and built using Gaussian distribution plus some random noise"
        :scriptWrapper="script"
        state="invisible"
    />
</template>
