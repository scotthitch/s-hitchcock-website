<script setup lang="ts">
import P5Project from '~/components/P5Project.vue'
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
            <div class="basis-1/5 sm:basis-1/4 px-8">
                <ul class="flex flex-col h-full pb-16 overflow-scroll px-4 sm:pl-12">
                    <li
                        v-for="(project, i) in projects"
                        class="text-base text-left font-medium py-4 my-2 button px-3"
                        :key="i"
                        :class="
                            i == selectedProjectIndex &&
                            'scale-[1.1] rounded-[20px] shadow-md transition ease-in-out bg-col-light'
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
                        class="italic font-semibold text-2xl text-col-mid relative h-full text-center content-center pb-[80px]"
                    >
                        Check out some of the things I’ve built...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
