<script setup lang="ts">
import P5Project from '~/components/P5Project.vue'
import PageIntro from '~/components/PageIntro.vue'
// import ExploreMoreProjectsOnDesktop from './ExploreMoreProjectsOnDesktop.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import type { P5ProjectState } from '~/types'
import { isMobileOrTablet } from '~/helpers/deviceType'

import projects from '~/helpers/projects'

const p5ProjectKey = ref(0)

const projectsToRender = () => {
    if (isMobileOrTablet) {
        return projects.filter((project) => project.isMobileOrTabletFriendly)
    }

    return projects
}

const projectStates = ref<P5ProjectState[]>(Array(projects.length).fill('invisible'))

const setProjectVisibilityStates = () => {
    const navbar = document.getElementById(`navbar`)
    const navbarBoundingRect = navbar?.getBoundingClientRect() || new DOMRect()

    let wasPreviousProjectVisible = false
    projects.forEach((project, i) => {
        const el = document.getElementById(`project-${i}`)

        if (el === null) {
            return
        }

        const projectBoundingRect = el.getBoundingClientRect()

        if (
            projectBoundingRect.top < window.innerHeight - 10 && // 10px for a buffer
            projectBoundingRect.bottom > navbarBoundingRect.height
        ) {
            projectStates.value[i] = 'visible'
            wasPreviousProjectVisible = true

            if (projectStates.value[i - 1] === 'invisible') {
                projectStates.value[i - 1] = 'neighbour'
            }
        } else if (wasPreviousProjectVisible) {
            projectStates.value[i] = 'neighbour'
            wasPreviousProjectVisible = false
        } else {
            projectStates.value[i] = 'invisible'
        }
    })
}

const preventDefaultForScrollKeys = (event: KeyboardEvent) => {
    const keysToPrevent = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] // Arrow keys
    if (keysToPrevent.includes(event.code)) {
        event.preventDefault()
    }
}

const handleResize = () => {
    p5ProjectKey.value++ // Update key to force re render of each P5 project component
}

onMounted(() => {
    setProjectVisibilityStates()
    window.addEventListener('resize', handleResize)

    window.addEventListener('keydown', (e) => {
        preventDefaultForScrollKeys(e)
    })

    document.getElementById('projects-view')?.addEventListener('scroll', setProjectVisibilityStates)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)

    window.removeEventListener('keydown', (e) => {
        preventDefaultForScrollKeys(e)
    })
    document
        .getElementById('projects-view')
        ?.removeEventListener('scroll', setProjectVisibilityStates)
})
</script>

<template>
    <div id="projects-view" class="snap-y snap-mandatory h-full overflow-scroll overflow-x-hidden">
        <PageIntro pageName="Projects" />
        <P5Project
            v-for="(project, i) in projectsToRender()"
            :key="`${i}-${p5ProjectKey}`"
            :title="project.title"
            :scriptID="project.scriptID"
            :id="`project-${i}`"
            :description="project.description"
            :scriptWrapper="project.scriptWrapper"
            :state="projectStates[i]"
        />
        <!-- <ExploreMoreProjectsOnDesktop v-if="deviceTypeStore.isMobileOrTablet" /> -->
    </div>
</template>
