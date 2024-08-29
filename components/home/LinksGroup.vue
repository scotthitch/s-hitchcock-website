<script setup lang="ts">
import { SVGGitHub, SVGLinkedIn } from '#components';

const svgs: {
    component: Component;
    to: string;
}[] = [
    { component: SVGLinkedIn, to: 'https://www.linkedin.com/in/scott-hitchcock/' },
    {
        component: SVGGitHub,
        to: 'https://github.com/scotthitch/'
    }
];
</script>
<template>
    <div class="absolute right-6 top-6 mt-header flex flex-row gap-3 sm:right-8">
        <NuxtLink v-for="svg in svgs" :to="svg.to" class="size-7 sm:size-9">
            <component :is="svg.component" />
        </NuxtLink>
    </div>
</template>

<style></style>
