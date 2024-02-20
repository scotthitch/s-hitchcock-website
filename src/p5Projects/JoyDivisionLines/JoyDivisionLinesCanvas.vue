<script setup lang="ts">
import P5Canvas from '../../components/P5Canvas.vue';
import script from "./script"

</script>

<template>
    <P5Canvas
        :screenHeight="400"
        :screenWidth="400"
        :script="script"
        :scriptIsPlaying="true"
        scriptName="joy-division-lines"
        />
</template>