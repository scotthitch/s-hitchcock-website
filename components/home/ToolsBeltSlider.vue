<script setup lang="ts">
// chur UIBun https://www.uibun.dev/blog/tailwindcss-infinite-carousel

import {
    SVGPostgres,
    SVGVue,
    SVGArduino,
    SVGTypeScript,
    SVGMatlab,
    SVGPython,
    SVGFastAPI,
    SVGAWS,
    SVGP5JS,
    SVGOpenCV,
    SVGReact,
    SVGDocker,
    SVGCpp
} from '#components';

const svgs: Component[] = [
    SVGPostgres,
    SVGVue,
    SVGArduino,
    SVGTypeScript,
    SVGMatlab,
    SVGPython,
    SVGFastAPI,
    SVGAWS,
    SVGP5JS,
    SVGOpenCV,
    SVGReact,
    SVGDocker,
    SVGCpp
];
</script>

<template>
    <div class="py-12 pb-[1000px]">
        <div
            class="container mx-auto text-4xl font-semibold text-col-bg md:text-5xl xl:text-center"
        >
            <div>My <span class="text-col-mid">Toolbelt </span></div>
        </div>
        <div
            class="logos group relative mt-12 overflow-hidden whitespace-nowrap [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]"
        >
            <!-- Loop twice times to ensure it flows evenly -->
            <div v-for="_ in 3" class="animate-slide-left-infinite inline-flex w-max flex-row">
                <div v-for="svg in svgs" class="mx-3 flex flex-col items-center gap-1">
                    <component :is="svg" class="size-10 sm:mx-6 sm:size-14" />
                    <div class="text-col-bg">Description</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
