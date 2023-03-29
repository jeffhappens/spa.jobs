<script setup>
    import { ref, defineEmits } from 'vue'
    import { useRoute, useRouter  } from 'vue-router';
    import { useStore  } from 'vuex';

    import Cookies from 'js-cookie'

    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    
    import Label from '../components/form/Label.vue';
    import TextInput from '../components/form/TextInput.vue';
    import Select from '../components/form/Select.vue'
    import MainContentArea from '../components/MainContentArea.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'

    const user = JSON.parse(localStorage.getItem('user'))

    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const emit = defineEmits(['listing:updated'])

    // Set up the Quill editor
    const quillOptions = {
        modules: {
            toolbar: [
                ['bold', 'italic'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
            ],
        },
        placeholder: 'Compose an epic job listing...',
        readOnly: false,
        theme: 'snow'
    }

    const listing = ref()
    const companies = ref()

    async function updateListing() {
        const { data } = await axios.post(`${store.state.api_url_base}/api/listing/add`, listing.value )
        listing.value = data
        emit('listing:updated')
        router.push({ name: 'my-listings' })
    }

    async function getListing() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/listing/edit/${route.params.uuid}`)
        listing.value = data
    }
    getListing()

    async function getCompanies() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/companies/${user.uuid}`)
        companies.value = data

    }
    getCompanies()

</script>
<template>
    <MainContentArea>
        <PageHeading text="Edit Listing " />

        <Container>
    
            <div class="flex items-start gap-5">

                <SidebarAccount />

                <section v-if="listing" class="flex-1 bg-white p-6 rounded-lg shadow-lg">

                    <form @submit.prevent="updateListing">

                        <div class="mb-8">
                            
                            <Label
                                for="companies"
                                helpText="Choose a company for this listing, or use the button to the right to add a new one."
                                value="Company" />

                            <div class="flex items-center justify-between">

                                <Select
                                    v-if="companies?.length"
                                    class="w-1/2"
                                    v-model="listing.company_id"
                                    @update:modelValue="setCompany($event)">
                                    <option value="">Select a Company</option>

                                    <option
                                        v-for="company in companies"
                                        :key="company.id"
                                        :value="company.id">
                                        {{ company.name }}
                                    </option>
                                </Select>

                                <div class="flex items-center gap-2">

                                    <font-awesome-icon class="text-sky-600 text-2xl" icon="fa-solid fa-plus" />
                                    <router-link class="text-sky-600 font-semibold" :to="{ name: 'add-company' }">ADD COMPANY</router-link>
                                </div>
                            </div>
                        </div>



                        <div class="mb-4">
                            <Label
                                for="title"
                                helpText="e.g. Web Developer III, or Sales Associate."
                                value="Job Title" />

                            <TextInput
                                v-model="listing.title"
                                @update:modelValue="listing.title = $event"
                                required
                            />

                        </div>

                        <div class="flex gap-5">
                            <div class="w-1/2">
                                <Label
                                    for="job_type"
                                    helpText="Full-time, Part-time, Contract"
                                    value="Job Type" />

                                <Select
                                    v-model="listing.type"
                                    @update:modelValue="listing.type = $event">

                                    <option value="1">Full Time</option>
                                    <option value="2">Part Time</option>
                                    <option value="3">Contract</option>
                                </Select>
                            </div>

                            <!-- Apply Link -->
                            <div class="mb-4 w-1/2">
                                <Label
                                    for="title"
                                    helpText="The url to your application, or an email address."
                                    value="Application Link or Email" />

                                <TextInput
                                    v-model="listing.apply_link"
                                    @update:modelValue="listing.apply_link = $event"
                                />
                            </div>

                        </div>

                        
                        <div class="mb-4 text-gray-700">
                            <Label
                                for="title"
                                value="Job Description"
                                helpText="Make sure to include at least a detailed job summary, and required/preferred skills." />
                            
                            <!-- Quill Editor -->
                            <QuillEditor
                                theme="snow"
                                :options="quillOptions"
                                v-model:content="listing.description"
                                contentType="html"
                            />

                            <div class="flex gap-2">
                                <button type="submit" class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">
                                    Update Listing
                                </button>
                            </div>

                        </div>
                    </form>



                    





                </section>
            </div>
        </Container>
    </MainContentArea>
    
</template>