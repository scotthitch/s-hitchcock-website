<script setup lang="ts">
import PageIntro from '~/components/PageIntro.vue'
import ContactMeForm from '~/components/contact/ContactMeForm.vue'
import WavesCanvas from '~/components/contact/WavesCanvas.vue'
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
    <div>
        <div class="bg-white overflow-scroll">
            <PageIntro pageName="Contact Me" />
            <div class="static container lg:max-w-[1000px] m-auto sm:px-12">
                <div
                    class="flex flex-col-reverse md:flex-row border-2 border-neutral-300 border-spacing-8 xs:my-2 sm:my-14 md:my-16 outline outline-2 outline-col-dark -outline-offset-[16px] sm:-outline-offset-[20px]"
                >
                    <ContactMeForm class="basis-full md:basis-1/2" />
                    <div class="md:block md:basis-1/2 w-full h-[120px] md:h-auto">
                        <WavesCanvas :key="p5CanvasKey" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
