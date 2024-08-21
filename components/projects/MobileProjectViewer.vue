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
        class="fixed inset-0 z-50 flex touch-none items-center justify-center bg-black bg-opacity-75 backdrop-blur-md sm:hidden"
    >
        <!-- Modal Content -->
        <div class="relative mx-auto mt-12 h-[92%] w-[85%] py-4">
            <button
                @click="$emit('closeModal')"
                id="close-modal"
                class="absolute -right-4 -top-0 z-10 rounded-full bg-col-light p-3 text-col-dark"
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
            <P5Project
                :title="props.project.title"
                :scriptID="props.project.scriptID"
                :description="props.project.description"
                :scriptWrapper="props.project.scriptWrapper"
            />
        </div>
    </div>
</template>

<style></style>
