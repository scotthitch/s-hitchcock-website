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
            <div class="basis-1/5 pl-12">
                <ul class="flex flex-col gap-14 h-full py-4 text-lg overflow-scroll">
                    <li v-for="(project, i) in projects" class="text-left font-medium" :key="i">
                        <button @mouseenter="selectedProjectIndex = i">
                            {{ project.title }}
                        </button>
                    </li>
                </ul>
            </div>
            <div class="grow h-full content-center">
                <div class="h-full pb-6">
                    <P5Project
                        v-if="selectedProject !== null"
                        :key="p5ProjectKey"
                        :title="selectedProject.title"
                        :scriptID="selectedProject.scriptID"
                        :description="selectedProject.description"
                        :scriptWrapper="selectedProject.scriptWrapper"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
