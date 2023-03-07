<script setup>
    import { ref } from 'vue'
    import MainContentArea from "../components/MainContentArea.vue";
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    import Label from '../components/form/Label.vue'
    import Select from '../components/form/Select.vue'
    import TextInput from '../components/form/TextInput.vue'
    import Tag from '../components/Tag.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css'

    const user = JSON.parse(localStorage.getItem('user'))

    const skillTags = ref([])

    const job = ref({
        company_id: '',
        title: '',
        category: '',
        skills: [],
        apply_link: '',
        type: '',
        description: '',
    })

    function addSkillTag($event) {

        skillTags.value.push($event.target.value)
        job.value.skills.push($event.target.value)
        $event.target.value = ''
    }

    function removeSkillTag($event) {
        const text = $event.target.parentNode.children[0].innerText
        const index = skillTags.value.indexOf(text)
        skillTags.value.splice(index, 1)

    }

    function popSkillTag($event) {
        if(!$event.target.value) {
            skillTags.value.pop()
        }
        console.log($event.target.value)
    }

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

        const { data } = await axios.post('http://localhost:8000/api/addtemplisting', job.value )
        tempListing.value = data
        console.log(data)

    }

    async function getCompanies() {

        const { data } = await axios.get(`http://localhost:8000/api/companies/${user.uuid}`)
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

                    <form v-if="currentStep === 0">

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
                                <Label for="skills" helpText="Type a skill and press enter to add it." value="Required Skills" />

                                <div class="flex flex-wrap border border-gray-300 bg-gray-50 shadow-sm px-2 py-1">

                                    <div class="flex flex-wrap items-start justify-start gap-1">
                                        <div
                                            class="flex bg-[color:var(--p-orange)] text-white p-1 rounded-sm mr-1"
                                            v-for="skill in skillTags"
                                            @remove:skillTag="removeSkillTag"
                                            :key="skill">
                                            <span class="mr-1">{{ skill }}</span>
                                            <span @click="removeSkillTag($event)" class="cursor-pointer material-symbols-outlined" style="font-size: 12px; font-weight: bold;">close</span>
                                        </div>
                                    </div>
                                    <input 
                                        type="text"
                                        @keyup.enter="addSkillTag($event)"
                                        @keydown.delete="popSkillTag($event)"
                                        class="p-0 m-0 border-0 w-1/4 focus:ring-0 bg-gray-50 text-gray-900 h-8" />
                                    <!-- <TextInput @keyup.enter="addSkillTag($event)" class="border-0 p-0" /> -->
                                </div>

                            </div>
                        </div>

                        <div class="flex gap-5">

                            <div class="mb-4 w-1/2">
                                <Label for="title" helpText="The url to your application, or an email address." value="Application Link or Email" />
                                <TextInput v-model="job.apply_link" @update:modelValue="job.apply_link = $event" />
                            </div>

                            <div class="mb-4 w-1/2">
                                <Label for="job_type" helpText="Full-time, Part-time, Contract" value="Job Type" />
                                <Select @update:modelValue="job.type = $event">
                                    <option value="ft">Full Time</option>
                                    <option value="pt">Part Time</option>
                                    <option value="c">Contract</option>
                                </Select>
                            </div>
                        </div>
                        
                        <div class="mb-4 text-gray-700">
                            <Label for="title" value="Job Description" />
                            <div id="my-toolbar" class="flex gap-10">
                                <!-- Add buttons as you would before -->
                                <div>
                                    <button class="ql-bold"></button>
                                    <button class="ql-italic"></button>
                                    <button class="ql-underline"></button>
                                </div>
                                <div>
                                    <button class="ql-list" value="bullet"></button>
                                    <button class="ql-list" value="ordered"></button>
                                </div>
                                <div>
                                    <button class="ql-header" value="1"></button>
                                    <button class="ql-header" value="2"></button>

                                    <select class="ql-size">
                                        <option value="small"></option>
                                        <!-- Note a missing, thus falsy value, is used to reset to default -->
                                        <option selected></option>
                                        <option value="large"></option>
                                        <option value="huge"></option>
                                    </select>
                                </div>
                            </div>

                            <div class="text-xl h-48 bg-gray-100">
                                <QuillEditor toolbar="#my-toolbar" v-model:content="job.description" contentType="html"></QuillEditor>
                            </div>

                            <div class="flex gap-2">
                                <button @click.prevent="decrementStep" class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</button>
                                <button @click.prevent="incrementStep" class="my-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue</button>
                            </div>


                        </div>
                    </form>

                    <form v-if="currentStep === 1">

                        <div class="mb-8">

                            <Label helpText="Select a company from the list, or create a new one." value="Choose a company" />

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


                        <div class="flex gap-5">
                            <div class="w-1/2">
                                <Label for="title" value="Company Name" />
                                <TextInput v-model="company.name" />
                            </div>
                            <div class="w-1/2">
                                <Label for="title" value="Company HQ" />
                                <TextInput v-model="company.address" />
                            </div>
                        </div>

                        <div class="flex gap-5">
                            <div class="w-1/2">
                                <Label for="title" value="Company Website URL" />
                                <TextInput v-model="company.url" />
                            </div>
                            <div class="w-1/2">
                                <Label for="title" value="Email" />
                                <TextInput v-model="company.email" />
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <button @click.prevent="decrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</button>
                            <button @click.prevent="incrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue</button>
                        </div>
                    </form>

                    <form @submit.prevent="addTempListing" v-if="currentStep === 2">
                        <div v-if="tempListing">
                            {{ tempListing }}
                        </div>
                        <div class="flex gap-2">
                            <button @click.prevent="decrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</button>
                            <button class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Payment</button>
                        </div>
                    </form>
                </div>

            </div>

        </Container>
    </MainContentArea>

    

</template>