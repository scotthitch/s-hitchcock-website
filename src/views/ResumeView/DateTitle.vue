<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<template>
    <div class="text-neutral-500 text-xs sm:text-sm lg:text-base">{{ props.content }}</div>
</template>
