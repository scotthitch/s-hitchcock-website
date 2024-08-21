<script setup lang="ts">
import projects from '~/helpers/projects';
import { checkSmallScreen } from '~/helpers/deviceType';

// Selects the project to display from index
const selectedProjectIndex = ref<number | null>(null);
const selectedProject = computed(() => {
    if (selectedProjectIndex.value === null) {
        return null;
    }
    return projects[selectedProjectIndex.value];
});

// Refresh the project viewer components upon screen resize
const p5ProjectKey = ref(0);

// For different project viewers (can't use hidden as must only compute one canvas per project)
const isSmallScreen = ref<boolean>(false);

const handleResize = () => {
    p5ProjectKey.value++;
    isSmallScreen.value = checkSmallScreen();
};

onMounted(() => {
    isSmallScreen.value = checkSmallScreen();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div class="container mx-auto">
        <ProjectsProjectSelector
            :selectedProjectIndex="selectedProjectIndex"
            :projects="projects"
            @setSelectedProjectIndex="(i: number) => (selectedProjectIndex = i)"
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
    </div>
</template>

<style></style>
