<script setup lang="ts">
import type { ProjectType } from '~/types';

const props = defineProps<{ project: ProjectType | null }>();
</script>

<template>
    <div
        class="project-enter fixed right-0 top-0 h-full w-4/5 pb-6 pr-8 pt-header md:w-2/3 lg:w-3/4 xl:px-16"
        id="desktop-project-viewer"
    >
        <div class="relative flex h-full flex-col gap-1" v-if="props.project !== null">
            <div class="basis-[90%] rounded-[32px] shadow-2xl">
                <P5Canvas
                    :scriptID="props.project.scriptID"
                    :scriptWrapper="props.project.scriptWrapper"
                />
            </div>
            <p class="mt-2 text-center">
                <span class="text-base font-bold text-col-bg sm:text-lg">{{
                    props.project.title
                }}</span>
            </p>
            <p class="text-center">
                <span class="text-sm font-medium italic text-col-mid sm:text-base"
                    >{{ props.project.description }}.</span
                >
            </p>
        </div>
        <ProjectsCheckThisOut v-else class="relative h-full pb-[80px] text-col-mid" />
    </div>
</template>

<style></style>
