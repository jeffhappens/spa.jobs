<script setup>
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Select from '#/form/Select.vue'
    import Label from '#/form/Label.vue'
    
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute, useRouter } from 'vue-router'

    const emit = defineEmits(['listing:reported'])

    const route = useRoute()
    const router = useRouter()

    const store = useStore()

    const listing = ref()

    async function getListing() {

        const uuid = route.params.uuid
        const slug = route.params.slug
        
        const { data } = await axios.get(
            `${store.state.api_url_base}/api/listing/${uuid}/${slug}`
        )
        listing.value = data
    }
    
    const reportLabels = ref()
    const selectedLabel = ref('1')
    const questions_comments = ref('')
    
    async function getReportLabels() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/reportlabels`)
        console.log(data)
        reportLabels.value = data
    }

    async function submitReport() {
        const { data } = await axios.post(`${store.state.api_url_base}/api/submitreport`, {
            reason_id: selectedLabel.value,
            comments: questions_comments.value,
            listing_uuid: route.params.uuid
        })
        emit('listing:reported')
        router.back()

    }

    getListing()
    getReportLabels()
</script>
<template>
    <MainContentArea>
        <PageHeading text="Report a Listing" />
        <Container>

            <div class="flex items-start gap-5 text-gray-700">

                <div class="w-1/2 sticky top-24 self-start">
                    <Label value="Please select the option that best describes the listing."></Label>

                    <div class="mb-4">
                        <Select v-model="selectedLabel">

                            <option
                                v-for="label in reportLabels"
                                :key="label.id"
                                :value="label.id">

                                {{ label.label }}

                            </option>

                        </Select>
                    </div>
                    <div>
                        <Label value="Additional comments or questions."></Label>
                        <textarea v-model="questions_comments" name="" class="h-24 w-full border border-gray-300 shadow-sm"></textarea>
                    </div>
                    <button @click="submitReport" class="bg-sky-400 text-white py-1 px-4 rounded-sm">Submit Report</button>
                </div>

                <div class="flex-1 bg-white p-4 border" v-if="listing">
                    <h3 class="text-xl font-semibold">{{ listing.title }}</h3>
                    <p>
                        <router-link
                            :to="{ name: 'company', params: { uuid: listing.company.uuid, slug: listing.company.slug } }"
                            class="text-[color:var(--p-orange)]">
                            {{ listing.company.name }}
                        </router-link>
                        
                    </p>

                    <p class="text-sm font-semibold">Type: {{ listing.type.label }}</p>
                    <div class="editor_content mt-6" v-html="listing.description"></div>

                </div>
            </div>
        </Container>
    </MainContentArea>
</template>