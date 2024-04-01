<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDeviceTypeStore } from '../stores/deviceType'
const isNavBarExpanded = ref(false)

const store = useDeviceTypeStore()

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

const elementIsNavigationRoute = (id: string): boolean => {
    for (const route of navBarRoutes) {
        if (route.id === id) {
            return true // id is from a nav element
        }
    }
    return false // id isn't from a nav element
}

const handlePageClick = (event: MouseEvent | TouchEvent) => {
    const navBarElement = document.getElementById('navbarBackground')
    const clickedElement = event.target as HTMLElement

    // If the clicked element is a navigation route, then make sure navbar is closed
    if (elementIsNavigationRoute(clickedElement.id)) {
        isNavBarExpanded.value = false
        return
    }

    // Null element
    if (navBarElement === null || clickedElement === null) {
        return
    }

    // If the click isn't on the navbar then close the navbar
    if (!navBarElement.contains(clickedElement) && clickedElement !== navBarElement) {
        isNavBarExpanded.value = false
        return
    }

    // If the click is on the navbar then set it
    isNavBarExpanded.value = true
    return
}

onMounted(() => {
    window.addEventListener(store.interactionEvent, (e) => handlePageClick(e))
})

onUnmounted(() => {
    window.removeEventListener(store.interactionEvent, (e) => handlePageClick(e))
})
</script>

<template>
    <div class="fixed z-30 top-0 bottom-0 left-0 flex items-center" id="navbarRegion">
        <a :href="isNavBarExpanded ? undefined : '#'">
            <div
                id="navbarBackground"
                class="flex flex-col justify-center items-center nav-bar-background"
                :class="
                    isNavBarExpanded
                        ? 'h-[100svh] w-[40svw] sm:w-[30svw] md:w-[25svw] lg:w-[20svw] xl:w-[15svw] rounded-r-[1.8rem]'
                        : 'h-24 w-12 rounded-r-2xl'
                "
                style="background-color: rgba(0, 0, 0, 0.55)"
            >
                <Transition name="arrow" mode="out-in">
                    <img
                        v-if="!isNavBarExpanded"
                        src="../assets/arrow.svg"
                        alt="arrow-icon"
                        class="absolute"
                    />
                </Transition>
                <Transition name="arrow">
                    <div
                        v-if="isNavBarExpanded"
                        class="flex flex-col gap-14 sm:gap-16 pr-6 w-full place-items-end h-[100svh]"
                    >
                        <div class="basis-1/3"></div>
                        <div
                            v-for="(navBarRoute, index) in navBarRoutes"
                            v-bind:key="index"
                            class="text-white italic hover:scale-110 opacity-100 text-2xl xs:text-3xl sm:text-4xl navbarRoute font-bold"
                        >
                            <div class="flex flex-row gap-2 items-center">
                                <router-link :to="navBarRoute.to" :id="navBarRoute.id">{{
                                    navBarRoute.title
                                }}</router-link>
                            </div>
                        </div>
                        <div class="basis-1/3"></div>
                    </div>
                </Transition>
            </div>
        </a>
    </div>
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
