<script setup>
    import { ref, defineProps } from 'vue'
    defineProps(['modelValue']);
    defineEmits(['update:modelValue']);
</script>

<template>
    <input
        class="block w-full p-1 text-gray-700 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none"
        id="file_input"
        type="file"
        @input="$emit('update:modelValue', $event.target.value)" />
</template>