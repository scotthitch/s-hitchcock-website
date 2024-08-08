<script setup lang="ts">
const props = defineProps<{ content: string }>();
</script>

<template>
    <div class="text-base font-bold xs:text-base md:text-lg lg:text-xl">{{ props.content }}</div>
</template>
