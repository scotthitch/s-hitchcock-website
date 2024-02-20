<script setup lang="ts">
import P5 from 'p5' // Package from npm
import { onMounted, defineProps, ref, onUnmounted } from 'vue';
import type { P5ScriptProps } from '../types'


const props = defineProps<P5ScriptProps>()

const p5 = ref<P5>();

onMounted(() => {
    p5.value = new P5(props.script(props), props.scriptName);
})

onUnmounted(() => {
    p5.value.remove()
})
</script>

<template>
    <div :id="props.scriptName"></div>
</template>