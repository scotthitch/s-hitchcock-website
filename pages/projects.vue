<script setup lang="ts">
import P5Project from '~/components/P5Project.vue'
import PageIntro from '~/components/PageIntro.vue'
// import ExploreMoreProjectsOnDesktop from './ExploreMoreProjectsOnDesktop.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { isMobileOrTablet } from '~/helpers/deviceType'
import type { projectsType } from '~/types'
import projects from '~/helpers/projects'

const selectedProject = ref<null | projectsType>(null)
</script>

<template>
    <div class="container mx-auto h-[100svh]">
        <div class="flex flex-row text-col-light h-[80svh]">
            <div class="basis-1/4">
                <ul>
                    <li v-for="(project, i) in projects" @click="selectedProject = projects[i]">
                        {{ project.title + i }}
                    </li>
                </ul>
            </div>
            <div class="grow h-full">
                <P5Project
                    v-if="selectedProject !== null"
                    class="rounded-lg"
                    :title="selectedProject.title"
                    :scriptID="selectedProject.scriptID"
                    :description="selectedProject.description"
                    :scriptWrapper="selectedProject.scriptWrapper"
                />
            </div>
        </div>
    </div>
</template>
