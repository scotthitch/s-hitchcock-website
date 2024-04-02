<script setup lang="ts">
import HomeFooter from '../components/HomeFooter.vue'
</script>

<template>
    <div class="flex h-[94svh] sm:h-[92svh] bg-cv-blue">
        <div class="m-auto grid grid-cols-3 p-3">
            <div class="text-white text-6xl sm:text-8xl font-bold italic slide-from-left-60 col-span-2">
                Scott
            </div>

            <div
                class="flex flex-col-reverse text-sm sm:text-2xl text-neutral-300 italic font-semibold slide-from-right-40 text-end"
            >
                <div>Engineer</div>
                <div>Mechatronics</div>
            </div>

            <div class="text-white text-6xl sm:text-8xl font-bold italic slide-from-left-80 col-span-3">
                Hitchcock
            </div>
        </div>
    </div>
    <HomeFooter />
</template>

<style></style>
