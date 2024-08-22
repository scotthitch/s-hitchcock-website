<script setup lang="ts">
import type { projectsType } from '~/types';
import { checkSmallScreen } from '~/helpers/deviceType';

const props = defineProps<{ selectedProjectIndex: number | null; projects: projectsType[] }>();

const emit = defineEmits(['setSelectedProjectIndex']);

const handleClick = (i: number) => {
    emit('setSelectedProjectIndex', i);
};

const handleHover = (i: number) => {
    if (checkSmallScreen()) {
        return;
    }
    emit('setSelectedProjectIndex', i);
};
</script>

<template>
    <div class="w-full px-3 pb-12 pt-8 sm:w-1/4 sm:pt-0 lg:px-8">
        <ul class="flex flex-col px-4 lg:pl-12">
            <li v-for="(project, i) in projects" :key="i" class="my-2">
                <button
                    @click="handleClick(i)"
                    :class="[
                        'text-col-bg w-full px-4 py-5 text-center text-base font-medium sm:text-left',
                        i == props.selectedProjectIndex &&
                            'bg-col-content scale-[1.1] rounded-[25px] shadow-md transition ease-in-out'
                    ]"
                >
                    {{ project.title }}
                </button>
            </li>
        </ul>
    </div>
</template>

<style></style>
