<script setup lang="ts">

</script>

<template>
    <!-- Square -->
<div class="fixed z-30 top-0 bottom-0 left-0 flex items-center">
    <div
        class="group w-12 h-20 hover:w-[40vw] hover:sm:w-[25vw] hover:lg:w-[20vw] hover:h-screen transition-all ease-in-out duration-[450ms] rounded-r-2xl flex flex-col justify-center items-center"
        style="background-color: rgba(0, 0, 0, 0.4);"
        >
        <img src="../assets/arrow.svg" alt="arrow-icon" class="absolute opacity:100 group-hover:opacity-0 scale-100 group-hover:scale-0 transition-all ease-in-out duration-[450ms]"/>
        <div class="opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 flex flex-col justify-center gap-12  h-full transition-all ease-in-out duration-[450ms] w-full pr-4">
            <div class="absolute top-0 pt-6 w-full px-4">
                <p class="flex justify-end text-white text-xl font-bold">
                    Scott Hitchcock
                </p>           
            </div>
            <div class="flex justify-end text-white text-3xl font-semibold">
                <router-link to="/">Home</router-link>
            </div>
            <div class="flex justify-end text-white text-3xl font-semibold">
                <router-link to="/projects">Projects</router-link>
            </div>
            <div class="flex justify-end text-white text-3xl font-semibold">
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
  