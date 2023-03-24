<script setup>
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import BadgeRound from '../components/BadgeRound.vue'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const industries = ref(null)
    const router = useRouter()
    const store = useStore()

    async function getIndustries() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/industries`)
        industries.value = data
    }

    function navigateTo(destination) {
        router.push({ path: destination })
    }

    getIndustries()


</script>
<template>
    <main class="bg-gray-100 bg">

        <PageHeading text="Browse Industries" />
        
        <Container>
            
            <div class="flex flex-wrap gap-5">

                <div
                    v-for="industry in industries"
                    :key="industry.id"
                    @click="navigateTo(`/industries/${industry.slug}`)"

                    class="cursor-pointer transition bg-white hover:bg-gray-50 p-4 mb-4 shadow-md flex items-center justify-between gap-5">

                    <h2 class="text-gray-700 text-xl font-semibold">{{ industry.label }}</h2>
                    <BadgeRound :text="industry.listings_count" />
                </div>
            </div>
            
        </Container>
    </main>
</template>