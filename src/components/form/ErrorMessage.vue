<script setup>
    // import { ref, defineProps } from 'vue'
    const props = defineProps(['text'])
</script>
<template>
    <div class="mt-1 mb-4 text-red-500 text-xs">
        <p class="p-1 inline-block font-semibold bg-red-50">* {{ props.text }}</p>
    </div>
</template>