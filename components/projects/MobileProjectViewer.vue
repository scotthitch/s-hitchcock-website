<script setup lang="ts">
import type { projectsType } from '~/types';
import { defineEmits } from 'vue';

const props = defineProps<{ project: projectsType | null }>();

const emit = defineEmits(['closeModal']);

const closeModal = () => {
    emit('closeModal');
};

const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
    <div
        v-if="props.project !== null"
        id="mobile-project-viewer"
        class="fixed inset-0 z-50 flex touch-none items-center justify-center bg-black bg-opacity-75 backdrop-blur-md"
    >
        <!-- Modal Content -->
        <div class="relative mx-auto mt-12 h-[92%] w-[85%] py-4">
            <button
                @click="$emit('closeModal')"
                id="close-modal"
                class="bg-col-content absolute -right-4 -top-0 z-10 rounded-full p-3"
            >
                <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
            <div class="relative flex h-full flex-col gap-1">
                <div class="project-enter basis-[90%] rounded-[32px] shadow-2xl">
                    <P5Canvas
                        :scriptID="props.project.scriptID"
                        :scriptWrapper="props.project.scriptWrapper"
                    />
                </div>
                <p class="mt-2 text-center">
                    <span class="text-col-bg text-base font-bold sm:text-lg">{{
                        props.project.title
                    }}</span>
                </p>
                <p class="text-center">
                    <span class="text-sm font-medium italic text-col-mid sm:text-base"
                        >{{ props.project.description }}.</span
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<style></style>
