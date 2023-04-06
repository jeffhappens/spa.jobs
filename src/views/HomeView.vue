<script setup>

    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    
    
    import HeroHome from '#/HeroHome.vue'
    import SearchBoxHome from '#/SearchBoxHome.vue'
    import ListingCard from '#/ListingCard.vue'
    import Pagination from '#/Pagination.vue'
    import ErrorMessage from '#/ErrorMessage.vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const route = useRoute()
    const emit = defineEmits(['emailVerified'])

    if(!!route.query.verified) {
        emit('emailVerified')
    }

    const results = ref({})
    const resultsHeading = ref('Recent Listings')

    const error = ref({
        status: false,
        message: ''
    })
    /**
     * Retrieves a list of listings from an API endpoint and assigns it to a results variable.
     *
     * @async
     * @function getResults
     * @param {number} [page=1] - The page number of the listings to retrieve.
     * @returns {Promise<void>} - This function does not return a value, but it sets the value of the results and resultsHeading variables.
     *
     * @throws {Error} - If the API endpoint returns an error or if the axios library encounters an error while making the request.
     */
    async function getResults(page = 1) {
        try {

            let { data } = await axios.get(`${store.state.api_url_base}/api/listings?page=${page}`)
            results.value = data
            resultsHeading.value = 'Recent Listings'
        } catch(err) {

            error.value.status = true
            error.value.message = 'Could not load listings. Please try again later.'
            console.log(err)
        }
    }


    /**
     * Sets the value of the results and resultsHeading variables based on the data returned by the API endpoint.
     *
     * @function newResults
     * @param {object} d - The data returned by the API endpoint.
     * @returns {void} - This function does not return a value, but it sets the value of the results and resultsHeading variables.
     */
    function newResults(d) {
        results.value = d.data
        resultsHeading.value = `We found ${d.data.total} listing(s) for "${d.term}"`
    }
    getResults()

</script>

<template>
    <div>
        <HeroHome />
        <SearchBoxHome  @resultsUpdated="newResults" @resultsCleared="getResults" />

        <div class="bg-gray-50 pt-24">
            <div class="rounded-lg w-3/4 mx-auto">

                <ErrorMessage v-if="error.status" :message="error" />

                <div v-else>
                
                
                    <h2 class="text-4xl p-3 mb-10 text-center text-[color:var(--p-blue-drk)] font-semibold">{{ resultsHeading }}</h2>

                    <p v-if="!results.total" class="text-xl text-center text-[color:var(--p-blue-drk)]">There arent any listings yet. Be the first to post a listing!</p>
                    
                    <Pagination v-if="results.total > 10" :data="results" @paginate="getResults" />
                    
                    <div v-for="listing in results.data" :key="listing.id">
                        <ListingCard  :listing="listing" />
                    </div>

                    <div class="pb-8">
                        <Pagination v-if="results.total > 10" :data="results" @paginate="getResults" />
                    </div>
                </div>

            </div>
        </div>
        
    </div>
</template>
