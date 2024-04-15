<script setup lang="ts">
import HomeFooterIcon from './HomeFooterIcon.vue'
</script>

<template>
    <div class="relative flex flex-col gap-2 items-center bottom-0 w-full pb-4 pt-2 bg-col-light">
        <div class="text-sm sm:text-base font-bold text-col-dark">Tools Used</div>

        <div class="w-full flex flex-row gap-[12svw] sm:gap-20 md:gap-24 justify-center">
            <HomeFooterIcon
                file-name="vuejs.png"
                icon-name="Vue.js"
                icon-alt="vuejs"
                external-link="https://vuejs.org/"
            />
            <HomeFooterIcon
                file-name="tailwindcss.png"
                icon-name="Tailwind CSS"
                icon-alt="tailwind-css"
                external-link="https://tailwindcss.com/"
            />
            <HomeFooterIcon
                file-name="p5js.png"
                icon-name="p5.js"
                icon-alt="p5js"
                external-link="https://p5js.org/"
            />
            <!-- <HomeFooterIcon
                file-name="github.png"
                icon-name="GitHub"
                icon-alt="github"
                external-link="https://github.com/scotthitch/s-hitchcock-website/"
            /> -->
            <HomeFooterIcon
                file-name="aws.png"
                icon-name="AWS"
                icon-alt="aws"
                external-link="https://aws.amazon.com/"
            />
        </div>
    </div>
</template>

<style></style>
