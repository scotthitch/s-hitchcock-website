<script setup lang="ts">
const props = defineProps<{ pageName: string }>();
</script>

<template>
    <div class="verticalPan bg-col-bg relative h-[80svh] snap-center snap-always sm:h-[80svh]">
        <div class="flex h-full">
            <div
                class="slide-from-left-60 m-auto text-6xl font-bold italic text-col-light sm:text-8xl"
            >
                {{ props.pageName }}
            </div>
        </div>
    </div>
</template>
