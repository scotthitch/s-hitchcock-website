<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"

</script>


<!-- TODO: fix scriptID issue -->
<template>
    <P5Project
      title="Fireworks"
      scriptID="fireworks"
      description="Festivities"
      usageInstructions="Shoot some fireworks."
      :script="script"
      :projectDimensions="{
        width: 400,
        height: 550
      }"
    />
</template>
