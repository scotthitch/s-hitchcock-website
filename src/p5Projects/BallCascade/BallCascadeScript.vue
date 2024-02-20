<script setup lang="ts">
import P5Script from '../../components/P5Script.vue';
import script from "./script"

</script>

<template>
    <P5Script
        :screenHeight="400"
        :screenWidth="400"
        :script="script"
        :scriptIsPlaying="true"
        scriptName="ball-cascade"
        />
</template>