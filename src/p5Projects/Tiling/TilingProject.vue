<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"

</script>

<template>
    <P5Project
      title="Tiling"
      scriptID="tiling"
      description="Wee watch them fall"
      usageInstructions="Click to change the zoom and tilt"
      :script="script"
      :projectDimensions="{
        width: 400,
        height: 550
      }"
      state="invisible"
    />
</template>
