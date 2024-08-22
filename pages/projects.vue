<script setup lang="ts">
import projects from '~/helpers/projects';
import { checkMediumScreen } from '~/helpers/deviceType';

// Selects the project to display from index
const selectedProjectIndex = ref<number | null>(null);
const selectedProject = computed(() => {
    if (selectedProjectIndex.value === null) {
        return null;
    }
    return projects[selectedProjectIndex.value];
});

// Handle project selector emits
const handleSelectedProjectIndexUpdate = (i: number) => {
    selectedProjectIndex.value = i;
    p5ProjectKey.value++;
};

// Refresh the project viewer components upon screen resize
const p5ProjectKey = ref(0);

// For different project viewers (can't use hidden as must only compute one canvas per project)
const isSmallScreen = ref<boolean>(false);

const handleResize = () => {
    p5ProjectKey.value++;
    isSmallScreen.value = checkMediumScreen();
};

onMounted(() => {
    isSmallScreen.value = checkMediumScreen();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <ProjectsProjectSelector
        :selectedProjectIndex="selectedProjectIndex"
        :projects="projects"
        @setSelectedProjectIndex="handleSelectedProjectIndexUpdate"
    />

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
</template>

<style></style>
