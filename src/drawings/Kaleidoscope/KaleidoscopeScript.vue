<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps } from 'vue';
import type { P5Props } from '../../types'
import script from "./script"

const props = defineProps<P5Props>()

onMounted(() => {
    new P5(script(props), 'Kaleidoscope');

})
</script>

<template>
    <div id="Kaleidoscope"></div>
</template>