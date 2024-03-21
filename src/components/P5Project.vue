<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import type { P5ProjectProps } from '../types'
import P5Canvas from './P5Canvas.vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<P5ProjectProps>()

const target = ref(null)
const targetIsVisible = ref(false)

onMounted(() => {
    const intersectionObserverOptions = {
        root: null,
        rootMargin: '500px',
        threshold: 0.00001
    }

    useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
            targetIsVisible.value = isIntersecting
        },
        intersectionObserverOptions
    )
})
</script>

<template>
    <div ref="target" class="verticalPan relative h-screen snap-always snap-center">
        <div v-if="targetIsVisible">
            <div class="absolute">
                <P5Canvas
                    :scriptID="props.scriptID"
                    :script="props.script"
                    :screenDimensions="props.projectDimensions"
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
