<script setup>
    // import { ref, defineProps } from 'vue'
    const props = defineProps(['text'])
</script>
<template>
    <div class="mb-4 text-red-500">
        <p>{{ props.text }}</p>
    </div>
</template>