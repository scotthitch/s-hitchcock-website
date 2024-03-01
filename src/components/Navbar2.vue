<script setup lang="ts">
import { ref } from 'vue'
const showNavbar = ref(false);



const expandNavbar = () => {
    console.log('on')
    showNavbar.value = true;
}

const collapseNavbar = () => {
    console.log('off')
    showNavbar.value = false;
}
</script>

<template>
    <!-- Square -->
<div class="fixed z-30 top-0 bottom-0 left-0 flex items-center">
    <div
        class="group w-12 h-20 hover:w-[15vw] hover:h-screen transition-all ease-in-out duration-[450ms] rounded-r-2xl flex flex-col justify-center items-center"
        @mouseover="expandNavbar"
        @mouseleave="collapseNavbar"
        style="background-color: rgba(0, 0, 0, 0.4);"
        >
        <img  src="../assets/arrow.svg" alt="arrow-icon" class="absolute opacity:100 group-hover:opacity-0 scale-100 group-hover:scale-0 transition-all ease-in-out duration-[450ms]"/>
        <div class="opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 flex flex-col justify-center gap-12 text-white font-semibold h-full text-xl transition-all ease-in-out duration-[450ms] w-full pr-4">
            <div class="flex justify-end">
                <router-link to="/">Home</router-link>
            </div>
            <div class="flex justify-end">
                <router-link to="/projects">Projects</router-link>
            </div>
            <div class="flex justify-end">
                <router-link to="/resume" class="">Resume</router-link>
            </div>

        </div>
    </div>

    <!-- <div
        class="z-20 w-20 hover:w-[25%] h-20 hover:h-screen bg-black fixed left-0 top-1/2 hover:top-0 transition-all ease-in-out duration-300"
        @mouseover="expandNavbar"
        @mouseleave="collapseNavbar"
    >


    </div> -->
</div>
</template>
  
  <!-- opacity-0 group-hover:opacity-100 -->
<style>
</style>
  