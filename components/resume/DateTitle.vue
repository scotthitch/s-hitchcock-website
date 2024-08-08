<script setup lang="ts">
const props = defineProps<{ content: string }>();
</script>

<template>
    <div class="text-xs text-neutral-500 sm:text-sm lg:text-base">{{ props.content }}</div>
</template>
