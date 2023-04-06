<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    
    import MainContentArea from "#/MainContentArea.vue";
    import PageHeading from '#/PageHeading.vue'
    import Container from '#/Container.vue'
    import Label from '#/form/Label.vue'
    import Select from '#/form/Select.vue'
    import TextInput from '#/form/TextInput.vue'
    import ErrorMessage from '#/form/ErrorMessage.vue'
    import AddCompany from '#/form/AddCompany.vue'

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

    const applicationType = ref('url')

    function changeApplicationLinkContext(type) {
        const typeIsUrl = type === 'url'
        const typeIsEmail = type === 'email'

        console.log(type)

        if(typeIsEmail) {
            updateState('apply_link', '')
        }
        if(typeIsUrl) {
            updateState('apply_link', 'https://')
        }
        applicationType.value = type
        
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

                        <div class="mb-8">
                            <AddCompany :errors="errors" :companies="companies" />
                        </div>



                        <div class="flex items-center gap-1 text-[color:var(--p-orange)] mb-4">
                            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" />
                            <p>All fields are required</p>
                        </div>



                        <div class="mb-4">
                            <Label
                                for="title"
                                helpText="e.g. Web Developer III, or Sales Associate."
                                value="Job Title" />

                            <TextInput
                                v-model="store.state.listing.title"
                                @update:modelValue="updateState('title', $event)"
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
                                    helpText="The url to your application, or you can use an email address."
                                    value="Application Link or Email" />

                                <TextInput
                                    v-if="applicationType === 'url'"
                                    v-model="store.state.listing.apply_link"
                                    @update:modelValue="updateState('apply_link', $event)"
                                    :class="{ 'border border-red-500' : errors?.apply_link }"
                                />
                                <p
                                    v-if="applicationType === 'url'"
                                    class="text-sky-600 text-sm hover:underline cursor-pointer"
                                    @click="changeApplicationLinkContext('email')">
                                    Use an email address instead
                                </p>

                                <TextInput
                                    v-if="applicationType === 'email'"
                                    v-model="store.state.listing.apply_link"
                                    @update:modelValue="updateState('apply_link', $event)"
                                    :class="{ 'border border-red-500' : errors?.apply_link }"
                                />
                                <p
                                    v-if="applicationType === 'email'"
                                    class="text-sky-600 text-sm hover:underline cursor-pointer"
                                    @click="changeApplicationLinkContext('url')">
                                    Use a url instead
                                </p>
                                <ErrorMessage v-if="errors?.apply_link" text="Please provide a link to your application" />
                            </div>

                        </div>

                        
                        <div class="mb-6 text-gray-700">
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
                                    @ready="allowTabbingIntoEditor()"
                                />
                            </div>
                            <ErrorMessage v-if="errors?.description" text="Please provide a Job Description" />

                            <div class="flex items-center gap-2 my-8">
                                <button
                                    @click="validateListing"
                                    class="px-4 py-2 text-white font-semibold rounded-md bg-sky-400">
                                    Continue to Preview
                                </button>

                                <ErrorMessage v-if="errors" class="mb-0" text="Whoops! It looks like there are some fields that still needs to be completed" />
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