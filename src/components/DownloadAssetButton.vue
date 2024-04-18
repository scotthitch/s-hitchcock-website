<script setup lang="ts">
const props = defineProps<{
    assetPath: string
    assetFileType: string
    downloadName: string
    buttonName: string
}>()
</script>

<template>
    <a :href="props.assetPath" :download="`${downloadName}.${assetFileType}`">
        <button
            class="text-xs sm:text-sm md:text-md border-col-dark border-2 bg-white font-semibold text-col-dark rounded-md px-2 py-1"
        >
            {{ buttonName }}
        </button>
    </a>
</template>
