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
        location: 'Christchurch',
        role: 'Software Development Intern'
    },
    {
        company: 'bluelab',
        imgSrc: '/companyLogos/bluelab.png',
        dateRange: '2021-2022',
        href: 'https://bluelab.com/',
        brief: 'I built a web app for Bluelab to give insights into production performance. I worked with stakeholders, designed and prototyped the system, documented everything, and delivered a final product.',
        skills: [
            'TypeScript',
            'Python',
            'React',
            'FASTApi',
            'PostgreSQL',
            'AWS',
            'Asana',
            'Confluence'
        ],
        location: 'Tauranga',

        role: 'Production Insight Intern'
    },
    {
        company: 'axys',
        imgSrc: '/companyLogos/axys.webp',
        dateRange: '2021',
        href: 'https://axys.systems/nala/',
        brief: 'During my second year at university, I helped build Nala, a hall management web app at a student startup. I built a seamless user experience and a robust backend to simplify administration for students and staff alike.',
        skills: ['TypeScript', 'Python', 'React', 'Flask', 'SQLite', 'Figma'],
        location: 'Christchurch',
        role: 'Web App Developer'
    }
];
</script>

<template>
    <div id="work_experience" class="scroll-m-header-buffer">
        <HomeSectionTitle text1="Check Out Some of My" text2="Past Work Experience" />
        <div
            class="mt-8 flex w-full flex-row gap-6 overflow-x-scroll px-5 pb-16 pt-2 md:overflow-x-auto md:px-12 xl:mt-12 xl:gap-16"
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
