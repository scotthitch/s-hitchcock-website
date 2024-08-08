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
    <div class="container mx-auto h-full">
        <div class="flex h-full flex-row gap-6 pt-2 text-col-dark">
            <div class="basis-1/5 px-8 sm:basis-1/4">
                <ul class="flex h-full flex-col overflow-scroll px-4 pb-16 sm:pl-12">
                    <li
                        v-for="(project, i) in projects"
                        class="button my-2 px-3 py-4 text-left text-base font-medium"
                        :key="i"
                        :class="
                            i == selectedProjectIndex &&
                            'scale-[1.1] rounded-[20px] bg-col-light shadow-md transition ease-in-out'
                        "
                        @mouseenter="selectedProjectIndex = i"
                        @click="selectedProjectIndex = i"
                    >
                        {{ project.title }}
                    </li>
                </ul>
            </div>
            <div class="h-full grow content-center">
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
    </div>
</template>

<style></style>
