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
        class="min-h-[435px] min-w-[320px] max-w-[430px] basis-1/3 rounded-[28px] shadow-2xl transition ease-in-out hover:scale-[1.03]"
        :class="`${comapanyColourVariants.bg[props.company]}`"
    >
        <Transition mode="out-in">
            <div
                class="relative flex h-full flex-col items-center justify-center px-12 transition ease-in-out"
                v-if="!isSelected"
            >
                <div class="flex flex-grow items-center justify-center">
                    <!-- TODO: use NuxtImg when ssr sorted -->
                    <img :src="props.imgSrc" class="max-h-12" />
                </div>
                <div
                    class="absolute bottom-0 mb-4 text-sm font-semibold italic xl:text-base"
                    :class="`${comapanyColourVariants.content[props.company]}`"
                >
                    {{ props.location }}, {{ props.dateRange }}
                </div>
            </div>
            <div
                v-else
                class="flex h-full flex-col gap-5 p-7 xl:p-9"
                :class="`${comapanyColourVariants.content[props.company]}`"
            >
                <div class="flex flex-row items-center justify-between">
                    <img :src="props.imgSrc" class="max-h-7" />
                    <div
                        class="text-sm font-medium italic xl:text-base"
                        :class="`${comapanyColourVariants.content[props.company]}`"
                    >
                        {{ props.dateRange }}
                    </div>
                </div>
                <div class="text-start xl:mt-2">
                    <div class="text-lg font-semibold italic">{{ props.role }}</div>
                    <div class="text-base">
                        {{ props.brief }}
                    </div>
                </div>

                <div class="text-start">
                    <div class="text-lg font-semibold italic">Skills & Tools</div>
                    <ul class="grid grid-cols-2 gap-x-8 pl-3 text-base">
                        <li v-for="skill in props.skills" class="list-disc">
                            {{ skill }}
                        </li>
                    </ul>
                </div>
            </div>
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
