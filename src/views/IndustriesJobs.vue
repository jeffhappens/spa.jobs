<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import MainContentArea from "../components/MainContentArea.vue"
    import PageHeading from "../components/PageHeading.vue"
    import Container from "../components/Container.vue"
    import ListingCard from "../components/ListingCard.vue"

    const route = useRoute()

    const industry = ref()

    async function getListingsByIndustry() {
        
        const slug = route.params.slug
        const { data } = await axios.get(`http://localhost:8000/api/industries/${slug}`)

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