<script setup>

    import { ref, defineProps, defineEmits } from 'vue'
    const props = defineProps({
        value: {
            type: String,
            required: true
        },
        for: String,
        helpText: String
    })

</script>
<template>

    <div class="flex flex-col justify-end">

        <label
            :for="props.for"
            class="block text-gray-700 font-semibold mb-1">
            {{ value }}
        </label>
        <p class="text-gray-400 text-xs -mt-2 mb-2">
            {{ helpText }}
        </p>
        
    </div>
</template>