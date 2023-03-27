<script setup>
    import { ref, onMounted } from 'vue'
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

    let newLogo = ref(null)

    async function handleProcessFile(e, file) {
        const {data} = await axios.get(`${store.state.api_url_base}/api/logo/${file.serverId}`)

        store.dispatch('set_company_logo', `tmp/${data.folder}/${data.file}`)
        
        console.log(data)
        newLogo.value = `tmp/${data.folder}/${data.file}`
    }

    function handleUpdateFiles() {
        newLogo.value = null
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

    const companies = ref()

    const company = ref({
        name: '',
        hq: '',
        url: '',
        email: ''
    })

    function updateSelectedCompany($event) {
        const p = companies.value.find(v => {
            return v.id === Number($event.target.value)
        })
        company.value = p
    }

    if ( Object.keys(store.state.job_listing).length ) {
        company.value = store.state.job_listing.company

    }

    async function setCompany() {

        await store.dispatch('set_company', company.value)
        router.push({ name: 'post-preview' })
    }

    async function getCompanies() {

        const { data } = await axios.get(`${store.state.api_url_base}/api/companies/${user.uuid}`)
        companies.value = data
    }
    getCompanies()

    async function updateTempListing() {
        const { data } = await axios.post(`${store.state.api_url_base}/api/updatetemplisting`, {
            uuid: user.uuid,
            company_id: company.value.id
        })
        router.push({ name: 'post-preview' })
    }
</script>



<template>

    <MainContentArea>
        <PageHeading text="Post a Job Listing" />

        <Container>

            <div class="mb-6">
                <Stepper />

                <div class="bg-white p-6 rounded-lg shadow-md flex-1">

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
                        

                        <div class="flex gap-5 mb-4">
                            <div class="w-1/2">
                                <Label for="title" helpText="The email address where we can send you your reciept" value="Email" />
                                <TextInput v-model="company.email" />
                            </div>

                            <div class="w-1/2">
                                <Label for="title" helpText="https://www.example.com" value="Company Website URL" />
                                <TextInput v-model="company.url" />
                            </div>

                        </div>

                        <!-- -->
                        <div class="mb-4">
                            <Label value="Company Logo" for="logo" />

                            <div class="flex items-center gap-5">
                                <div class="w-32" v-if="store.state.job_listing.company.logo">
                                    <img class="rounded-md" :src="`${store.state.api_url_base}/${store.state.job_listing.company.logo}`" />
                                </div>


                                <FilePond
                                    class="flex-1"
                                    :server="serverOptions"
                                    :allowImageCrop="true"
                                    imagePreviewHeight="200"
                                    image-crop-aspect-ratio="1:1"
                                    acceptedFileTypes="image/jpeg, image/png"
                                    @processfile="handleProcessFile"
                                    @removefile="handleUpdateFiles"

                                />
                            </div>

                        </div>

                        <div class="flex gap-2">
                            <router-link :to="{ name: 'post-job-details' }" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-amber-400">Previous</router-link>
                            <button @click="setCompany" class="mt-6 px-4 py-2 text-white font-semibold rounded-md bg-sky-400">Continue to Listing Preview</button>
                        </div>

                </div>


            </div>
        </Container>
    </MainContentArea>
    
</template>