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
    }
]
</script>

<template>
    <!-- Add some negative margin on the bottom to ensure navbar overlaps whatevever's visible below -->
    <nav
        class="basis-12 z-30 items-center bg-col-dark -mb-[0.5px] flex flex-row w-full gap-6 py-6"
        id="navbar"
    >
        <div class="italic text-col-light text-xl xs:text-2xl font-semibold pl-6" id="navbarTitle">
            <router-link to="/">
                <div class="hidden sm:block mr-10">Scott Hitchcock</div>
                <div class="block sm:hidden mr-6">S.H</div>
            </router-link>
        </div>
        <div v-for="(navBarRoute, index) in navBarRoutes" v-bind:key="index">
            <div
                class="text-col-mid hover:text-col-light text-sm xs:text-base navbarRoute font-semibold"
            >
                <router-link
                    :to="navBarRoute.to"
                    :id="navBarRoute.id"
                    exact-active-class="text-col-light"
                    >{{ navBarRoute.title }}</router-link
                >
            </div>
        </div>
    </nav>
</template>

<style>
.navbarRoute {
    transition: 0.25s ease-in-out;
}
</style>
