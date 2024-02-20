<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps } from 'vue';
import type { P5Props } from '../../types'
import scriptPropsWrapper from "./script"

const props = defineProps<P5Props>()

onMounted(() => {
    new P5(scriptPropsWrapper(props), 'Kaleidoscope');

})
</script>

<template>
    <div id="Kaleidoscope"></div>
</template>