<script setup lang="ts"></script>

<template>
    <div class="relative bottom-0 flex w-full flex-col items-center gap-2 bg-col-light pb-4 pt-2">
        <div class="text-sm font-bold text-col-dark sm:text-base">Tools Used</div>

        <div class="flex w-full flex-row justify-center gap-[12svw] sm:gap-20 md:gap-24">
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
