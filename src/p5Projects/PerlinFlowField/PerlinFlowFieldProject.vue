<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"
</script>


<!-- TODO: fix scriptID issue -->
<template>
    <P5Project
      title="Perlin Flow Field"
      scriptID="perlin-flow-field"
      description="PFF"
      usageInstructions="Just sit back and relax"
      :script="script"
      :maxCanvasDimensions="{
        width: 400,
        height: 400
      }"
    />
</template>
