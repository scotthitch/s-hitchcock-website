<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import script from "./script"

</script>

<template>
    <P5Project
      title="Ball Cascade"
      scriptName="ball-cascade"
      description="Wee watch them fall"
      usageInstructions="Not much to do here. You can flip gravity by clicking"
      :script="script"
      :defaultScreenDimensions="{
        width: 400,
        height: 400
      }"
    />
</template>
