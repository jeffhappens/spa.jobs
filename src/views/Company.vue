<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute, useRouter } from 'vue-router'
    import MainContentArea from '../components/MainContentArea.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    

    const route = useRoute()
    const store = useStore()

    const company = ref()

    async function getCompany() {

        const uuid = route.params.uuid
        const slug = route.params.slug

        const { data } = await axios.get(`${store.state.api_url_base}/api/company/${uuid}/${slug}`)
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
                    <h2 class="text-4xl font-semibold mb-2 text-gray-700">{{ company.name }}</h2>
                    <div class="mb-8">
                        <p class="text-gray-700">
                            <span class="font-semibold">Location:</span>
                            {{ company.city }}, {{ company.state }}
                        </p>
                        <p class="text-gray-700">
                            <span class="font-semibold">Industry:</span> {{ company.industry.label }}
                        </p>
                        <p class="text-gray-700">
                            <span class="font-semibold">URL: </span>
                            <a class="text-[color:var(--p-orange)]" :href="company.url">{{ company.url }}</a>
                            
                        </p>
                    </div>

                    <h3 class="font-semibold text-gray-800 text-xl">About the Company</h3>

                    <p class="text-gray-700">{{ company.description }}</p>
                </div>
                
                <div class="w-1/3">
                    <h3 class="text-2xl font-semibold text-gray-700 mb-2 ml-2">Current Listings</h3>

                    <div v-if="!company.listings.length">
                        <p class="text-gray-700">There are no current listings</p>
                    </div>

                    <div v-if="company.listings.length">
                        <div
                            v-for="listing in company.listings"
                            :key="listing.id"
                            class="bg-white px-4 py-3 mb-4 rounded-md shadow-sm">

                            <p class="text-gray-700 text-lg">
                                <router-link class="font-semibold" :to="{ name: 'listing', params: { uuid: listing.uuid, slug: listing.slug }}">{{ listing.title }}</router-link>
                            </p>
                            <p class="text-gray-500 text-xs font-semibold">Posted on: {{ listing.created_at }}</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            

            
            
        </Container>
    </MainContentArea>

    
</template>