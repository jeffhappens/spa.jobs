<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import MainContentArea from "../components/MainContentArea.vue";
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    import Label from '../components/form/Label.vue'
    import Select from '../components/form/Select.vue'
    import TextInput from '../components/form/TextInput.vue'
    import Stepper from '../components/form/Stepper.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    
    const router = useRouter()
    const store = useStore()

    const user = JSON.parse(localStorage.getItem('user'))

    // Set up the Quill editor
    const quillOptions = {
        debug: 'info',
        modules: {
            toolbar: [
                ['bold', 'italic'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
            ]

        },
        placeholder: 'Compose an epic job listing...',
        readOnly: false,
        theme: 'snow'
    }

    const job = ref({
        user_uuid: user.uuid,
        company: {},
        title: '',
        industry: { id: 1 },
        apply_link: '',
        job_type_id: 1,
        description: '',
    })

    if( Object.keys(store.state.job_listing).length ) {

        job.value = store.state.job_listing

    }

    async function setJobListing() {
        await store.dispatch('set_job_listing', job.value)
        router.push({ name: 'post-company-details' })

    }


    const industries = ref()
    async function getIndustries() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/industries`)
        industries.value = data
    }
    getIndustries()
</script>

<template>

    <MainContentArea>
        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="mb-6">
                <Stepper />

                <div class="bg-white p-6 rounded-lg shadow-md flex-1">
                    <form @submit.prevent="">
                        <div class="mb-4">
                            <Label for="title" helpText="e.g. Web Developer III, or Sales Associate." value="Job Title" />
                            <TextInput v-model="job.title" @update:modelValue="job.title = $event" />
                        </div>

                        <div class="flex gap-5">

                            <div class="mb-4 w-1/2">
                                <Label for="category" helpText="Choose the job industry." value="Industry" />
                                <Select v-model="job.industry.id" @update:modelValue="job.industry.id = $event">
                                    <option
                                        v-for="industry in industries"
                                        :key="industry.id"
                                        :value="industry.id">
                                        {{ industry.label }}
                                    </option>
                                </Select>
                            </div>

                            <div class="mb-4 w-1/2">
                                <Label for="title" helpText="The url to your application, or an email address." value="Application Link or Email" />
                                <TextInput v-model="job.apply_link" @update:modelValue="job.apply_link = $event" />
                            </div>

                        </div>

                        <div class="flex gap-5 mb-8">

                            <div class="w-1/2">
                                <Label for="job_type" helpText="Full-time, Part-time, Contract" value="Job Type" />
                                <Select v-model="job.job_type_id" @update:modelValue="job.job_type_id = $event">
                                    <option value="1">Full Time</option>
                                    <option value="2">Part Time</option>
                                    <option value="3">Contract</option>
                                </Select>
                            </div>
                        </div>
                        
                        <div class="mb-4 text-gray-700">
                            <Label for="title" value="Job Description" helpText="Make sure to include at least a detailed job summary, and required/preferred skills." />
                            
                            <!-- Quill Editor -->
                            <QuillEditor
                                theme="snow"
                                :options="quillOptions"
                                v-model:content="job.description"
                                contentType="html"
                            />

                            <div class="flex gap-2">
                                <button @click="setJobListing" class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Save &amp; Continue</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Container>
    </MainContentArea>
    
</template>