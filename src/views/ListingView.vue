<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import MainContentArea from '../components/MainContentArea.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'

    const route = useRoute()

    const listing = ref()

    async function getListing() {

        const uuid = route.params.uuid
        const slug = route.params.slug
        
        const { data } = await axios.get(
            `http://localhost:8000/api/listing/${uuid}/${slug}`
        )
        listing.value = data

    }
    getListing()

    
</script>

<template>

    <MainContentArea>
        <PageHeading text="Job Listing" />

        <Container>

        </Container>
    </MainContentArea>
    
</template>