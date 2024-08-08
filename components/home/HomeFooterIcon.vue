<script setup lang="ts">
const props = defineProps<{
    iconName: string;
    fileName: string;
    iconAlt: string;
    externalLink: string;
}>();
</script>

<template>
    <a :href="props.externalLink">
        <div class="flex flex-col items-center gap-1">
            <img
                :src="`/buildToolsLogos/${props.fileName}`"
                :alt="props.iconAlt"
                class="h-7 sm:h-9"
            />

            <div class="text-sm font-medium text-col-dark">
                {{ props.iconName }}
            </div>
        </div>
    </a>
</template>

<style></style>
