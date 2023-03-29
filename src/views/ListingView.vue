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

    function applyLinkWeb() {
        try {
            new URL(listing.value.apply_link)
            return true
        } catch(err) {
            return false
        }

    }

    
</script>

<template>

    <MainContentArea>
        <PageHeading text="Job Listing" />

        <Container v-if="listing">
            <div class="flex gap-10 justify-between items-start">
                
                <div class="text-gray-600 text-lg w-2/3">

                    <h2 class="text-3xl font-semibold">{{ listing.title }}</h2>

                    <p>
                        <router-link
                            :to="{ name: 'company', params: { uuid: listing.company.uuid, slug: listing.company.slug } }"
                            class="text-[color:var(--p-orange)]">
                            {{ listing.company.name }}
                        </router-link>
                        
                    </p>

                    <p class="text-sm font-semibold">Type: Full Time</p>

                    <div class="editor_content mt-12" v-html="listing.description"></div>

                    <div class="my-6">
                        <a :href="listing.apply_link" class="bg-sky-400 text-white px-6 py-2 rounded-sm">Apply for this Job</a>
                    </div>
                    
                </div>

                <div class="flex-1 flex flex-col items-center justify-center text-gray-600 bg-white p-4">
                    <img class="w-1/2 mb-2" :src="`${store.state.api_url_base}/${listing.company.logo}`" />
                    <p class="text-xl">{{ listing.company.name }}</p>
                    <p>
                        <font-awesome-icon icon="fa-solid fa-location-dot" />
                        {{ listing.company.city }}, {{ listing.company.state }}
                    </p>
                    <p class="mb-4 flex items-center gap-2">
                        <font-awesome-icon icon="fa-solid fa-building" />
                        <router-link :to="{ name: 'company', params: { uuid: listing.company.uuid, slug: listing.company.slug } }">Company Profile &amp; Listings</router-link>
                    </p>
                    <p class="mb-4 flex items-center gap-2">
                        <font-awesome-icon icon="fa-solid fa-link" />
                        <a :href="listing.company.url">Website</a>
                    </p>

                    <div class="my-6">
                        <a v-if="applyLinkWeb()" :href="listing.apply_link" class="bg-sky-400 text-white px-6 py-2 rounded-sm">Apply for this Job</a>
                        <a v-else :href="`mailto:${listing.apply_link}`" class="bg-sky-400 text-white px-6 py-2 rounded-sm">Apply for this Job</a>
                    </div>
                </div>


            </div>

        </Container>
    </MainContentArea>
    
</template>