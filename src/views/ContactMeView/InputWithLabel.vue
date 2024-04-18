<script setup lang="ts">
const props = defineProps<{
    label: string
    placeholder: string
    type: 'text' | 'email'
    id: string
}>()
</script>

<template>
    <div>
        <label :for="props.id" class="font-semibold text-col-dark">{{ props.label }}</label>
        <input
            type="props.type"
            :id="props.id"
            class="border-b-[1.5px] rounded-none py-1 placeholder:font-semibold border-col-mid text-col-dark placeholder:text-neutral-300 text-md focus:outline-none block w-full"
            :placeholder="props.placeholder"
            required
        />
    </div>
</template>
