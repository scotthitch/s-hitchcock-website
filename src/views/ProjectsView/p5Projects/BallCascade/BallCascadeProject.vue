<script setup lang="ts">
import P5Project from "@/components/P5Project.vue";
import scriptWrapper from "."
</script>


<template>
    <P5Project
      title="Ball Cascade"
      scriptID="ball-cascade"
      description="Not much to do here. You can flip gravity by clicking"
      :scriptWrapper="scriptWrapper"
      state="invisible"
    />
</template>
