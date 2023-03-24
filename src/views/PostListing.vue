<script setup>
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import MainContentArea from "../components/MainContentArea.vue"
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    import Label from '../components/form/Label.vue'
    import Select from '../components/form/Select.vue'
    import TextInput from '../components/form/TextInput.vue'
    import Tag from '../components/Tag.vue'
    import { Quill } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css'

    const store = useStore()

    onMounted(() => {
        const options = {
            placeholder: 'Compose an epic...',
            theme: 'snow',
            modules: {
                toolbar: [ ['bold', 'italic'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], [{ 'header': [1, 2, 3, false] }] ]
            }
        }
        const editor = new Quill('#editor', options)
    })


    const user = JSON.parse(localStorage.getItem('user'))

    const job = ref({
        company_id: '',
        title: 'Web Developer III',
        category: 'Programming',
        skills: [],
        apply_link: 'test@example.com',
        type: 'ft',
        description: `<p>We are seeking a Customer Service Specialist to interact with our customers to provide and process information in response to inquiries and requests about products, services and promotions.</p><br/><p><b>Main Job Tasks and Responsibilities (includes, but is not limited to):</b></p><ul><li>Work with customers daily via email, live chat or other channels</li><li>Handle retail customer service inquiries mainly for English-speaking markets.</li><li>Response to minimum 100 E-mails/Live Chat equivalent per day.</li><li>Promote our products to customers</li></ul><br/><p><b>The Successful Applicant:</b></p><ul><li>Fluency in verbal and written English; additional language is an advantage</li><li>Excellent time management and documentation skills</li><li>Customer service experience preferred</li><li>Availability for 30 - 40 hours a week with flexible shifts</li><li>High-speed stable internet connection</li></ul><br/><p><b>Job Description:</b></p><ul><li>This job requires a patient and stable work style and consistency in dealing with repetitive routines.</li><li>The job demands a cooperative, agreeable and sympathetic listener who gets along with others and enjoys being helpful to them.</li><li>A customer service, the team-oriented focus is of utmost importance. The job requires attention to the details of work, handling them with better-than-average accuracy and with careful attention to the quality of the work.</li><li>The focus is on working comfortably under close supervision within a stable, secure team.</li></ul>`,
        
    })

    const companies = ref()

    const company = ref({
        name: '',
        hq: '',
        url: '',
        email: ''
    })

    const selectedCompany = ref()

    const currentStep = ref(0)

    const stepper = ref([
        { label: 'Tell us about the job', active: true, complete: false },
        { label: 'Tell us about your company', active: false, complete: false },
        { label: 'Preview Listing', active: false, complete: false },
        { label: 'Payment & Post', active: false, complete: false },
    ])

    function setStepperClass(step) {
        if(step.active) {
            return 'bg-sky-500'
        }
        if(step.complete) {
            return 'bg-lime-500'
        }
        if(!step.active) {
            return 'bg-gray-300'
        }
    }

    function incrementStep() {
        if(currentStep.value < stepper.value.length - 1) {
            
            stepper.value[currentStep.value].complete = true
            currentStep.value += 1
        }
        stepper.value.forEach( (v, i) => {
            v.active = false
        })
        stepper.value[currentStep.value].active = true
    }

    function decrementStep() {
        if(currentStep.value > 0) {
            currentStep.value -= 1
        }
        stepper.value.forEach( (v, i) => {
            v.active = false
        })
        stepper.value[currentStep.value].active = true
    }

    const tempListing = ref()


    async function addTempListing() {

        const { data } = await axios.post(`${store.state.api_url_base}/api/addtemplisting`, job.value )
        tempListing.value = data
        console.log(data)

    }

    async function getCompanies() {

        const { data } = await axios.get(`${store.state.api_url_base}/api/companies/${user.uuid}`)
        companies.value = data
    }

    function updateSelectedCompany($event) {
        console.log($event.target.value)

        const p = companies.value.find(v => {
            return v.id === Number($event.target.value)
        })
        company.value = p
    }

    function addSelectedCompany() {

    }

    getCompanies()


</script>

<template>
    <MainContentArea>
        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="mb-6">

                <div class="flex justify-between bg-white p-4 mb-6 rounded-lg shadow-md sticky top-0 z-10">
                    
                    <div
                        v-for="(step, index) in stepper"
                        :key="step.label"
                        class="flex items-center gap-3">

                        <div
                            class="h-10 w-10 rounded-full text-white text-lg flex items-center justify-center"
                            :class="setStepperClass(step)">
                            <h2 v-if="!step.complete">{{ index + 1 }}</h2>
                            <h2 v-else class="flex items-center justify-center">
                                <span class="material-symbols-outlined">done</span>
                            </h2>
                        </div>
                        <p
                            class="font-semibold"
                            :class="{
                                'text-lg text-gray-700' : step.active,
                                'text-gray-300' : !step.active
                            }"
                        >
                            {{ step.label }}
                        </p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-md flex-1">

                    <form @submit.prevent v-if="currentStep === 0">

                        <div class="mb-4">
                            <Label for="title" helpText="e.g. Web Developer III, or Sales Associate." value="Job Title" />
                            <TextInput v-model="job.title" @update:modelValue="job.title = $event" />
                        </div>

                        <div class="flex gap-5">

                            <div class="mb-4 w-1/2">
                                <Label for="category" helpText="Choose the job category." value="Category" />
                                <TextInput v-model="job.category" />
                            </div>

                            <div class="mb-4 w-1/2">
                                <Label for="title" helpText="The url to your application, or an email address." value="Application Link or Email" />
                                <TextInput v-model="job.apply_link" @update:modelValue="job.apply_link = $event" />
                            </div>

                        </div>

                        <div class="flex gap-5 mb-8">

                            <div class="w-1/2">
                                <Label for="job_type" helpText="Full-time, Part-time, Contract" value="Job Type" />
                                <Select v-model="job.type" @update:modelValue="job.type = $event">
                                    <option value="ft">Full Time</option>
                                    <option value="pt">Part Time</option>
                                    <option value="c">Contract</option>
                                </Select>
                            </div>
                        </div>
                        
                        <div class="mb-4 text-gray-700">
                            <Label for="title" value="Job Description" helpText="Make sure to include at least a detailed job summary, and required/preferred skills." />
                            <div class="p-6 border border-gray-300" id="editor" v-html="job.description"></div>

                            <div class="flex gap-2">
                                <button @click.prevent="incrementStep" class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Company</button>
                            </div>

                        </div>
                    </form>

                    <form @submit.prevent v-if="currentStep === 1">

                        <div class="mb-8">

                            <Label helpText="Select a company from the list, or create a new one in the form below." value="Choose a company" />

                            <select
                                class="bg-gray-50 border border-gray-300 shadow-sm w-1/3 text-gray-700"
                                @change="updateSelectedCompany">
                                <option value="">Select a Company</option>
                                <option
                                    v-for="company in companies"
                                    :key="company.id"
                                    :value="company.id">
                                    {{ company.name }}
                                </option>
                            </select>
                        </div>


                        <div class="mb-4">
                            <Label for="title" helpText="Company name as you would like it to appear." value="Company Name" />
                            <TextInput v-model="company.name" />
                        </div>

                        <div class="mb-4 flex gap-5">

                            <div class="w-1/2">
                                <Label for="title" helpText="e.g. 1600 Pennsylvania Ave." value="Street Address" />
                                <TextInput v-model="company.address" />
                            </div>
                            <div class="flex-1">
                                <Label for="title" helpText="e.g. Washington, DC." value="City" />
                                <TextInput v-model="company.city" />
                            </div>
                            <div>
                                <Label for="title" helpText="e.g. Washington, DC." value="State" />
                                <TextInput v-model="company.state" />
                            </div>
                        </div>
                        

                        <div class="flex gap-5">
                            <div class="w-1/2">
                                <Label for="title" helpText="https://www.example.com" value="Company Website URL" />
                                <TextInput v-model="company.url" />
                            </div>
                            <div class="w-1/2">
                                <Label for="title" helpText="The email address where we can send you your reciept" value="Email" />
                                <TextInput v-model="company.email" />
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <button @click.prevent="decrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</button>
                            <button @click.prevent="incrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Listing Preview</button>
                        </div>
                    </form>

                    <form @submit.prevent="addTempListing" v-if="currentStep === 2">
                        <div class="flex items-start gap-5">
                            
                            <div class="w-2/3 text-gray-700">
                                <h2 class="text-3xl font-semibold">{{ job.title }}</h2>
                                <p>
                                    <span class="font-semibold">Job Type:</span>
                                    {{ job.type === 'ft' ? 'Full Time' : 'Part Time' }}
                                </p>
                                <div class="mt-10" v-html="job.description"></div>
                            </div>

                            <div class="flex-1 text-gray-700 shadow-md p-4 sticky top-28 self-start">

                                <div class="flex gap-3 mb-2">
                                    <img class="w-16" :src="`${store.state.api_url_base}/${company.logo}`" />
                                    <h3 class="text-xl font-semibold">{{ company.name }}</h3>
                                </div>

                                <p class="text-sm">{{ company.address }}</p>

                                <div class="p-4">
                                    <ul>
                                        <li>
                                            <router-link class="text-sky-500 font-semibold" :to="`/company/${company.uuid}/${company.slug}`">Company Profile &amp; All listings</router-link>
                                            
                                        </li>
                                        <li>
                                            <a target="_blank" class="text-sky-500 font-semibold" :href="company.url">Company Website</a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="text-center mt-6">
                                    <button disabled class="bg-rose-400 text-white py-2 px-6 rounded-md">Applyfor this Job</button>
                                </div>

                            </div>
                            

                            
                        </div>


                            
                        
                        <div class="flex gap-2">
                            <button @click.prevent="decrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</button>
                            <a
                                @click.prevent="addTempListing"
                                href="https://buy.stripe.com/test_8wM041fpEbUZ8b6bII"
                                class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">
                                Continue to Payment
                            </a>
                        </div>
                    </form>
                </div>

            </div>

        </Container>
    </MainContentArea>

    

</template>