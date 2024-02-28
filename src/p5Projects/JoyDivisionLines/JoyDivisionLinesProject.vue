<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"

</script>

<template>
    <P5Project 
      title="Joy Division Lines"
      scriptID="joy-division-lines"
      description="Inspired by Joy Division's Unknown Pleasures album art and built using the Gaussian distribution plus some random noise."
      usageInstructions="Simply move the mouse around to see. Click to save one that you like"
      :script="script"
      :maxCanvasDimensions="{
        width: 400,
        height: 400
      }"
    />
</template>
