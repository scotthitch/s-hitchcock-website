<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<template>
    <div class="font-bold text-base xs:text-base md:text-lg lg:text-xl">{{ props.content }}</div>
</template>
