<script setup>

    import { ref } from 'vue'
    
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'

    import ListingCard from '../components/ListingCard.vue'

    import { useStore } from 'vuex'
    const store = useStore()

    const user = JSON.parse(localStorage.getItem('user'))

    const listings = ref(null)

    async function getListings() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/mylistings`)
        listings.value = data
    }
    getListings()
</script>
<template>

    <MainContentArea>
        
        <PageHeading text="My Listings" :actions="actions" />

        <Container>

            <div class="md:flex items-start gap-5">

                <SidebarAccount />


                <section class="flex-1">

                    <div v-for="listing in listings" :key="listing.id">
                        <ListingCard  :listing="listing" />
                    </div>

                </section>
            </div>
        </Container>
    </MainContentArea>
    
</template>