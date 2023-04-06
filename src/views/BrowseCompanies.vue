<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import Pagination from '#/Pagination.vue'
    import Container from '#/Container.vue'
    import PageHeading from '#/PageHeading.vue'
    import BadgeRound from '#/BadgeRound.vue'
    import ErrorMessage from '#/ErrorMessage.vue'

    const store = useStore()

    const errorMessage = ref({
        status: false,
        message: ''
    })


    // Companies
    const companies = ref( getCompanies() )
    async function getCompanies(page = 1) {
        try {
            const { data } = await axios.get(`${store.state.api_url_base}/api/companies?page=${page}`)
            companies.value = data
        } catch(err) {
            errorMessage.value.status = true
            errorMessage.value.message = 'Whoops! We encountered a problem while trying to fetch companies.'
        }
    }
    getCompanies()
</script>

<template>
    <main class="bg-gray-100 bg">
        <PageHeading text="Browse Companies" />
        <Container>

            <Pagination v-if="companies.links?.length > 3" :data="companies" @paginate="getCompanies" />

            <ErrorMessage v-if="errorMessage.status" :message="errorMessage" />


            <div v-for="company in companies.data" :key="company.id" class="bg-white p-4 mb-8 shadow-md rounded-lg flex gap-5">
                <div class="w-36">
                    <img :src="`${store.state.api_url_base}/${company.logo}`" />
                </div>
                <div class="text-gray-600 flex-1">

                    <div class="flex items-start justify-between">
                        <div>
                            <router-link :to="{
                                name: 'company',
                                params: {
                                    uuid: company.uuid,
                                    slug: company.slug
                                }
                            }">
                                <h2 class="text-2xl font-semibold text-gray-700 hover:underline">{{ company.name }}</h2>
                            </router-link>
                            <p>
                                {{ company.city }}, {{ company.state }}
                            </p>
                            <p class="font-semibold mb-2">
                                Industry:
                                <span class="italic">{{ company.industry.label }}</span>
                            </p>
                        </div>

                        <div>
                            <p class="bg-orange-400 inline-block px-2 mb-2 text-white rounded-sm">{{ company.listings_count }} listing(s)</p>
                        </div>

                    </div>
                    

                    
                    <!-- <p>{{ company.description }}</p> -->
                </div> 
            </div>

            <Pagination v-if="companies.links?.length > 3" :data="companies" @paginate="getCompanies" />
        </Container>
    </main>
</template>