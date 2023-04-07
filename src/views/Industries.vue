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

    /**
     * Retrieves a list of industries from an API endpoint and assigns it to an industries variable.
     *
     * @async
     * @function getIndustries
     * @returns {Promise<void>} - This function does not return a value, but it sets the value of the industries variable.
     *
     * @throws {Error} - If the API endpoint returns an error or if the axios library encounters an error while making the request.
     */
    async function getIndustries() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/industries`)
        industries.value = data
    }


    /**
     * Navigates to a specified route with a given slug parameter using the router.
     *
     * @function navigateTo
     * @param {object} options - An object containing the route name and slug parameter.
     * @param {string} options.name - The name of the route to navigate to.
     * @param {string} options.slug - The value of the slug parameter for the route.
     * @returns {void} - This function does not return a value, but it navigates to the specified route with the given slug parameter using the router.
     */
    function navigateTo(options) {

        router.push({
            name: options.name,
            params: { slug: options.slug }
        })
        
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
                    @click="navigateTo({
                        name: 'industries-jobs',
                        slug: industry.slug
                    })"
                    class="w-full md:w-auto rounded-lg cursor-pointer transition bg-white hover:bg-sky-50 p-4 mb-4 shadow-md flex items-center justify-between gap-5">

                    <h2 class="text-gray-700 text-xl font-semibold">{{ industry.label }}</h2>
                    <BadgeRound :text="industry.listings_count" />
                </div>
            </div>
            
        </Container>
    </main>
</template>