<script setup>
    const props = defineProps(['title', 'content'])
</script>
<template>
    <div class="z-10 fixed w-full h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center">

        <div class="bg-white w-1/2 text-gray-800">
            <h3>{{ props.title }}</h3>
            <p>{{ props.content }}</p>
            <button class="bg-sky-600">BUTTON TEXT</button>
            <button class="bg-amber-600">NEVERMIND</button>
        </div>
    </div>
</template>