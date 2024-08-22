<script setup lang="ts">
import type { projectType } from '~/types';
import { format } from 'date-fns';

const props = defineProps<{ selectedProjectIndex: number | null; projects: projectType[] }>();

const emit = defineEmits(['setSelectedProjectIndex']);

const handleClick = (i: number) => {
    emit('setSelectedProjectIndex', i);
};
</script>

<template>
    <div class="w-full px-6 pb-12 pt-8 md:w-1/3 md:px-8 lg:w-1/4 lg:px-10">
        <ProjectsCheckThisOut class="text-col-bg block px-24 py-24 md:hidden" />

        <ul class="flex w-full flex-col">
            <li v-for="(project, i) in projects" :key="i" class="my-2 text-col-mid">
                <button
                    @click="handleClick(i)"
                    :class="[
                        'hover:bg-col-content hover:text-col-bg w-full px-4 py-3 text-center text-base font-medium duration-[20ms] ease-linear hover:scale-[1.02] hover:rounded-[25px] hover:bg-opacity-30 hover:shadow-lg hover:backdrop-blur-md md:text-left hover:md:scale-[1.05]',

                        i == props.selectedProjectIndex && 'text-col-bg'
                    ]"
                >
                    <div class="flex flex-row items-center justify-between space-x-6">
                        <div>
                            {{ project.title }}
                        </div>
                        <div class="italic">{{ format(project.date, 'yyyy') }}</div>
                    </div>
                </button>
            </li>
        </ul>
    </div>
</template>

<style></style>
