<script setup>

    import { ref, defineProps } from 'vue'
    
    import HeroHome from '../components/HeroHome.vue'
    import SearchBoxHome from '../components/SearchBoxHome.vue'
    import ListingCard from '../components/ListingCard.vue'
    import Pagination from '../components/Pagination.vue'

    const results = ref({})
    const resultsHeading = ref('Recent Listings')

    async function getResults(page = 1) {
        let { data } = await axios.get(`http://localhost:8000/api/listings?page=${page}`)
        results.value = data
    }

    function newResults(d) {
        console.log(d)
        results.value = d.d
        resultsHeading.value = `We found ${d.d.data.length} listings for "${d.term}"`
    }
    getResults()

</script>

<template>
    <div>
        <HeroHome />
        <SearchBoxHome  @resultsUpdated="newResults" />

        <div class="bg-gray-50 pt-24">
            <div class="rounded-lg w-3/4 mx-auto">
                
                <h2 class="text-4xl p-3 mb-10 text-center text-[color:var(--p-blue-drk)] font-semibold">{{ resultsHeading }}</h2>
                
                <Pagination :data="results" @paginate="getResults" />
                
                <div v-for="listing in results.data" :key="listing.id">
                    <ListingCard  :listing="listing" />
                </div>

                <Pagination :data="results" @paginate="getResults" />

            </div>
        </div>
    </div>
</template>
