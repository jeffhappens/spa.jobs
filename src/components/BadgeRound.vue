<script setup>
    const props = defineProps(['text'])
</script>

<template>
    <div class="w-8 h-8 rounded-full bg-[color:var(--p-blue-md)] text-white font-semibold flex items-center justify-center">
        <p class="font-semibold">{{ text }}</p>
    </div>
</template>