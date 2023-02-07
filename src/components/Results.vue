<script setup>
import { ref } from 'vue'
import axios from 'axios'

const results = ref()

async function getResults() {
    let { data } = await axios.get('http://localhost:8000/api/listings')
    results.value = data
}
getResults()

</script>
<template>
    <div class="bg-gray-50 py-10">
        
        <div class="rounded-lg w-2/3 mx-auto">

            <h2 class="text-4xl mb-6 text-center text-[color:var(--p-blue-drk)] font-semibold">Recent Listings</h2>

            <div
                class="bg-white mt-3 mb-12 p-6 text-black shadow-md rounded-3xl last:mb-0"
                v-for="result in results" :key="result.id">

                <div class="flex justify-between align-start">
                    <h4 class="text-black text-2xl">{{ result.title }}</h4>
                    <p class="text-sm">{{ new Intl.DateTimeFormat('en-us').format() }}</p>
                </div>
                <p class="mb-2 text-[color:var(--p-blue-md)]">{{ result.company.name }}</p>

                

                <p class="text-md">{{ result.description }}</p>
                
                <div class="flex items-center justify-end mt-8">
                    <a :href="'http://'+result.apply_link" class="shadow-md text-lg font-semibold bg-[color:var(--p-blue-md)] text-white py-1 px-4 rounded-full">Apply for this job</a>
                </div>

            </div>
        </div>
    </div>
</template>