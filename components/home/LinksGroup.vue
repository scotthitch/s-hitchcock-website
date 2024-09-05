<script setup lang="ts">
import { SVGGitHub, SVGLinkedIn } from '#components';

const svgs: {
    component: Component;
    to: string;
    hoverColour: string;
}[] = [
    {
        component: SVGLinkedIn,
        to: 'https://www.linkedin.com/in/scott-hitchcock/',
        hoverColour: 'hover:fill-[#1F66C2]'
    },
    {
        component: SVGGitHub,
        to: 'https://github.com/scotthitch/',
        hoverColour: 'hover:fill-[#010408]'
    }
];
</script>
<template>
    <div
        class="absolute right-12 top-6 mt-header flex flex-row items-center justify-center gap-3 text-center"
    >
        <NuxtLink
            v-for="svg in svgs"
            :to="svg.to"
            class="size-7 fill-col-mid transition ease-in-out md:size-8 lg:size-9"
            :class="svg.hoverColour"
            target="_blank"
        >
            <component :is="svg.component" />
        </NuxtLink>
    </div>
</template>

<style></style>
