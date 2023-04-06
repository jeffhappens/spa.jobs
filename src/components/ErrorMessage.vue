<script setup>

    const props = defineProps(['message'])

</script>
<template>
    <div class="text-black">
        <div class="flex items-center justify-center gap-5 border-2 border-amber-400 p-4 rounded-lg">

            <font-awesome-icon class="text-amber-500 text-3xl" icon="fa-solid fa-triangle-exclamation" />

            <div>
                <p class="text-black text-2xl">{{ props.message.message }}</p>
                <p>If this problem continues, <a class="text-sky-500 hover:underline" href="mailto:test@example.com">please contact us</a>.</p>
            </div>

        </div>

        
    </div>
</template>