<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import MainContentArea from '../components/MainContentArea.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    

    const route = useRoute()

    const company = ref()

    async function getCompany() {

        const uuid = route.params.uuid
        const slug = route.params.slug

        const { data } = await axios.get(`http://localhost:8000/api/company/${uuid}/${slug}`)
        company.value = data
    }
    getCompany()
</script>

<template>
    <MainContentArea v-if="company">
        <PageHeading text="Company Profile" />
        <Container>
            <div class="flex gap-5">

                <div class="flex-1">
                    <h2 class="text-5xl mb-2 text-gray-700">{{ company.name }}</h2>
                    <div class="mb-8">
                        <p class="text-lg text-gray-700">
                            <span class="font-semibold">Address:</span>
                            {{ company.address }}
                        </p>
                        <p class="text-lg text-gray-700">
                            <span class="font-semibold">Industry:</span> {{ company.industry.label }}
                        </p>
                        <p class="text-lg text-gray-700">
                            <span class="font-semibold">URL:</span> {{ company.url }}
                        </p>
                    </div>

                    <h3 class="font-semibold text-gray-800 text-2xl">About the Company</h3>

                    <p class="text-gray-700">{{ company.description }}</p>
                </div>
                
                <div class="w-1/3">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-2 ml-2">Current Listings</h3>

                    <div
                        v-for="listing in company.listings"
                        :key="listing.id"
                        class="bg-white px-4 py-3 mb-4 rounded-sm shadow-sm">

                        <p class="text-gray-700 text-lg font-semibold">{{ listing.title }}</p>
                        <p class="text-gray-500 text-xs font-semibold">Posted on: {{ listing.created_at }}</p>
                    </div>
                    
                </div>
            </div>

            

            
            
        </Container>
    </MainContentArea>

    
</template>