<script setup lang="ts">
import type { WorkExperience } from '~/types';

const workExperiences: WorkExperience[] = [
    {
        company: 'trimble',
        imgSrc: '/companyLogos/trimble.png',
        dateRange: '2022-2023',
        href: 'https://www.trimble.com/en',
        brief: 'I contributed to the development and testing of Earthworks, a grade control product for earthmoving machinery. This enhanced my Scrum and teamwork skills while working with various development tools.',
        skills: [
            'C++',
            'TypeScript',
            'Visual Studio',
            'VS Code',
            'Android Studio',
            'Scrum',
            'JIRA'
        ],
        location: 'Christchurch'
    },
    {
        company: 'bluelab',
        imgSrc: '/companyLogos/bluelab.png',
        dateRange: '2021-2022',
        href: 'https://bluelab.com/',
        brief: 'I built a web app for Bluelab to give insights into production performance. I worked with stakeholders, designed and prototyped the system, documented everything, and delivered a final product.',
        skills: ['React', 'PostgreSQL', 'FASTApi', 'AWS', 'Asana', 'Confluence'],
        location: 'Tauranga'
    },
    {
        company: 'axys',
        imgSrc: '/companyLogos/axys.webp',
        dateRange: '2021',
        href: 'https://axys.systems/nala/',
        brief: 'In a student startup I helped build a hall management app in my second year. The app linked students to notifications and forms and made administration easier for staff. This was to create a seamless user experience and robust backend.',
        skills: ['React', 'Flask', 'SQLite', 'Figma'],
        location: 'Christchurch'
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
            class="mt-8 flex w-full flex-row gap-6 overflow-x-scroll px-5 pb-16 pt-2 md:px-12 xl:mt-12 xl:gap-16"
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
