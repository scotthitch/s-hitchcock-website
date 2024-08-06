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
    <div class="h-full container lg:max-w-[1000px] mx-auto sm:px-12 content-center pb-12">
        <div
            class="h-[93%] flex flex-col-reverse md:flex-row rounded-[32px] border-2 border-neutral-300 border-spacing-8 outline outline-2 outline-col-dark -outline-offset-[24px] bg-col-light"
        >
            <ContactMeForm class="basis-full md:basis-1/2 m-4 md:m-2" />
            <div class="md:block md:basis-1/2 w-full h-[120px] md:h-auto">
                <WavesCanvas
                    :key="p5CanvasKey"
                    class="rounded-t-[30px] md:rounded-tl-[0px] md:rounded-br-[30px]"
                />
            </div>
        </div>
    </div>
</template>
