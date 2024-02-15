<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="absolute sm:left-1/3 sm:max-w-[40rem] p-10 md:pt-24">
    <RouterView />
  </div>
</template>

<style scoped>

/* @import url(
  'https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap'); 

html * {
   font-family: 'Passion One' !important;
} */

</style>
