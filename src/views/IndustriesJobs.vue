<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import MainContentArea from "#/MainContentArea.vue"
    import PageHeading from "#/PageHeading.vue"
    import Container from "#/Container.vue"
    import ListingCard from "#/ListingCard.vue"
    import { useStore } from 'vuex'

    const route = useRoute()
    const store = useStore()

    const industry = ref()

    /**
     * Retrieves a list of listings associated with a specified industry from an API endpoint and assigns it to an industry variable.
     *
     * @async
     * @function getListingsByIndustry
     * @returns {Promise<void>} - This function does not return a value, but it sets the value of the industry variable.
     *
     * @throws {Error} - If the API endpoint returns an error, if the axios library encounters an error while making the request, or if the slug parameter is not present in the route object.
     */
    async function getListingsByIndustry() {
        const slug = route.params.slug
        const { data } = await axios.get(`${store.state.api_url_base}/api/industries/${slug}`)
        industry.value = data
    }

    getListingsByIndustry()
</script>

<template>

    <MainContentArea>
        <PageHeading v-if="industry" :text="`${industry.label} Jobs`" />

        <Container>
            <div v-for="listing in industry?.listings" :key="listing.id">
                <ListingCard :listing="listing" />
            </div>

        </Container>
    </MainContentArea>

    
</template>