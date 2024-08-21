<script setup lang="ts">
const props = defineProps<{
    label: string;
    placeholder: string;
    type: 'text' | 'email';
    id: string;
}>();
</script>

<template>
    <div>
        <label :for="props.id" class="text-col-bg dark:text-col-content font-semibold">{{
            props.label
        }}</label>
        <input
            :name="props.label"
            :type="props.type"
            :id="props.id"
            class="text-md text-col-bg bg-col-content dark:bg-col-bg block w-full rounded-none border-b-[1.5px] border-col-mid py-1 placeholder:font-semibold placeholder:text-neutral-300 focus:outline-none"
            :placeholder="props.placeholder"
            required
        />
    </div>
</template>
