<script setup lang="ts">
const props = defineProps<{ pageName: string }>()
</script>

<template>
    <div class="verticalPan relative h-[80svh] sm:h-[80svh] snap-always snap-center bg-cv-blue">
        <div class="flex h-full">
            <div
                class="m-auto text-6xl sm:text-8xl font-bold italic slide-from-left-60 text-col-secondary"
            >
                {{ props.pageName }}
            </div>
        </div>
    </div>
</template>
