<script setup lang="ts">
import getImageURL from '../../helpers/getImageURL'

const props = defineProps<{
    iconName: string
    fileName: string
    iconAlt: string
    externalLink: string
}>()
</script>

<template>
    <a :href="props.externalLink">
        <div class="flex flex-col gap-1 items-center">
            <img
                :src="getImageURL('buildToolsLogos/' + props.fileName)"
                :alt="props.iconAlt"
                class="h-7 sm:h-9"
            />
            <div class="text-sm text-col-primary font-medium">
                {{ props.iconName }}
            </div>
        </div>
    </a>
</template>

<style></style>
