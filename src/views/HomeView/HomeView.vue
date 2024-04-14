<script setup lang="ts">
import HomeFooter from './HomeFooter.vue'
</script>

<template>
    <div class="h-full overflow-scroll">
        <div class="flex h-[80svh] sm:h-[80svh] bg-col-primary">
            <div class="m-auto grid grid-cols-3 p-3">
                <div
                    class="text-col-light text-6xl sm:text-8xl font-bold italic slide-from-left-60 col-span-2"
                >
                    Scott
                </div>

                <div
                    class="flex flex-col-reverse text-sm sm:text-2xl text-col-mid italic font-semibold slide-from-right-40 text-end"
                >
                    <div>Engineer</div>
                    <div>Mechatronics</div>
                </div>

                <div
                    class="text-col-light text-6xl sm:text-8xl font-bold italic slide-from-left-80 col-span-3"
                >
                    Hitchcock
                </div>
            </div>
        </div>
        <HomeFooter />
    </div>
</template>

<style></style>
