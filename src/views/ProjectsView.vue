<script setup lang="ts">
import KaleidoscopeProject from '../p5Projects/Kaleidoscope/KaleidoscopeProject.vue';
import BallCascadeProject from '../p5Projects/BallCascade/BallCascadeProject.vue';
import { ref, shallowRef } from 'vue'


const projectSelectIndex = ref(0)
const projects = shallowRef([KaleidoscopeProject, BallCascadeProject]);

const incrementProjectSelect = () => {
  projectSelectIndex.value = Math.min(projectSelectIndex.value+1, projects.value.length-1);
}

const decrementProjectSelect = () => {
  projectSelectIndex.value = Math.max(projectSelectIndex.value-1, 0);
}

</script>


<template>
  <div>
    <div class="flex flex-col items-center text-center justify-center py-[5rem]">
      
      <button :disabled="projectSelectIndex === 0" @click="decrementProjectSelect()">Previous</button>
      <component :is="projects[projectSelectIndex]"></component>
      <button :disabled="projectSelectIndex === projects.length-1" @click="incrementProjectSelect()">Next</button>
      
    </div>
  </div>
</template>
