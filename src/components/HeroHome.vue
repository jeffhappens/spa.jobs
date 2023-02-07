<script setup>
import { ref } from 'vue'

const heading = ref('Job Board for Developers, Designers, and Marketers')
const description = ref('Jobs is a curated job board of the best jobs for developers, designers and marketers in the tech industry.')

</script>  
<template>
    <div class="bg-[color:var(--p-blue-drk)] text-white">
        <div class="max-w-screen-md mx-auto text-center pt-16 pb-10">
            
            <h2 class="font-bold text-6xl mb-6">{{ heading }}</h2>
            
            <p class="text-lg">{{ description }}</p>
        </div>
    </div>
</template>
