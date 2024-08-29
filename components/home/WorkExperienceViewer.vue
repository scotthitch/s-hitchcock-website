<script setup lang="ts">
import type { WorkExperience } from '~/types';

const workExperiences: WorkExperience[] = [
    {
        company: 'trimble',
        imgSrc: '/companyLogos/trimble.png',
        dateRange: '2022-2023',
        href: 'https://www.trimble.com/en',
        brief: 'This was a good job',
        skills: ['vue.js', 'nuxt.js', 'postgres', 'leadership']
    },
    {
        company: 'bluelab',
        imgSrc: '/companyLogos/bluelab.png',
        dateRange: '2021-2022',
        href: 'https://bluelab.com/',
        brief: 'This was a good job',
        skills: ['vue.js', 'nuxt.js', 'postgres', 'leadership']
    },
    {
        company: 'axys',
        imgSrc: '/companyLogos/axys.webp',
        dateRange: '2021',
        href: 'https://axys.systems/nala/',
        brief: 'This was a good job',
        skills: ['vue.js', 'nuxt.js', 'postgres', 'leadership']
    }
];
</script>

<template>
    <div class="my-24 pb-96">
        <div
            class="container mx-auto text-4xl font-semibold text-col-bg md:text-5xl xl:text-center"
        >
            <div>Work Experience.</div>
        </div>
        <div
            class="mt-8 flex w-full flex-row gap-6 overflow-x-scroll px-12 pb-16 md:mt-12 xl:gap-16"
        >
            <HomeWorkExperienceCard
                v-for="workExperience in workExperiences"
                v-bind="workExperience"
                class="first:ml-auto last:mr-auto"
            />
        </div>
    </div>
</template>

<style></style>
