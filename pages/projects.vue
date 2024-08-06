<script setup lang="ts">
import P5Project from '~/components/P5Project.vue'
import PageIntro from '~/components/PageIntro.vue'
// import ExploreMoreProjectsOnDesktop from './ExploreMoreProjectsOnDesktop.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { isMobileOrTablet } from '~/helpers/deviceType'
import type { projectsType } from '~/types'
import projects from '~/helpers/projects'

const selectedProject = ref<null | projectsType>(null)

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
            <div class="basis-1/5">
                <ul class="flex flex-col gap-14 h-full py-4 overflow-scroll">
                    <li
                        v-for="(project, i) in projects"
                        class="hover:text-lg text-left font-medium"
                    >
                        <button @mouseenter="selectedProject = project">
                            {{ project.title }}
                        </button>
                    </li>
                </ul>
            </div>
            <div class="grow h-full content-center">
                <div class="h-[80svh] pb-12">
                    <P5Project
                        v-if="selectedProject !== null"
                        class="rounded-lg"
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
