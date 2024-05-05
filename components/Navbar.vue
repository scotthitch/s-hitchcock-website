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
        to: '/resume',
        id: 'resume',
        title: 'Resume'
    },
    {
        to: '/contact',
        id: 'contact',
        title: 'Contact'
    }
]
</script>

<template>
    <!-- Add some negative margin on the bottom to ensure navbar overlaps whatevever's visible below -->
    <header
        class="fixed h-[var(--header-height)] z-30 items-center bg-col-dark flex flex-row justify-between w-full px-6 sm:px-10"
        id="header"
    >
        <div class="italic text-col-light text-xl xs:text-2xl font-semibold" id="navbarTitle">
            <router-link to="/" class="py-2">
                <div class="hidden sm:block">Scott Hitchcock</div>
                <div class="block sm:hidden">S.H</div>
            </router-link>
        </div>

        <div class="flex flex-row gap-3 xs:gap-4 md:gap-6">
            <div
                class="text-col-mid hover:text-col-light text-sm xs:text-base navbarRoute font-semibold"
                v-for="(navBarRoute, index) in navBarRoutes"
                v-bind:key="index"
            >
                <NuxtLink
                    class="sm:p-2"
                    :to="navBarRoute.to"
                    :id="navBarRoute.id"
                    exact-active-class="text-col-light"
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
