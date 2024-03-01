<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/Navbar.vue'
</script>

<template>
  <NavBar />

  <!-- <div class="fixed hidden sm:block left-[31%] w-0.5 bg-black" style="top: 3%; bottom: 3%;"></div> -->

  <!-- <div class="absolute sm:left-[31%] w-screen sm:w-[69%] sm:max-w-[40rem] px-3 sm:px-4"> -->
    <RouterView />
  <!-- </div> -->
</template>

<style scoped>

/* @import url(
  'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap'); 

html * {
   font-family: 'Passion One' !important;
} */

</style>
