<script setup lang="ts">
import P5ScriptDescriptor from "../../components/P5ScriptDescriptor.vue";
import BallCascadeScript from "./BallCascadeScript.vue"

</script>

<template>
    <P5ScriptDescriptor 
      title="Ball Cascade"
      description="Wee watch them fall"
      usageInstructions="Not much to do here. You can flip gravity by clicking"
      :p5Script="BallCascadeScript"
    />
</template>
