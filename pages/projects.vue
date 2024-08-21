<script setup lang="ts">
import P5Project from '~/components/P5Project.vue';
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
                            'w-full px-4 py-5 text-center text-base font-medium text-col-dark sm:text-left',
                            i == selectedProjectIndex &&
                                'scale-[1.1] rounded-[25px] bg-col-light shadow-md transition ease-in-out'
                        ]"
                    >
                        {{ project.title }}
                    </button>
                </li>
            </ul>
        </div>

        <!-- 
        if small screen {
            if project selected {
                p5project
            } else {
                see my projects
            }
        } else {
            if project selected {
                p5project
            }         
        }
        
        -->
        <!-- <div class="fixed right-0 top-0 hidden h-full w-4/5 px-10 pb-6 pt-header sm:block sm:w-3/4">
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
        </div> -->
        <ProjectsMobileProjectViewer
            :key="p5ProjectKey"
            :project="selectedProject"
            @closeModal="selectedProjectIndex = null"
        />
    </div>
</template>

<style></style>
