<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isNavBarExpanded = ref(false);

const navBarRoutes = [
    {
        to: "/",
        id: "home",
        title: 'Home'
    },
    {
        to: "/projects",
        id: "projects",
        title: "Projects"
    },
    {
        to: "/resume",
        id: "resume",
        title: "Resume"
    }
]

const elementIsNavRoute = (id: string): boolean => {
    for (const route of navBarRoutes) {
        if (route.id === id) {
            return true; // Word found
        }
    }
    return false; // Word not found
}

const handlePageClick = (event: MouseEvent) => {
    const navBarElement = document.getElementById('navbar');
    const clickedElement = event.target as HTMLElement

    if (elementIsNavRoute(clickedElement.id)) {
        isNavBarExpanded.value = false;
        return
    }

    // Null element
    if (navBarElement === null || clickedElement === null) {
        return;
    }
    
    // If the click isn't on the element
    if (!navBarElement.contains(clickedElement) && clickedElement !== navBarElement) {
        isNavBarExpanded.value = false;
        return;
    }

    // If the navbar is already expanded then just close it
    if (isNavBarExpanded.value === true) {
        return;
    }
    
    // Click was on navbar
    isNavBarExpanded.value = true;
    return
}


onMounted(() => {
    window.addEventListener('click', e => handlePageClick(e))
})

onUnmounted(() => {
    window.removeEventListener('click', e => handlePageClick(e))
})

</script>

<template>
    <div class="fixed z-30 top-0 bottom-0 left-0 flex items-center" id="navbar">
        <a :href="isNavBarExpanded ? undefined : '#'">
            <div
                class="rounded-r-2xl flex flex-col justify-center items-center nav-bar-background"
                :class="isNavBarExpanded ? 
                        'h-screen w-[40vw] sm:w-[25vw] lg:w-[20vw]':
                        'h-24 w-12'"
                style="background-color: rgba(0, 0, 0, 0.55);">
                <Transition name="arrow">
                    <img v-if="!isNavBarExpanded"
                        src="../assets/arrow.svg"
                        alt="arrow-icon"
                        class="absolute"
                    />
                </Transition>
                <Transition name="arrow">
                    <div v-if="isNavBarExpanded" class="flex flex-col gap-12 w-full px-8 place-items-end h-screen">
                        <div class="absolute py-6">
                            <p class="text-white text-xs sm:text-xl font-bold">
                                Scott Hitchcock
                            </p> 
                        </div>          
                        <div class="basis-1/3"></div>
                        <div v-for="(navBarRoute, index) in navBarRoutes" v-bind:key="index" class="text-white text-3xl font-semibold">
                            <router-link
                                :to="navBarRoute.to"
                                :id="navBarRoute.id"
                            >{{ navBarRoute.title }}</router-link>
                        </div>
                        <div class="basis-1/3"></div>
                    </div>
                </Transition>
            </div>
        </a>
    </div>
  </template>

  
<style>
.nav-bar-background {
transition: 0.45s ease-in-out;
}

.arrow-enter-active,
.arrow-leave-active {
  transition: 0.45s ease;
}

.arrow-enter-from,
.arrow-leave-to {
  opacity: 0;
  transform: scale(0);
  /* transform: rotate(180); */

}

</style>