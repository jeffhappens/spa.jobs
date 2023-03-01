<script setup>
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import { ref } from 'vue'

    const industries = ref(null)
    const host = 'http://localhost:8000'
    const apihost = host + '/api'

    async function getIndustries() {
        const { data } = await axios.get(`${apihost}/industries`)
        industries.value = data
    }
    getIndustries()


</script>
<template>
    <main class="bg-gray-100 bg">

        <PageHeading text="Browse Industries" />
        
        <Container>
            
            <!-- <div class="my-6">
                <h2 class="text-4xl text-gray-800 font-semibold">Industries</h2>
            </div> -->

            <div class="flex flex-wrap gap-5">

                <div v-for="industry in industries" :key="industry.id" class="bg-white p-4 mb-4 shadow-md flex items-center gap-5">
                    <h2 class="text-gray-700 text-xl font-semibold">{{ industry.label }}</h2>
                    <p class="text-gray-700">{{ industry.listings_count }} listing(s)</p>
                </div>
            </div>
            
        </Container>
    </main>
</template>