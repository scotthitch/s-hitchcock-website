<script setup lang="ts">
import { defineProps } from 'vue'
import type { P5ProjectProps } from '../types'
import P5Canvas from './P5Canvas.vue'

const props = defineProps<P5ProjectProps>()

</script>

<template>
    <div class="verticalPan relative h-[100svh] snap-always snap-center">
        <div v-if="props.state !== 'invisible'">
            <div class="absolute">
                <P5Canvas
                    :scriptID="props.scriptID"
                    :script="props.script"
                    :screenDimensions="props.projectDimensions"
                    :state="props.state"
                />
            </div>

            <div class="absolute bottom-2 left-2">
                <p class="text-6xl sm:text-7xl md:text-8xl font-bold text-white opacity-80">
                    {{ props.title }}
                </p>
            </div>

            <div class="absolute top-2 right-2">
                <p class="text-xl lg:text-3xl font-bold text-white opacity-80">
                    {{ props.usageInstructions }}
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
