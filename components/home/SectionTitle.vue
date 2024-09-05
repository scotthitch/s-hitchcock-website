<script setup lang="ts">
const props = defineProps<{ text1: string; text2: string }>();
</script>
<template>
    <div
        class="container mx-auto text-4xl font-semibold text-col-bg md:text-5xl xl:text-center dark:text-col-mid"
    >
        <div>
            {{ props.text1 }} <span class="text-col-mid dark:text-col-bg">{{ props.text2 }}</span>
        </div>
    </div>
</template>

<style></style>
