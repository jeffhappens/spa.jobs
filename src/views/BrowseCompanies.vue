<script setup>
    import { ref } from 'vue'
    import Pagination from '../components/Pagination.vue'

    const companies = ref({})

    async function getCompanies(page = 1) {

        const { data } = await axios.get(`http://localhost:8000/api/companies?page=${page}`)
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

            <Pagination v-if="companies.links?.length > 3" :data="companies" @paginate="getCompanies" />


            <div v-for="company in companies.data" :key="company.id" class="bg-white p-4 mb-8 shadow-md flex gap-5">
                <div class="w-36">
                    <img :src="`/img/${company.logo}`" />
                </div>
                <div class="text-gray-600">
                    <h2 class="text-2xl text-gray-700">{{ company.name }}</h2>
                    <p class="mb-2">{{ company.address }}</p>
                    <p>{{ company.listings_count }} current listings</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At ratione nulla aut perspiciatis magnam laboriosam possimus eum sapiente aliquid ipsam?</p>
                    <p class="mb-2">{{ company.industry }}</p>
                </div> 
            </div>

            <Pagination v-if="companies.links?.length > 3" :data="companies" @paginate="getCompanies" />
        </div>
    </main>
</template>