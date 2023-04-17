<script setup>

import { onMounted, ref } from 'vue'

defineProps(['modelValue', 'icon', 'type']);

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
    <div class="text-gray-700 w-full mb-1 shadow-sm bg-gray-50 flex items-center border border-gray-300">
        <div v-if="icon" class="pl-2 pt-1">
            <font-awesome-icon :icon="`fa-solid fa-${icon}`" class="text-xl" />
        </div>
        <input
            :type="type"
            class="w-full bg-gray-50 !outline-none focus:ring-0 border-0"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
        />
    </div>
</template>
