<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from "./script"
</script>


<template>
    <P5Project
      title="Perlin Flow Field"
      scriptID="perlin-flow-field"
      usageInstructions="A random vector flow field generated using 2D Perlin Noise."
      :scriptWrapper="script"
      state="invisible"
    />
</template>
