<script setup lang="ts">
import type { projectsType } from '~/types';

const props = defineProps<{ project: projectsType | null }>();
</script>

<template>
    <div
        class="fixed right-0 top-0 h-full w-4/5 px-10 pb-6 pt-header sm:w-3/4"
        id="desktop-project-viewer"
    >
        <div class="relative flex h-full flex-col gap-1" v-if="props.project !== null">
            <div class="project-enter basis-[90%] rounded-[32px] shadow-2xl">
                <P5Canvas
                    :scriptID="props.project.scriptID"
                    :scriptWrapper="props.project.scriptWrapper"
                />
            </div>
            <p class="mt-2 text-center">
                <span class="text-base font-bold text-col-dark sm:text-lg">{{
                    props.project.title
                }}</span>
            </p>
            <p class="text-center">
                <span class="text-sm font-medium italic text-col-mid sm:text-base"
                    >{{ props.project.description }}.</span
                >
            </p>
        </div>
        <div
            v-else
            class="relative h-full content-center pb-[80px] text-center text-2xl font-semibold italic text-col-mid"
        >
            Check out some of the things I’ve built...
        </div>
    </div>
</template>

<style></style>
