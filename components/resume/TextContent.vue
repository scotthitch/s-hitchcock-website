<script setup lang="ts">
const props = defineProps<{ content: string }>();
</script>

<template>
    <div class="text-xs font-medium sm:text-sm lg:text-base">
        {{ props.content }}
    </div>
</template>
