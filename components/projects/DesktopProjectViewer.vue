<script setup lang="ts">
import type { projectsType } from '~/types';

const props = defineProps<{ project: projectsType | null }>();
</script>

<template>
    <div class="fixed right-0 top-0 h-full w-4/5 px-10 pb-6 pt-header sm:w-3/4">
        <P5Project
            v-if="props.project !== null"
            :title="props.project.title"
            :scriptID="props.project.scriptID"
            :description="props.project.description"
            :scriptWrapper="props.project.scriptWrapper"
        />
        <div
            v-else
            class="relative h-full content-center pb-[80px] text-center text-2xl font-semibold italic text-col-mid"
        >
            Check out some of the things I’ve built...
        </div>
    </div>
</template>

<style></style>
