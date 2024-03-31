<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"
</script>


<template>
    <P5Project
      title="Perlin Flow Field"
      scriptID="perlin-flow-field"
      description="description"
      usageInstructions="A random vector flow field generated using 2D Perlin Noise."
      :script="script"
      :projectDimensions="{
        width: 400,
        height: 400
      }"
      state="invisible"
    />
</template>
