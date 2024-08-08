<script setup lang="ts">
import P5Canvas from '~/components/P5Canvas.vue';
import scriptWrapper from '~/p5Projects/Waves';
</script>

<template>
    <P5Canvas scriptID="waves" :scriptWrapper="scriptWrapper" state="visible" />
</template>

<style scoped></style>
