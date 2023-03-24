<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'

    import MainContentArea from "../components/MainContentArea.vue";
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    import Stepper from '../components/form/Stepper.vue'
    import Label from '../components/form/Label.vue'
    import Select from '../components/form/Select.vue'
    import TextInput from '../components/form/TextInput.vue'

    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faUserSecret, faLocationDot, faLink } from '@fortawesome/free-solid-svg-icons'
    
    library.add(faUserSecret, faLocationDot, faLink)

    const store = useStore()
    const user = JSON.parse(localStorage.getItem('user'))

    async function saveListing() {
        const { data } = await axios.post(`${store.state.api_url_base}/api/listing/add`, store.state.job_listing)

        location.href = `https://buy.stripe.com/test_8wM041fpEbUZ8b6bII?client_reference_id=${user.uuid}&success_url=${store.state.api_url_base}`
    }
    
</script>

<template>

    <MainContentArea>
        
        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="mb-6">

                <Stepper />

                <div class="bg-white p-6 rounded-lg shadow-md">

                    
                    <div class="flex items-start gap-5">

                        <div class="w-2/3 text-gray-700">
                            <h2 class="text-3xl font-semibold">{{ store.state.job_listing.title }}</h2>
                            <p>
                                <span class="font-semibold">Job Type:</span>
                                {{ store.state.job_listing.type === 'ft' ? 'Full Time' : 'Part Time' }}
                            </p>
                            <div class="mt-10" v-html="store.state.job_listing.description"></div>

                        <div class="flex gap-2">
                            <router-link :to="{ name: 'post-company-details' }" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</router-link>
                            <button @click="saveListing" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Payment</button>
                            <!-- <a
                                href="https://buy.stripe.com/test_8wM041fpEbUZ8b6bII"
                                class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">
                                Continue to Payment
                            </a> -->
                        </div>


                        </div>



                        <div class="flex-1 text-gray-700 shadow-md p-4 sticky top-28 self-start">
                            
                            <div class="text-center mb-2">
                                <img class="w-32 mx-auto rounded-md" :src="`${store.state.api_url_base}/${store.state.job_listing.company.logo}`" />
                                <h3 class="text-xl font-semibold">{{ store.state.job_listing.company.name }}</h3>
                                <p class="text-sm">
                                    <font-awesome-icon icon="fa-solid fa-location-dot" />
                                    {{ store.state.job_listing.company.city }}, {{ store.state.job_listing.company.state }}
                                </p>

                                

                                
                            </div>

                            

                            <div class="p-4 text-center">
                                <ul>
                                    <li>
                                        <router-link class="text-sky-500 font-semibold" :to="`/company/${store.state.job_listing.company.uuid}/${store.state.job_listing.company.slug}`">Company Profile &amp; Listings</router-link>
                                    </li>
                                    <li>
                                        <a target="_blank" class="text-sky-500 font-semibold" :href="store.state.job_listing.company.url">
                                            <font-awesome-icon icon="fa-solid fa-link" />
                                            Company Website
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </MainContentArea>
    
</template>