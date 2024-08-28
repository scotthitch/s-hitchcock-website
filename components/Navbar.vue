<script setup lang="ts">
const navBarRoutes = [
    {
        to: '/',
        id: 'home',
        title: 'Home'
    },
    {
        to: '/projects',
        id: 'projects',
        title: 'Projects'
    },
    {
        to: '/contact',
        id: 'contact',
        title: 'Contact'
    }
];
</script>

<template>
    <!-- Add some negative margin on the bottom to ensure navbar overlaps whatevever's visible below -->
    <header
        class="fixed z-30 flex h-header w-full flex-row items-center justify-between border-col-mid bg-col-content bg-opacity-70 px-6 backdrop-blur-lg sm:px-10"
        id="navbar"
    >
        <div class="text-xl font-semibold italic text-col-bg xs:text-2xl" id="navbarTitle">
            <router-link to="/" class="flex flex-row items-center gap-8 py-2">
                <ShnzSVG />
                <div class="hidden md:block">Scott Hitchcock</div>
            </router-link>
        </div>

        <div class="flex flex-row gap-6 xs:gap-6 md:gap-6">
            <div
                class="navbarRoute text-base font-semibold text-col-mid hover:text-col-bg xs:text-lg"
                v-for="(navBarRoute, index) in navBarRoutes"
                v-bind:key="index"
            >
                <NuxtLink
                    class="sm:p-2"
                    :to="navBarRoute.to"
                    :id="navBarRoute.id"
                    exact-active-class="text-col-bg"
                    >{{ navBarRoute.title }}</NuxtLink
                >
            </div>
        </div>
    </header>
</template>

<style>
.navbarRoute {
    transition: 0.25s ease-in-out;
}
</style>
