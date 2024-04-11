<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <div class="flex flex-col h-[100svh]">
        <NavBar />
        <RouterView />
    </div>
</template>

<style scoped>
html * {
    font-family: 'Inter' !important;
}
</style>
