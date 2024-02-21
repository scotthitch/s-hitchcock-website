<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"

</script>


<!-- TODO: fix scriptname issue -->
<template>
    <P5Project
      title="Waterfall"
      scriptName="waterfal"
      description="Wee watch them fall"
      usageInstructions="Not much to do here."
      :script="script"
      :maxCanvasDimensions="{
        width: 400,
        height: 550
      }"
    />
</template>
