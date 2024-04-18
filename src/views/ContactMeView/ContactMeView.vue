<script setup lang="ts">
import PageIntro from '../../components/PageIntro.vue'
import ContactMeForm from './ContactMeForm.vue'
import WavesCanvas from './WavesCanvas.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const p5CanvasKey = ref(0)

const handleResize = () => {
    p5CanvasKey.value++
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <div class="overflow-scroll">
        <PageIntro pageName="Contact Me" />
        <div class="static container lg:max-w-[1000px] m-auto px-2 sm:px-12">
            <div
                class="flex flex-row border-2 border-col-dark md:border-neutral-300 my-16 outline-2 md:outline outline-col-dark -outline-offset-[20px]"
            >
                <ContactMeForm class="basis-full md:basis-1/2" />
                <div class="hidden md:block basis-1/2 w-full">
                    <WavesCanvas :key="p5CanvasKey" />
                </div>
            </div>
        </div>
    </div>
</template>
