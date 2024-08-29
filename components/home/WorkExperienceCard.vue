<script setup lang="ts">
import type { WorkExperience, ComapanyColourVariants } from '~/types';

const props = defineProps<WorkExperience>();

// Must be available here for tailwind
const comapanyColourVariants: ComapanyColourVariants = {
    bg: {
        trimble: 'bg-[#015e99]',
        bluelab: 'bg-[#0137f5]',
        axys: 'bg-[#ffffff]'
    },
    content: {
        trimble: 'text-[#ffffff]',
        bluelab: 'text-[#ffffff]',
        axys: 'text-[#000000]'
    }
};

const isSelected = ref<boolean>(false);

const handleClick = () => {
    isSelected.value = !isSelected.value;
};
</script>

<template>
    <button
        @click="handleClick"
        class="h-[400px] min-w-[280px] max-w-[430px] basis-1/3 rounded-[28px] shadow-2xl transition ease-in-out hover:scale-[0.97]"
        :class="`${comapanyColourVariants.bg[props.company]}`"
    >
        <Transition mode="out-in">
            <div
                class="relative flex h-full flex-col items-center justify-center px-12 transition ease-in-out"
                v-if="!isSelected"
            >
                <div class="flex flex-grow items-center justify-center">
                    <img :src="props.imgSrc" class="max-h-12" />
                </div>
                <div
                    class="absolute bottom-0 mb-4 text-sm font-semibold italic xl:text-base"
                    :class="`${comapanyColourVariants.content[props.company]}`"
                >
                    {{ props.dateRange }}
                </div>
            </div>
            <div v-else>Hey</div>
        </Transition>
    </button>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
