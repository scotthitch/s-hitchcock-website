<script setup lang="ts">
import P5Canvas from '../../components/P5Canvas.vue';
import script from "./script"

</script>

<template>
    <P5Canvas
        :screenDimensions="{width: 400, height: 400}"
        :script="script"
        scriptName="kaleidoscope"
        />
</template>