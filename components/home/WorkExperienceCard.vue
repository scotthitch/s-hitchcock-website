<script setup lang="ts">
import type { WorkExperience, ComapanyColourVariants } from '~/types';

const props = defineProps<WorkExperience>();

// Must be available here for tailwind
const comapanyColourVariants: ComapanyColourVariants = {
    bg: {
        trimble: 'bg-[#015e99]',
        bluelab: 'bg-[#0137f5]',
        axys: 'bg-[#ffffff]'
    },
    content: {
        trimble: 'text-[#ffffff]',
        bluelab: 'text-[#ffffff]',
        axys: 'text-[#000000]'
    }
};
</script>

<template>
    <button
        class="relative flex h-[380px] min-w-[250px] max-w-[450px] basis-1/3 flex-col items-center justify-center overflow-x-visible rounded-[28px] px-12 shadow-2xl transition ease-in-out hover:scale-[0.95]"
        :class="`${comapanyColourVariants.bg[props.company]}`"
    >
        <div class="flex flex-grow items-center justify-center">
            <img :src="props.imgSrc" class="max-h-12" />
        </div>
        <div
            class="absolute bottom-0 mb-4 text-sm font-semibold italic xl:text-base"
            :class="`${comapanyColourVariants.content[props.company]}`"
        >
            {{ props.dateRange }}
        </div>
    </button>
</template>

<style></style>
