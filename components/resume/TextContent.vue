<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<template>
    <div class="font-medium text-xs sm:text-sm lg:text-base">
        {{ props.content }}
    </div>
</template>
