<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    assetPath: string,
    assetFileType: string
    downloadName: string,
}>();

</script>

<template>
    <a :href="props.assetPath" :download="`${downloadName}.${assetFileType}`">
        <button class="text-xs sm:text-sm md:text-md border-col-primary border-2 bg-white font-semibold text-col-primary rounded-md px-2 py-1">
            Download
        </button>
    </a>
</template>
