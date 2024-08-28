<script setup lang="ts">
import type { workExperience, companies } from '~/types';

const props = defineProps<workExperience>();

console.log(props);
const comapanyColourVariants: {
    bg: { companies: string };
    content: { companies: string };
} = {
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
        class="relative flex min-w-[250px] max-w-[400px] basis-1/3 flex-col items-center justify-center overflow-y-auto overflow-x-visible rounded-[28px] px-12 shadow-2xl transition ease-in-out hover:scale-[0.95]"
        :class="`${comapanyColourVariants.bg[props.company]}`"
    >
        <div class="flex flex-grow items-center justify-center">
            <img :src="props.imgSrc" class="max-h-12" />
        </div>
        <div
            class="absolute bottom-0 mb-4 text-base font-semibold italic"
            :class="`${comapanyColourVariants.content[props.company]}`"
        >
            {{ props.dateRange }}
        </div>
    </button>
</template>

<style>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
    background-color: transparent;

    perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
    background-color: #bbb;
    color: black;
}

/* Style the back side */
.flip-card-back {
    background-color: dodgerblue;
    color: white;
    transform: rotateY(180deg);
}
</style>
