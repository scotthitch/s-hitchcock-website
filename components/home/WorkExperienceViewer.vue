<script setup lang="ts">
import type { workExperience } from '~/types';

const workExperiences: workExperience[] = [
    {
        company: 'trimble',
        imgSrc: '/companyLogos/trimble.png',
        dateRange: '2022-2023',
        href: 'https://www.trimble.com/en'
    },
    {
        company: 'bluelab',
        imgSrc: '/companyLogos/bluelab.png',
        dateRange: '2021-2022',
        href: 'https://bluelab.com/'
    },
    {
        company: 'axys',
        imgSrc: '/companyLogos/axys.webp',
        dateRange: '2021',
        href: 'https://axys.systems/nala/'
    }
    // {
    //     company: 'trimble',
    //     imgSrc: '/companyLogos/trimble.png',
    //     dateRange: '2022-2023',
    //     href: 'https://www.trimble.com/en'
    // },
    // {
    //     company: 'bluelab',
    //     imgSrc: '/companyLogos/bluelab.png',
    //     dateRange: '2021-2022',
    //     href: 'https://bluelab.com/'
    // },
    // {
    //     company: 'axys',
    //     imgSrc: '/companyLogos/axys.webp',
    //     dateRange: '2021',
    //     href: 'https://axys.systems/nala/'
    // }
];
</script>

<template>
    <div>Work Experience</div>
    <div class="flex h-[500px] w-full flex-row gap-6 overflow-x-auto px-12 py-16">
        <HomeWorkExperienceCard
            v-for="workExperience in workExperiences"
            v-bind="workExperience"
            class="first:ml-auto last:mr-auto"
        />
    </div>
</template>

<style></style>
