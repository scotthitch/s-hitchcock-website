<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="absolute md:left-1/3 md:w-[32rem]">
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
