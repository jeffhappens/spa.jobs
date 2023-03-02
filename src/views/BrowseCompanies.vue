<script setup>
    import { ref } from 'vue'
    import Pagination from '../components/Pagination.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import BadgeRound from '../components/BadgeRound.vue'

    const companies = ref({})

    async function getCompanies(page = 1) {

        const { data } = await axios.get(`http://localhost:8000/api/companies?page=${page}`)
        companies.value = data

    }
    getCompanies()

</script>

<template>
    <main class="bg-gray-100 bg">
        <PageHeading text="Browse Companies" />
        <Container>

            <Pagination v-if="companies.links?.length > 3" :data="companies" @paginate="getCompanies" />


            <div v-for="company in companies.data" :key="company.id" class="bg-white p-4 mb-8 shadow-md rounded-lg flex gap-5">
                <div class="w-36">
                    <img :src="`http://localhost:8000/${company.logo}`" />
                </div>
                <div class="text-gray-600 flex-1">
                    <router-link :to="{
                        name: 'company',
                        params: {
                            uuid: company.uuid,
                            slug: company.slug
                        }
                    }">
                        <h2 class="text-2xl font-semibold text-gray-700">{{ company.name }}</h2>
                    </router-link>
                    <p class="mb-2">{{ company.address }}</p>
                    <p class="bg-orange-400 inline-block px-2 mb-2 text-white rounded-sm">{{ company.listings_count }} listing(s)</p>
                    

                    
                    <p>{{ company.description }}</p>
                    <p class="mb-2">{{ company.industry.label }}</p>
                </div> 
            </div>

            <Pagination v-if="companies.links?.length > 3" :data="companies" @paginate="getCompanies" />
        </Container>
    </main>
</template>