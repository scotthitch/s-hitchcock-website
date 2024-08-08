<script setup lang="ts">
import PageIntro from '~/components/PageIntro.vue';
import ContactMeForm from '~/components/contact/ContactMeForm.vue';
import WavesCanvas from '~/components/contact/WavesCanvas.vue';

const p5CanvasKey = ref(0);

const handleResize = () => {
    p5CanvasKey.value++;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div class="container mx-auto h-full content-center pb-12 sm:px-12 lg:max-w-[1000px]">
        <div
            class="flex h-[93%] border-spacing-8 flex-col-reverse rounded-[32px] border-2 border-neutral-300 bg-col-light outline outline-2 -outline-offset-[24px] outline-col-dark md:flex-row"
        >
            <ContactMeForm class="m-4 basis-full md:m-2 md:basis-1/2" />
            <div class="h-[120px] w-full md:block md:h-auto md:basis-1/2">
                <WavesCanvas
                    :key="p5CanvasKey"
                    class="rounded-t-[30px] md:rounded-br-[30px] md:rounded-tl-[0px]"
                />
            </div>
        </div>
    </div>
</template>
