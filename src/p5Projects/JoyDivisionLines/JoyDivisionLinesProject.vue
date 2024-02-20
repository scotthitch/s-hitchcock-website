<script setup lang="ts">
import P5ScriptDescriptor from "../../components/P5ScriptDescriptor.vue";
import JoyDivisionLines from "./JoyDivisionLinesScript.vue"

</script>

<template>
    <P5ScriptDescriptor 
      title="Joy Division Lines"
      description="Inspired by Joy Division's Unknown Pleasures album art and built using the Gaussian distribution plus some random noise."
      usageInstructions="Simply move the mouse around to se"
      :p5Script="JoyDivisionLines"
    />
</template>
