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
    <nav class="basis-12 z-30 items-center bg-col-primary -mb-[0.5px]" id="navbar">
        <div class="flex flex-row w-full gap-6 py-5 items-center">
            <div class="italic text-col-secondary text-2xl xs:text-3xl font-bold pl-6">
                <div class="hidden sm:block pr-10">Scott Hitchcock</div>
                <div class="block sm:hidden pr-6">S.H</div>
            </div>
            <div v-for="(navBarRoute, index) in navBarRoutes" v-bind:key="index">
                <div
                    class="text-col-secondary hover:scale-110 text-lg xs:text-xl navbarRoute font-semibold"
                >
                    <router-link :to="navBarRoute.to" :id="navBarRoute.id">{{
                        navBarRoute.title
                    }}</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
.navbarRoute {
    transition: 0.15s ease-in-out;
}

.nav-bar-background {
    transition: 0.55s ease-in-out;
}

.arrow-enter-active,
.arrow-leave-active {
    transition: 0.45s ease;
}

.arrow-enter-from,
.arrow-leave-to {
    opacity: 0;
    transform: scale(0);
}

.router-link-exact-active {
    text-decoration: underline;
}
</style>
