<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'

import ExploreMoreProjectsOnDesktop from './ExploreMoreProjectsOnDesktop.vue'
import ProjectsIntro from './ProjectsIntro.vue'
import { ref, onMounted, onUnmounted, shallowRef, computed } from 'vue'
import type { P5ProjectState } from '../../types'
import { useDeviceTypeStore } from '../../stores/deviceType'
import projects2 from './projects'

const store = useDeviceTypeStore()

const p5ProjectKey = ref(0)

// const projects = shallowRef([
//     { component: ProjectsIntro, isMobileOrTabletFriendly: true }
//     // { component: WaterfallProject, isMobileOrTabletFriendly: true },
//     // { component: FourierSeriesProject, isMobileOrTabletFriendly: true },
//     // { component: PerlinFlowFieldProject, isMobileOrTabletFriendly: true },
//     // { component: GrowingCircleProject, isMobileOrTabletFriendly: true },
//     // { component: FireworksProject, isMobileOrTabletFriendly: true },
//     // { component: UnknownPleasuresProject, isMobileOrTabletFriendly: false },
//     // { component: RadialProject, isMobileOrTabletFriendly: false },
//     // { component: TilingProject, isMobileOrTabletFriendly: true }
//     // { component: BallCascadeProject, isMobileOrTabletFriendly: true }
// ])

const projectsToRender = () => {
    if (store.isMobileOrTablet) {
        return projects2.filter((project) => project.isMobileOrTabletFriendly)
        // .concat([
        //     {
        //         component: ExploreMoreProjectsOnDesktop,
        //         isMobileOrTabletFriendly: true
        //     }
        // ])
    }

    return projects2
}

const projectStates = ref<P5ProjectState[]>(Array(projects2.length).fill('invisible'))

const setProjectVisibilityStates = () => {
    const navbar = document.getElementById(`navbar`)
    const navbarBoundingRect = navbar?.getBoundingClientRect() || new DOMRect()

    let wasPreviousProjectVisible = false
    projects2.forEach((project, i) => {
        const el = document.getElementById(`project-${i}`)

        if (el === null) {
            return
        }

        const projectBoundingRect = el.getBoundingClientRect()

        if (
            projectBoundingRect.top < window.innerHeight - 5 &&
            projectBoundingRect.bottom > navbarBoundingRect.height
        ) {
            //TODO need 10?
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
        <ProjectsIntro />
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

        <!-- <component
            v-for="(project, i) in projectsToRender"
            :is="project.component"
            :key="`${i}-${p5ProjectKey}`"
            :id="`project-${i}`"
            :state="projectStates[i]"
        >
        </component> -->
    </div>
</template>
