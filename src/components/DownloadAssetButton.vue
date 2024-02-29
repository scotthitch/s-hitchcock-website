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
        <button>
            Download
        </button>
    </a>
</template>
