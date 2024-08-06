<script setup lang="ts">
import P5Project from '~/components/P5Project.vue'
import PageIntro from '~/components/PageIntro.vue'
// import ExploreMoreProjectsOnDesktop from './ExploreMoreProjectsOnDesktop.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { isMobileOrTablet } from '~/helpers/deviceType'
import type { projectsType } from '~/types'
import projects from '~/helpers/projects'

const selectedProjectIndex = ref<null | number>(null)
const selectedProject = computed(() => {
    if (selectedProjectIndex.value === null) {
        return null
    }
    return projects[selectedProjectIndex.value]
})
const p5ProjectKey = ref(0)

const handleResize = () => {
    p5ProjectKey.value++
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
// const projectClick = () => {}
</script>

<template>
    <div class="container mx-auto h-full">
        <div class="pt-2 flex flex-row text-col-dark h-full gap-6">
            <div class="basis-1/5 px-8">
                <ul class="flex flex-col h-full pt-4 pb-16 text-lg overflow-scroll px-4">
                    <li
                        v-for="(project, i) in projects"
                        class="text-left font-medium py-4 my-2 button px-3"
                        :key="i"
                        :class="
                            i == selectedProjectIndex &&
                            'scale-[1.1] rounded-[20px] shadow-md transition ease-in-out'
                        "
                        @mouseenter="selectedProjectIndex = i"
                        @click="selectedProjectIndex = i"
                    >
                        {{ project.title }}
                    </li>
                </ul>
            </div>
            <div class="grow h-full content-center">
                <div class="h-full pb-6">
                    <Transition name="fade-transition">
                        <P5Project
                            v-if="selectedProject !== null"
                            :key="p5ProjectKey + selectedProject.scriptID"
                            :title="selectedProject.title"
                            :scriptID="selectedProject.scriptID"
                            :description="selectedProject.description"
                            :scriptWrapper="selectedProject.scriptWrapper"
                        />
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.fade-transition-enter-active {
    animation: fade-in 0.3s;
}

.fade-transition-leave-to {
    opacity: 0;
}

@keyframes fade-in {
    0% {
        transform: scale(0.98);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 100;
    }
}
</style>
