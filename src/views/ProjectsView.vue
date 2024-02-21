<script setup lang="ts">
import KaleidoscopeProject from '../p5Projects/Kaleidoscope/KaleidoscopeProject.vue';
import BallCascadeProject from '../p5Projects/BallCascade/BallCascadeProject.vue';
import JoyDivisionLinesProject from '../p5Projects/JoyDivisionLines/JoyDivisionLinesProject.vue';
import { ref, shallowRef } from 'vue'


const projectSelectIndex = ref(0)
const projects = shallowRef([JoyDivisionLinesProject, KaleidoscopeProject, BallCascadeProject]);
// const projects = shallowRef([BallCascadeProject]);

const incrementProjectSelect = () => {
  projectSelectIndex.value = Math.min(projectSelectIndex.value+1, projects.value.length-1);
}

const decrementProjectSelect = () => {
  projectSelectIndex.value = Math.max(projectSelectIndex.value-1, 0);
}

</script>


<template>
  <div>
    <div class="flex flex-col items-center text-center justify-center h-screen">
      <button class="fixed top-5" :disabled="projectSelectIndex === 0" @click="decrementProjectSelect()">Previous</button>  
      <component :is="projects[projectSelectIndex]"></component>     
      <button class="fixed bottom-5" :disabled="projectSelectIndex === projects.length-1" @click="incrementProjectSelect()">Next</button>     
    </div>
  </div>
</template>
