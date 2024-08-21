<script setup lang="ts">
const props = defineProps<{
    label: string;
    placeholder: string;
    type: 'text' | 'number' | 'email';
    id: string;
}>();
</script>

<template>
    <div>
        <label :for="props.id" class="text-col-bg font-semibold">{{ props.label }}</label>
        <textarea
            :name="props.label"
            :type="props.type"
            :id="props.id"
            class="text-md text-col-bg block max-h-24 min-h-12 w-full rounded-none border-b-[1.5px] border-col-mid bg-col-light py-1 placeholder:font-semibold placeholder:text-neutral-300 focus:outline-none"
            :placeholder="props.placeholder"
            required
        />
    </div>
</template>
