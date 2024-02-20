<script setup lang="ts">
import P5ScriptDescriptor from "../../components/P5ScriptDescriptor.vue";
import KaleidoscopeScript from "./KaleidoscopeScript.vue"

</script>

<template>
    <P5ScriptDescriptor 
      title="Kaleidoscope"
      description="Draw some symmetrical pictures"
      usageInstructions="Use the up and down keys to change the number of reflections. Click to clear the screen"
      :p5Script="KaleidoscopeScript"
      :defaultScreenWidth="400"
      :defaultScreenHeight="400"
    />
</template>
