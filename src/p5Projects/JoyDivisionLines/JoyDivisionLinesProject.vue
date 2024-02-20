<script setup lang="ts">
import P5ScriptDescriptor from "../../components/P5ScriptDescriptor.vue";
import JoyDivisionLines from "./JoyDivisionLinesScript.vue"

</script>

<template>
    <P5ScriptDescriptor 
      title="Joy Division Lines"
      description="Draw some symmetrical pictures"
      usageInstructions="Use the up and down keys to change the number of reflections. Click to clear the screen"
      :p5Script="JoyDivisionLines"
    />
</template>
