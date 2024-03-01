<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isNavBarExpanded = ref(false);



const handlePageClick = (event: MouseEvent) => {
    // If the navbar is already expanded then just close it
    if (isNavBarExpanded.value === true) {
        isNavBarExpanded.value = false;
        return;
    }
    
    const navBarElement = document.getElementById('navbar');
    const clickedElement = event.target as HTMLElement
    
    // Null element
    if (navBarElement === null || clickedElement === null) {
        return;
    }

    // If the click isn't on the element
    if (!navBarElement.contains(clickedElement) && clickedElement !== navBarElement) {
        isNavBarExpanded.value = false;
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
      <button
        class="rounded-r-2xl flex flex-col justify-center items-center nav-bar-background"
        :class="isNavBarExpanded ? 
                'h-screen w-[40vw] sm:w-[25vw] lg:w-[20vw]':
                'h-24 w-12'"
        style="background-color: rgba(0, 0, 0, 0.55);"
        >
            <Transition name="arrow">
                <img v-if="!isNavBarExpanded"
                    src="../assets/arrow.svg"
                    alt="arrow-icon"
                    class="absolute"
                />
            </Transition>
            <Transition name="arrow">
                <div v-if="isNavBarExpanded" class="flex flex-col gap-12 w-full px-8 place-items-end h-screen">
                    <div class="basis-1/3 py-8">
                        <p class="text-white text-xs sm:text-xl font-bold">
                            Scott Hitchcock
                        </p>           
                    </div>
                    <div class="text-white text-3xl font-semibold">
                        <router-link to="/">Home</router-link>
                    </div>
                    <div class="text-white text-3xl font-semibold">
                        <router-link to="/projects">Projects</router-link>
                    </div>
                    <div class="text-white text-3xl font-semibold">
                        <router-link to="/resume">Resume</router-link>
                    </div>
                    <div class="basis-1/3"></div>
                </div>
            </Transition>
            
        </button>
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