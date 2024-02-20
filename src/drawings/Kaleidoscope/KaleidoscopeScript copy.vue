<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps } from 'vue';
import type { PolarCoordinates, CartesianCoordinates, P5Props } from '../../types'
import Penis from "./script"


// const props = defineProps({
//     screenWidth: {type: Number, required: true},
//     screenHeight: {type: Number, required: true},
//     scriptIsPlaying: {type: Boolean, required: true},
// })

const props = defineProps<P5Props>()



onMounted(() => {
    // console.log(script())
    let p = new Penis(props);
    console.log(p.script)
    new P5(p.script, 'Kaleidoscope');

})

</script>

<template>
    
    <div id="Kaleidoscope"></div>
    
</template>