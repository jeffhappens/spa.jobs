<script setup>
import { ref, defineProps } from 'vue'
import HeroHome from '../components/HeroHome.vue'
import SearchBoxHome from '../components/SearchBoxHome.vue'
import ListingCard from '../components/ListingCard.vue'


const results = ref([])
const resultsHeading = ref('Recent Listings')

async function getResults() {
    let { data } = await axios.get('http://localhost:8000/api/listings')
    results.value = data
}

function newResults(d) {
    results.value = d.d
    resultsHeading.value = `We found ${d.d.length} listings for "${d.term}"`
}
getResults()

</script>

<template>

    <HeroHome />
    
    <SearchBoxHome  @results-updated="newResults" />
    
    <div class="bg-gray-50 pt-24">
        <div class="rounded-lg w-3/4 mx-auto">
            <h2 class="text-4xl p-3 mb-10 text-center text-[color:var(--p-blue-drk)] font-semibold">{{ resultsHeading }}</h2>
            <div v-for="listing in results" :key="listing.id">
                <ListingCard  :listing="listing" />
            </div>
        </div>
    </div>

</template>