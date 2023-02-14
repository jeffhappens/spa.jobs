<script setup>
import { ref } from 'vue'

const props = defineProps({
    results: Array,
    heading: String
})

</script>
<template>
    <div class="bg-gray-50 pt-24">
        
        <div class="rounded-lg w-3/4 mx-auto">

            <h2 class="text-4xl p-3 mb-10 text-center text-[color:var(--p-blue-drk)] font-semibold">{{ heading }}</h2>

            <div
                class="bg-white mb-12 p-6 text-black shadow-md rounded-3xl last:mb-0"
                v-for="result in results" :key="result.id">

                <div class="flex justify-between align-start">
                    <h4 class="text-black text-3xl">
                        <router-link :to="{ name: 'listing' }">{{ result.title }}</router-link>
                    </h4>
                    <p class="text-sm">{{ new Intl.DateTimeFormat('en-us').format() }}</p>
                </div>
                <p v-if="result.distance">{{ Math.floor(result.distance) }} miles away</p>
                <p class="mb-2 text-[color:var(--p-blue-md)]">{{ result.company.name }}</p>

                

                <p class="text-md">{{ result.description }}</p>
                
                <div class="flex items-center justify-end mt-8">
                    <a :href="'http://'+result.apply_link" class="shadow-md text-lg font-semibold bg-[color:var(--p-blue-md)] text-white py-1 px-4 rounded-full">Apply for this job</a>
                </div>

            </div>
        </div>
    </div>
</template>