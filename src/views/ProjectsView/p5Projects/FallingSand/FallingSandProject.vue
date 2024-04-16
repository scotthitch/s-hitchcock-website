<script setup lang="ts">
import P5Project from "@/components/P5Project.vue";
import scriptWrapper from "./script"
</script>


<template>
    <P5Project
      title="Falling Sand"
      scriptID="falling-sand"
      description="Wee watch them fall"
      usageInstructions="new script"
      :scriptWrapper="scriptWrapper"
      state="invisible"
    />
</template>
