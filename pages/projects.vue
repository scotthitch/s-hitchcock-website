<script setup lang="ts">
import P5Project from '~/components/P5Project.vue';
import projects from '~/helpers/projects';

const selectedProjectIndex = ref<null | number>(null);
const selectedProject = computed(() => {
    if (selectedProjectIndex.value === null) {
        return null;
    }
    return projects[selectedProjectIndex.value];
});
const p5ProjectKey = ref(0);

const handleResize = () => {
    p5ProjectKey.value++;
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
        <div class="w-1/5 px-3 pb-12 sm:w-1/4 lg:px-8">
            <ul class="flex flex-col px-4 lg:pl-12">
                <li
                    v-for="(project, i) in projects"
                    class="button my-2 px-4 py-5 text-left text-base font-medium text-col-dark"
                    :key="i"
                    :class="
                        i == selectedProjectIndex &&
                        'scale-[1.1] rounded-[25px] bg-col-light shadow-md transition ease-in-out'
                    "
                    @mouseenter="selectedProjectIndex = i"
                    @click="selectedProjectIndex = i"
                >
                    {{ project.title }}
                </li>
            </ul>
        </div>
        <div class="pt-header fixed right-0 top-0 h-full w-4/5 content-center px-10 sm:w-3/4">
            <div class="h-full pb-6">
                <P5Project
                    v-if="selectedProject !== null"
                    :key="p5ProjectKey + selectedProject.scriptID"
                    :title="selectedProject.title"
                    :scriptID="selectedProject.scriptID"
                    :description="selectedProject.description"
                    :scriptWrapper="selectedProject.scriptWrapper"
                />
                <div
                    v-else
                    class="relative h-full content-center pb-[80px] text-center text-2xl font-semibold italic text-col-mid"
                >
                    Check out some of the things I’ve built...
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
