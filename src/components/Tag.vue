<script setup>
    import { defineEmits } from 'vue'
    const emit = defineEmits(['remove:skillTag'])
    function removeSkillTag($event) {
        emit('remove:skillTag', $event)
    }
</script>

<template>
    <span
        @click="removeSkillTag"
        class="bg-[color:var(--p-orange)] text-white text-xs p-1 rounded-sm">
        <slot />
    </span>
</template>