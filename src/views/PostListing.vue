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
    import '@vueup/vue-quill/dist/vue-quill.bubble.css';

    const job = ref({
        company_id: '',
        title: '',
        category: '',
        skills: [],
        apply_link: '',
        type: '',
        description: '',
    })

    const skillTags = ref([])

    function addSkillTag($event) {

        console.log($event)
        skillTags.value.push($event.target.value)
        $event.target.value = ''


    }

    

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

    function removeSkillTag($event) {
        const text = $event.target.innerText
        const index = skillTags.value.indexOf(text)
        skillTags.value.splice(index, 1)

    }
</script>

<template>
    <MainContentArea>
        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="flex items-start gap-5 mb-6">

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
                                

                                <TextInput
                                    @keyup.enter="addSkillTag($event)"
                                />
                                <p class="flex flex-wrap gap-1 my-2">
                                    <Tag
                                        v-for="skill in skillTags"
                                        @remove:skillTag="removeSkillTag"
                                        :key="skill">
                                        {{ skill }}
                                    </Tag>
                                </p>
                            </div>
                        </div>

                        <div class="flex gap-5">

                            <div class="mb-4 w-1/2">
                                <Label for="title" helpText="The url to your application, or an email address." value="Application Link or Email" />
                                <TextInput v-model="job.apply_link" @update:modelValue="job.apply_link = $event" />
                            </div>

                            <div class="mb-4 w-1/2">
                                <Label for="job_type" helpText="Full-time, Part-time, Contract" value="Job Type" />
                                <TextInput v-model="job.type" @update:modelValue="job.type = $event" />
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
                        <div class="flex gap-5 mb-4">
                            <div class="w-1/2">
                                <Label for="title" value="Company Name" />
                                <TextInput v-model="company.name" />
                            </div>
                            <div class="w-1/2">
                                <Label for="title" value="Company HQ" />
                                <TextInput v-model="company.hq" />
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

                    <form v-if="currentStep === 2">
                        <div class="flex gap-2">
                            <button @click.prevent="decrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</button>
                            <button @click.prevent="incrementStep" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Payment</button>
                        </div>
                    </form>
                </div>

                <div class="flex flex-col justify-between bg-white p-6 rounded-lg shadow-md w-1/3 h-96">
                    
                    <div
                        v-for="(step, index) in stepper"
                        :key="step.label"
                        class="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-b-0">

                        <div
                            class="h-14 w-14 rounded-full text-white text-2xl flex items-center justify-center"
                            :class="{
                                'bg-sky-500' : step.active,
                                'bg-lime-500' : step.complete,
                                'bg-gray-300' : !step.complete
                            }">
                            <h2 v-if="!step.complete">{{ index + 1 }}</h2>
                            <h2 v-else class="flex items-center justify-center">
                                <span class="material-symbols-outlined">done</span>
                            </h2>
                        </div>
                        <p
                            class="font-semibold"
                            :class="{
                                'text-xl text-gray-700' : step.active,
                                'text-gray-400' : !step.active
                            }"
                        >
                            {{ step.label }}
                        </p>
                    </div>
                </div>
            </div>

        </Container>
    </MainContentArea>

    

</template>