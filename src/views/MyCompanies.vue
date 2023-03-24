<script setup>

    import { ref } from 'vue'
    
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const user = JSON.parse(localStorage.getItem('user'))

    const myCompanies = ref(null)
    const actions = {
        label: 'Add New Company',
        url: '/account/companies/add'
    }

    async function getCompanies() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/companies/` + user.uuid)
        myCompanies.value = data
    }
    getCompanies()
</script>
<template>

    <MainContentArea>
        
        <PageHeading text="My Companies" :actions="actions" />

        <Container>

            <div class="flex items-start gap-5">

                <SidebarAccount />


                <section class="flex-1">

                    <div v-if="myCompanies?.length">

                        <div v-for="company in myCompanies" :key="company.id" class="bg-white w-full shadow-md rounded-lg text-gray-800 mb-6 p-4 flex gap-5">
                            <div class="w-20">
                                <img :src="`${store.state.api_url_base}/${company.logo}`" />
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold">{{ company.name }}</h3>
                                <p>{{ company.address }}</p>
                                <p>{{ company.industry.label }}</p>
                                <p>{{ company.listings_count }} current listing(s)</p>
                            </div>
                            <div>
                                <router-link :to="{
                                    name: 'edit-company',
                                    params: { id: company.id }
                                }">
                                <font-awesome-icon class="text-xl text-gray-600" icon="fa-solid fa-pen-to-square" />
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <p class="text-xl text-gray-700 text-center">You havent added a company</p>
                    </div>
                    

                </section>
            </div>
        </Container>
    </MainContentArea>
    
</template>