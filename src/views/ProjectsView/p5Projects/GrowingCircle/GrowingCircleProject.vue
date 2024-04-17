<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import script from "./script"
</script>


<!-- TODO: fix scriptID issue -->
<template>
    <P5Project
      title="Growing Circle"
      scriptID="growing-circle"
      description="Just sit back and relax"
      :scriptWrapper="script"
      state="invisible"
    />
</template>
