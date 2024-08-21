<script setup lang="ts">
const props = defineProps<{
    assetPath: string;
    assetFileType: string;
    downloadName: string;
    buttonName: string;
}>();
</script>

<template>
    <a :href="props.assetPath" :download="`${downloadName}.${assetFileType}`">
        <button
            class="md:text-md border-col-bg text-col-bg rounded-md border-2 bg-white px-2 py-1 text-xs font-semibold sm:text-sm"
        >
            {{ buttonName }}
        </button>
    </a>
</template>
