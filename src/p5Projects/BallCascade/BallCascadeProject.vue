<script setup lang="ts">
import P5Project from "../../components/P5Project.vue";
import BallCascadeCanvas from "./BallCascadeCanvas.vue"

</script>

<template>
    <P5Project
      title="Ball Cascade"
      description="Wee watch them fall"
      usageInstructions="Not much to do here. You can flip gravity by clicking"
      :p5Canvas="BallCascadeCanvas"
      :defaultScreenWidth="400"
      :defaultScreenHeight="400"
    />
</template>
