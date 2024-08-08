<script setup lang="ts">
import type { P5ProjectProps } from '~/types'
import P5Canvas from './P5Canvas.vue'

const props = defineProps<P5ProjectProps>()
</script>

<template>
    <div class="relative flex h-full flex-col gap-1">
        <!-- <div class="h-full"> -->
        <div class="project-enter basis-[90%] rounded-[32px] shadow-2xl">
            <P5Canvas :scriptID="props.scriptID" :scriptWrapper="props.scriptWrapper" />
        </div>
        <p class="mt-2 text-center">
            <!-- <span class="font-bold text-col-dark">{{ $props.title }}</span> -->
            <span class="text-col-darl text-lg font-bold">{{ props.title }}</span>
        </p>
        <p class="text-center">
            <!-- <span class="font-bold text-col-dark">{{ $props.title }}</span> -->
            <span class="font-medium italic text-col-mid">{{ props.description }}.</span>
        </p>

        <!-- <div class="absolute bottom-2 left-4 slide-from-left-40">
                <p class="text-5xl sm:text-6xl md:text-7xl font-bold italic text-white opacity-80">
                    {{ props.title }}
                </p>
            </div>

            <div class="absolute top-2 right-4 left-2 text-right fade-in slide-from-right-40">
                <p class="text-base sm:text-lg lg:text-xl font-bold italic text-white opacity-80">
                    {{ props.description }}
                </p>
            </div> -->
        <!-- </div> -->
    </div>
</template>

<style>
.project-enter {
    animation: fade-in 0.4s;
}

@keyframes fade-in {
    0% {
        transform: scale(0.98);
        opacity: 0.2;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
