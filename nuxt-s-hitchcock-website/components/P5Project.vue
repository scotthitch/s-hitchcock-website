<script setup lang="ts">
import type { P5ProjectProps } from '../types'
import P5Canvas from './P5Canvas.vue'

const props = defineProps<P5ProjectProps>()
</script>

<template>
    <div class="verticalPan relative h-full snap-always snap-center">
        <div class="h-full" v-if="props.state !== 'invisible'">
            <div class="h-full">
                <P5Canvas
                    :scriptID="props.scriptID"
                    :scriptWrapper="props.scriptWrapper"
                    :state="props.state"
                />
            </div>

            <div class="absolute bottom-2 left-2 slide-from-left-40">
                <p class="text-5xl sm:text-6xl md:text-7xl font-bold italic text-white opacity-80">
                    {{ props.title }}
                </p>
            </div>

            <div class="absolute top-2 right-2 left-2 text-right fade-in slide-from-right-40">
                <p class=" text-base sm:text-lg lg:text-xl font-bold italic text-white opacity-80">
                    {{ props.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.verticalPan {
    touch-action: pan-y;
}
</style>
../helpers/composables
