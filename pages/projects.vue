<script setup lang="ts">
import projects from '~/helpers/projects';
import { checkSmallScreen } from '~/helpers/deviceType';

const selectedProjectIndex = ref<null | number>(null);
const selectedProject = computed(() => {
    if (selectedProjectIndex.value === null) {
        return null;
    }
    return projects[selectedProjectIndex.value];
});
const p5ProjectKey = ref(0);
const isSmallScreen = ref<boolean>(false);

const handleResize = () => {
    p5ProjectKey.value++;
    isSmallScreen.value = checkSmallScreen();
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
// const projectClick = () => {}
</script>

<template>
    <div class="container mx-auto">
        <div class="w-full px-3 pb-12 pt-8 sm:w-1/4 sm:pt-0 lg:px-8">
            <ul class="flex flex-col px-4 lg:pl-12">
                <li v-for="(project, i) in projects" :key="i" class="my-2">
                    <button
                        @click="selectedProjectIndex = i"
                        :class="[
                            'text-col-bg w-full px-4 py-5 text-center text-base font-medium sm:text-left',
                            i == selectedProjectIndex &&
                                'scale-[1.1] rounded-[25px] bg-col-light shadow-md transition ease-in-out'
                        ]"
                    >
                        {{ project.title }}
                    </button>
                </li>
            </ul>
        </div>

        <ProjectsMobileProjectViewer
            v-if="isSmallScreen"
            :key="p5ProjectKey + '-mobile'"
            :project="selectedProject"
            @closeModal="selectedProjectIndex = null"
        />
        <ProjectsDesktopProjectViewer
            v-else
            :key="p5ProjectKey + '-desktop'"
            :project="selectedProject"
        />
    </div>
</template>

<style></style>
