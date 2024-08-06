<script setup lang="ts">
const props = defineProps<{
    label: string
    type: 'button' | 'reset' | 'submit'
    formId: string
}>()
</script>

<template>
    <button
        class="w-full rounded-[6px] border-[1.5px] border-col-dark text-sm font-semibold py-2 hover:scale-105 buttonGrow"
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
