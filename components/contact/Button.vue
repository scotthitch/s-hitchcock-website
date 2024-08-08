<script setup lang="ts">
const props = defineProps<{
    label: string;
    type: 'button' | 'reset' | 'submit';
    formId: string;
}>();
</script>

<template>
    <button
        class="buttonGrow w-full rounded-[6px] border-[1.5px] border-col-dark py-2 text-sm font-semibold hover:scale-105"
        :type="props.type"
        :form="props.formId"
        :value="props.label"
    >
        {{ props.label }}
    </button>
</template>

<style>
.buttonGrow {
    transition: 0.25s ease-in-out;
}
</style>
