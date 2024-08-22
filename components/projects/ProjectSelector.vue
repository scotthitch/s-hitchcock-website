<script setup lang="ts">
import type { projectsType } from '~/types';
import { checkMediumScreen } from '~/helpers/deviceType';

const props = defineProps<{ selectedProjectIndex: number | null; projects: projectsType[] }>();

const hoverIndex = ref<null | number>(null);

const emit = defineEmits(['setSelectedProjectIndex']);

const handleClick = (i: number) => {
    emit('setSelectedProjectIndex', i);
};

const handleHover = (i: number) => {
    hoverIndex.value = i;
    if (checkMediumScreen()) {
        return;
    }
    // emit('setSelectedProjectIndex', i);
};
</script>

<template>
    <ul class="flex w-full flex-col px-6 pb-12 pt-8 md:w-1/3 md:px-8 lg:w-1/4 lg:px-10">
        <li v-for="(project, i) in projects" :key="i" class="my-2 text-col-mid">
            <button
                @click="handleClick(i)"
                @mouseenter="handleHover(i)"
                @mouseleave="hoverIndex = null"
                :class="[
                    'w-full px-4 py-3 text-center text-base font-medium md:text-left',
                    i === hoverIndex &&
                        'bg-col-content text-col-bg scale-[1.02] rounded-[25px] shadow-md transition ease-in-out md:scale-[1.05]',

                    i == props.selectedProjectIndex && 'text-col-bg'
                ]"
            >
                <div class="flex flex-row justify-between space-x-6">
                    <div>
                        {{ project.title }}
                    </div>
                    <div class="italic">2022</div>
                </div>
            </button>
        </li>
    </ul>
</template>

<style></style>
