<script setup lang="ts">
import type { projectsType } from '~/types';
import { checkSmallScreen } from '~/helpers/deviceType';

const props = defineProps<{ selectedProjectIndex: number | null; projects: projectsType[] }>();

const hoverIndex = ref<null | number>(null);

const emit = defineEmits(['setSelectedProjectIndex']);

const handleClick = (i: number) => {
    emit('setSelectedProjectIndex', i);
};

const handleHover = (i: number) => {
    hoverIndex.value = i;
    if (checkSmallScreen()) {
        return;
    }
    // emit('setSelectedProjectIndex', i);
};
</script>

<template>
    <div class="w-full px-3 pb-12 pt-8 sm:w-1/4 sm:pt-0 lg:px-8">
        <ul class="flex flex-col px-4 lg:pl-12">
            <li v-for="(project, i) in projects" :key="i" class="my-2 text-col-mid">
                <button
                    @click="handleClick(i)"
                    @mouseenter="handleHover(i)"
                    @mouseleave="hoverIndex = null"
                    :class="[
                        'w-full px-4 py-5 text-center text-base font-medium sm:text-left',
                        i === hoverIndex &&
                            'bg-col-content text-col-bg scale-[1.05] rounded-[25px] shadow-md transition ease-in-out',

                        i == props.selectedProjectIndex && 'text-col-bg'
                    ]"
                >
                    {{ project.title }}
                </button>
            </li>
        </ul>
    </div>
</template>

<style></style>
