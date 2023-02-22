<script setup>

    import { ref, defineProps, defineEmits } from 'vue'
    const props = defineProps(['value', 'for'])

</script>
<template>

    <label
        :for="for"
        class="block text-gray-700 font-semibold mb-1">
        {{ value }}
    </label>

</template>