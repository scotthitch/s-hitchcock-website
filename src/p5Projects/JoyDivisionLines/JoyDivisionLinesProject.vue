<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import JoyDivisionLinesCanvas from "./JoyDivisionLinesCanvas.vue"

</script>

<template>
    <P5Project 
      title="Joy Division Lines"
      description="Inspired by Joy Division's Unknown Pleasures album art and built using the Gaussian distribution plus some random noise."
      usageInstructions="Simply move the mouse around to see. Click to save one that you like"
      :p5Canvas="JoyDivisionLinesCanvas"
      :defaultScreenWidth="400"
      :defaultScreenHeight="400"
    />
</template>
