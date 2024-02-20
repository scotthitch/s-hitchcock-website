<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps, ref, onUnmounted } from 'vue';
import type { P5Props } from '../../types'
import script from "./script"

const props = defineProps<P5Props>()

const p5 = ref<P5>();

onMounted(() => {
    p5.value = new P5(script(props), 'Kaleidoscope');
})

onUnmounted(() => {
    p5.value.remove()
})
</script>

<template>
    <div id="Kaleidoscope"></div>
</template>