<script setup>
    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    import Cookies from 'js-cookie'

    import vueFilePond from 'vue-filepond'
    import 'filepond/dist/filepond.min.css'
    
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"

    import MainContentArea from "#/MainContentArea.vue";
    import PageHeading from '#/PageHeading.vue'
    import Container from '#/Container.vue'
    import Stepper from '#/form/Stepper.vue'
    import Label from '#/form/Label.vue'
    import Select from '#/form/Select.vue'
    import TextInput from '#/form/TextInput.vue'

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    )

    const router = useRouter()
    const store = useStore()
    const user = JSON.parse(localStorage.getItem('user'))

    async function handleProcessFile(e, file) {
        const {data} = await axios.get(`${store.state.api_url_base}/api/logo/${file.serverId}`)
        updateState('logo', `tmp/${data.folder}/${data.file}`)
    }

    const serverOptions = {
        url: `${store.state.api_url_base}/api`,
        process: {
            url: '/company/logo/add',
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            withCredentials: true
        }
    }

    const states = ref()
    const industries = ref()
    const companies = ref()

    async function getStates() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/states`)
        states.value = data
    }
    getStates()

    async function getIndustries() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/industries`)
        industries.value = data
    }
    getIndustries()


    function updateState(field, value) {
        store.dispatch('SET_COMPANY_VALUE', { field, value })
    }
    updateState('author', user.uuid)
</script>



<template>

    <MainContentArea>
        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="mb-6">
                <Stepper />

                <div class="bg-white p-6 rounded-lg shadow-md flex-1">

                    <div class="mb-4">
                        <Label
                                for="title"
                                helpText="Company name as you would like it to appear."
                                value="Company Name" />

                            <TextInput
                                v-model="store.state.listing.company.name"
                                @update:modelValue="updateState('name', $event)"
                            />
                        </div>

                        <div class="mb-4">
                            <Label
                                for="title"
                                helpText="Selecting an industry will help job seekers find your listing."
                                value="Industry" />

                            <Select
                                v-model="store.state.listing.company.industry_id"
                                @update:modelValue="updateState('industry_id', $event)">
                                <option value="">Select an Industry</option>

                                <option
                                    v-for="industry in industries"
                                    :key="industry.id"
                                    :value="industry.id">
                                    {{ industry.label }}
                                </option>
                            </Select>


                        </div>

                        <div class="mb-4 flex gap-5">

                            <div class="w-1/2">
                                <Label
                                    for="title"
                                    helpText=""
                                    value="Street Address" />

                                <TextInput
                                    v-model="store.state.listing.company.address"
                                    @update:modelValue="updateState('address', $event)"

                                />
                            </div>

                            <div class="w-1/4">
                                <Label
                                    for="title"
                                    helpText=""
                                    value="City" />

                                <TextInput
                                    v-model="store.state.listing.company.city"
                                    @update:modelValue="updateState('city', $event)"
                                />
                            </div>

                            <div class="w-1/6">
                                <Label
                                    for="title"
                                    helpText=""
                                    value="State" />

                                <Select
                                    class="bg-gray-50 border border-gray-300 shadow-sm w-full text-gray-700"
                                    v-model="store.state.listing.company.state"
                                    @update:modelValue="updateState('state', $event)"
                                >
                                    <option
                                        v-for="state in states"
                                        :key="state.id"
                                        :value="state.abbr">
                                        {{ state.abbr }}
                                    </option>
                                </Select>
                            </div>
                            <div class="w-1/6">
                                <Label
                                    for="title"
                                    helpText=""
                                    value="Zip Code" />

                                <TextInput
                                    v-model="store.state.listing.company.zip"
                                    @update:modelValue="updateState('zip', $event)"
                                />
                            </div>
                        </div>
                        

                        <div class="flex gap-5 mb-4">

                            <div class="w-1/2">
                                <Label
                                    for="title"
                                    helpText="The email address where we can send you your reciept"
                                    value="Email" />

                                <TextInput
                                    v-model="store.state.listing.company.email"
                                    @update:modelValue="updateState('email', $event)" />

                            </div>

                            <div class="w-1/2">
                                <Label
                                    for="title"
                                    helpText="https://www.example.com"
                                    value="Company Website URL" />

                                <TextInput
                                    v-model="store.state.listing.company.url"
                                    @update:modelValue="updateState('url', $event)" />
                            </div>

                        </div>

                        <div class="mb-4">
                            <Label
                                for="description"
                                helpText="Tell job seekers a little bit about your company and what it's like to work there."
                                value="Company Summary" />
                            <textarea v-model="store.state.listing.company.description" class="text-gray-600 border border-gray-300 w-full h-36"></textarea>
                        </div>

                        <div class="mb-4">
                            <Label
                                for="logo"
                                value="Company Logo" />

                            <div class="flex items-center gap-5">

                                <div class="w-32" v-if="store.state.listing.company?.logo">
                                    <img class="rounded-md" :src="`${store.state.api_url_base}/${store.state.listing.company.logo}`" />
                                </div>


                                <FilePond
                                    class="flex-1"
                                    :server="serverOptions"
                                    :allowImageCrop="true"
                                    imagePreviewHeight="200"
                                    image-crop-aspect-ratio="1:1"
                                    acceptedFileTypes="image/jpeg, image/png"
                                    @processfile="handleProcessFile" />
                            </div>

                        </div>

                        <div class="flex gap-2">
                            <router-link :to="{ name: 'post-job-details' }" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</router-link>
                            <router-link :to="{ name: 'post-preview' }" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Listing Preview</router-link>
                        </div>

                </div>


            </div>
        </Container>
    </MainContentArea>
    
</template>