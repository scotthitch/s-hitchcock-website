<script setup lang="ts">
import P5Project from '@/components/P5Project.vue'
import scriptWrapper from './script'
</script>

<template>
    <P5Project
        title="Waves"
        scriptID="waves"
        description="Waves"
        :scriptWrapper="scriptWrapper"
        state="invisible"
    />
</template>
