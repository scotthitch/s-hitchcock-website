<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"
</script>


<!-- TODO: fix scriptname issue -->
<template>
    <P5Project
      title="Growing Circle"
      scriptName="growing-circle"
      description="Preeety"
      usageInstructions="Just sit back and relax"
      :script="script"
      :maxCanvasDimensions="{
        width: 400,
        height: 400
      }"
    />
</template>
