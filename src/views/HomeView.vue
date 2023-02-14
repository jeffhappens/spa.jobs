<script setup>
import { ref } from 'vue'
import HeroHome from '../components/HeroHome.vue'
import SearchBoxHome from '../components/SearchBoxHome.vue'
import Results from '../components/Results.vue'

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

    <Results :results="results" :heading="resultsHeading" />
    

</template>