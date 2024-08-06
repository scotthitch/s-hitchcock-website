<script setup lang="ts">
import type { P5ProjectProps } from '~/types'
import P5Canvas from './P5Canvas.vue'

const props = defineProps<P5ProjectProps>()
</script>

<template>
    <div class="relative h-full flex flex-col gap-1">
        <!-- <div class="h-full"> -->
        <div class="basis-[90%] rounded-[32px]">
            <P5Canvas :scriptID="props.scriptID" :scriptWrapper="props.scriptWrapper" />
        </div>
        <p class="text-center mt-2">
            <!-- <span class="font-bold text-col-dark">{{ $props.title }}</span> -->
            <span class="font-bold text-lg text-col-darl">{{ props.title }}</span>
        </p>
        <p class="text-center">
            <!-- <span class="font-bold text-col-dark">{{ $props.title }}</span> -->
            <span class="font-medium text-col-mid italic">{{ props.description }}.</span>
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

<style></style>
