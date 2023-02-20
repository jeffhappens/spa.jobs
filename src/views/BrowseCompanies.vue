<script setup>
    import { ref } from 'vue'

    const companies = ref([])

    async function getCompanies() {

        const { data } = await axios.get('http://localhost:8000/api/companies')
        companies.value = data

    }
    getCompanies()

</script>

<template>
    <main class="flex justify-center items-start bg-gray-100 bg">
        <div class="rounded-lg w-3/4 mx-auto">
            <div class="my-6">
                <h2 class="text-4xl text-gray-800 font-semibold">Browse Companies</h2>
            </div>


            <div v-for="company in companies" :key="company.id" class="p-4 mb-8 shadow-md flex gap-5">
                <div class="w-1/4">
                    <img :src="`/img/${company.logo}`" />
                </div>
                <div class="text-gray-600">
                    <h2 class="text-2xl text-gray-700">{{ company.name }}</h2>
                    <p class="mb-2">{{ company.industry }}</p>
                    <p>{{ company.listings_count }} current listings</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ratione nulla aut perspiciatis magnam laboriosam possimus eum sapiente aliquid ipsam? Accusamus esse qui pariatur sed. Dolor blanditiis velit maxime quo.</p>
                </div> 
            </div>
        </div>
    </main>
</template>