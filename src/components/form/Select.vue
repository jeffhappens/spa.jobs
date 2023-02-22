<script setup>

import { onMounted, ref } from 'vue'

defineProps(['modelValue']);

defineEmits(['update:modelValue']);

const input = ref(null);

// onMounted(() => {
//     if (input.value.hasAttribute('autofocus')) {
//         input.value.focus();
//     }
// });

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <select
        class="text-gray-700 w-full p-2 shadow-sm bg-gray-50 border border-gray-300"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="select">

        <slot />


    </select>
</template>
