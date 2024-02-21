<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"

</script>

<template>
    <P5Project 
      title="Kaleidoscope"
      scriptName="ball-cascade"
      description="Draw some symmetrical pictures"
      usageInstructions="Use the up and down keys to change the number of reflections. Click to clear the screen"
      :script="script"
      :maxCanvasDimensions="{
        width: 400,
        height: 400
      }"
    />
</template>
