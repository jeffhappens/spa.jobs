<script setup>

import { onMounted, ref } from 'vue'

defineProps(['modelValue', 'icon']);

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div class="text-gray-700 w-full p-2 mb-1 shadow-sm bg-gray-50 border border-gray-300 flex items-center">
        <div v-if="icon" class="mr-2">
            <font-awesome-icon :icon="`fa-solid fa-${icon}`" class="text-xl" />
        </div>
        <input
            class="w-full bg-gray-50 !outline-none focus:ring-0"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
        />
    </div>
</template>
