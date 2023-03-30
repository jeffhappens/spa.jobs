<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    
    import MainContentArea from "#/MainContentArea.vue";
    import PageHeading from '#/PageHeading.vue'
    import Container from '#/Container.vue'
    import Label from '#/form/Label.vue'
    import Select from '#/form/Select.vue'
    import TextInput from '#/form/TextInput.vue'
    import ErrorMessage from '#/form/ErrorMessage.vue'

    import Stepper from '#/form/Stepper.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    
    const router = useRouter()
    const store = useStore()
    const user = JSON.parse(localStorage.getItem('user'))
    
    const companies = ref()

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
    
    async function getCompanies() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/companies/${user.uuid}`)
        companies.value = data
    }
    getCompanies()
    
    function setCompany(id) {
        const company = companies.value.find(v => {
            return v.id == id
        })
        store.dispatch('SET_COMPANY', company)
        updateState('company_id', company.id)
        updateState('industry_id', company.industry_id)
    }
    
    function updateState(field, value) {
        store.dispatch('SET_LISTING_VALUE', { field, value })
    }
    updateState('author_uuid', user.uuid)

    const errors = ref()

    function checkValidation(field) {
        if(errors.value[field]) {
            if(store.state.listing[field] !== '') {
                delete errors.value[field]
            }
            
        }
    }

    async function validateListing() {
        try {
            const { data } = await axios.post(
                `${store.state.api_url_base}/api/listing/validate`,
                store.state.listing
            )
            router.push({ name: 'post-preview' })
        } catch(err) {
            console.log(err.response.data.errors)
            errors.value = err.response.data.errors

        }
    }

    function allowTabbingIntoEditor() {
        let toolbarButtons = document.querySelectorAll('.ql-toolbar button')
        let toolbarPickers = document.querySelectorAll('.ql-picker-label')

        toolbarButtons.forEach(v => {
            v.tabIndex = -1
        })
        toolbarPickers.forEach(v => {
            v.tabIndex = -1
        })
    }
</script>

<template>

    <MainContentArea>

        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="mb-6">

                <Stepper />

                <div class="bg-white p-6 rounded-lg shadow-md flex-1">
                    
                    <form @submit.prevent="">

                        <div class="flex items-center gap-2 text-[color:var(--p-orange)] mb-4">
                            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                            <p>All fields are required</p>
                        </div>

                        <div class="mb-8">
                            
                            <Label
                                for="companies"
                                helpText="Choose a company for this listing, or use the Add Company button to add a new one."
                                value="Company" />

                            <div class="flex items-start justify-between">

                                <div class="flex-1">

                                    <Select
                                        v-if="companies?.length"
                                        class="w-1/2"
                                        :class="{ 'border border-red-500' : errors?.company_id }"
                                        v-model="store.state.listing.company_id"
                                        @update:modelValue="setCompany($event)">
                                        <option value="">Select a Company</option>

                                        <option
                                            v-for="company in companies"
                                            :key="company.id"
                                            :value="company.id">
                                            {{ company.name }}
                                        </option>
                                    </Select>
                                    <ErrorMessage v-if="errors?.company_id" text="Please select a company" />
                                </div>

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
                                v-model="store.state.listing.title"
                                @update:modelValue="updateState('title', $event)"
                                @blur="validateListing"
                                :class="{ 'border border-red-500' : errors?.title }"
                            />
                            <ErrorMessage v-if="errors?.title" text="Please provide a Job Title" />
                        </div>

                        <div class="flex gap-5">
                            <div class="w-1/2">
                                <Label
                                    for="job_type"
                                    helpText="Full-time, Part-time, Contract"
                                    value="Job Type" />

                                <Select
                                    v-model="store.state.listing.type_id"
                                    @update:modelValue="updateState('type', $event)">

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
                                    v-model="store.state.listing.apply_link"
                                    @update:modelValue="updateState('apply_link', $event)"
                                    @blur="checkValidation('apply_link')"
                                    :class="{ 'border border-red-500' : errors?.apply_link }"
                                />
                                <ErrorMessage v-if="errors?.apply_link" text="Please provide a link to your application" />
                            </div>

                        </div>

                        
                        <div class="mb-4 text-gray-700">
                            <Label
                                for="title"
                                value="Job Description"
                                helpText="Make sure to include at least a detailed job summary, and required/preferred skills." />
                            
                            <!-- Quill Editor -->
                            <div :class="{ 'border border-red-500' : errors?.description }">
                                <QuillEditor
                                    theme="snow"
                                    :options="quillOptions"
                                    v-model:content="store.state.listing.description"
                                    contentType="html"
                                    @blur="checkValidation('description')"
                                    @ready="allowTabbingIntoEditor()"
                                />
                            </div>
                            <ErrorMessage v-if="errors?.description" text="Please provide a Job Description" />

                            <div class="flex gap-2">
                                <button
                                    @click="validateListing"
                                    class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">
                                    Continue to Preview
                                </button>
                                <!-- <router-link
                                    :to="{ name: 'post-preview' }"
                                    class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">
                                    Continue to Preview
                                </router-link> -->
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Container>
    </MainContentArea>
</template>
<style>
    .ql-editor {
        @apply text-base;
    }
    .ql-editor p {
        @apply mb-3;
    }
    .ql-editor ul,
    .ql-editor ol {
        @apply mt-2 mb-4 px-6;
    }
    .editor_content ol {
        @apply list-decimal;
    }
    .editor_content ul {
        @apply list-disc;
    }
</style>