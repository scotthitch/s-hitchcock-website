<script setup lang="ts">
const props = defineProps<{ content: string }>()
</script>

<template>
    <div class="font-medium italic text-xs sm:text-sm lg:text-base">
        {{ props.content }}
    </div>
</template>


<!-- text-base xs:text-lg sm:text-xl -->