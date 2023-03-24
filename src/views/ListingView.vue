<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute, useRouter } from 'vue-router'
    import MainContentArea from '../components/MainContentArea.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'

    const route = useRoute()
    const store = useStore()

    const listing = ref()

    async function getListing() {

        const uuid = route.params.uuid
        const slug = route.params.slug
        
        const { data } = await axios.get(
            `${store.state.api_url_base}/api/listing/${uuid}/${slug}`
        )
        listing.value = data

    }
    getListing()

    
</script>

<template>

    <MainContentArea>
        <PageHeading text="Job Listing" />

        <Container v-if="listing">
            <div class="flex gap-10 justify-between items-start">
                
                <div class="text-gray-600 text-lg w-2/3">
                    <h2 class="text-3xl">{{ listing.title }}</h2>
                    <p>{{ listing.company.name }}</p>
                    <p class="text-sm font-semibold">Type: Full Time</p>

                    <div class="mt-12" v-html="listing.description"></div>

                    <button class="bg-sky-400 text-white px-6 py-2 my-6 rounded-sm">Apply for this Job</button>
                    
                </div>

                <div class="flex-1 flex flex-col items-center justify-center text-gray-600 bg-white p-4">
                    <img class="w-1/2 mb-2 rounded-full" :src="`${store.state.api_url_base}/${listing.company.logo}`" />
                    <p class="text-xl">{{ listing.company.name }}</p>
                    <p>
                        <font-awesome-icon icon="fa-solid fa-location-dot" />
                        {{ listing.company.city }}, {{ listing.company.state }}
                    </p>
                    <p class="mb-4">Company Profile &amp; Listings</p>
                    <p>
                        <font-awesome-icon icon="fa-solid fa-link" />
                        Website
                    </p>

                    <button class="bg-sky-400 text-white px-6 py-2 my-6 rounded-sm">Apply for this Job</button>
                </div>


            </div>

        </Container>
    </MainContentArea>
    
</template>