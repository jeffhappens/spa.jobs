<script setup>

    import { ref, defineEmits } from 'vue'
    import { useRoute } from 'vue-router'
    
    
    import HeroHome from '#/HeroHome.vue'
    import SearchBoxHome from '#/SearchBoxHome.vue'
    import ListingCard from '#/ListingCard.vue'
    import Pagination from '#/Pagination.vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const route = useRoute()
    const emit = defineEmits(['emailVerified'])

    if(!!route.query.verified) {
        emit('emailVerified')
    }

    const results = ref({})
    const resultsHeading = ref('Recent Listings')

    async function getResults(page = 1) {
        let { data } = await axios.get(`${store.state.api_url_base}/api/listings?page=${page}`)
        results.value = data
        resultsHeading.value = 'Recent Listings'
    }

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
                
                <h2 class="text-4xl p-3 mb-10 text-center text-[color:var(--p-blue-drk)] font-semibold">{{ resultsHeading }}</h2>
                
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
</template>
