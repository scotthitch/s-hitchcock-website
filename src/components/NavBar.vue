<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 sm:bottom-0 sm:top-0 sm:w-[28%] flex flex-row sm:flex-col items-center sm:items-end justify-center bg-white z-10">

        <div class="hidden sm:block text-4xl font-bold text-end">
          <p>Scott</p>
          <p>Hitchcock</p>
        </div>

        <router-link to="/" class="basis-1/3 sm:basis-0 text-center">Home</router-link>
        <router-link to="/projects" class="basis-1/3 sm:basis-0 text-center">Projects</router-link>
        <router-link to="/resume" class="basis-1/3 sm:basis-0 text-center">Resume</router-link>

  </div>


</template>

<style scoped>  
</style>
