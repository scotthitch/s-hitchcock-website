<script setup lang="ts">
import script from "../drawings/sdf.js"
import P5 from 'p5' // Package from npm
import { onMounted } from 'vue';

onMounted(() => {
  const p5canvas = new P5(script, 'hello');


})

</script>

<template>
  <div id="hello">This is a home page</div>
</template>
