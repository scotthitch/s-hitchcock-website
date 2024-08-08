<script setup lang="ts">
const props = defineProps<{ content: string }>();
</script>

<template>
    <div class="text-xs font-medium italic sm:text-sm lg:text-base">
        {{ props.content }}
    </div>
</template>

<!-- text-base xs:text-lg sm:text-xl -->
