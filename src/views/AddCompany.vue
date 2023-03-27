<script setup>
    import { ref, computed, defineEmits } from 'vue'
    import { useStore } from 'vuex'
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'


    import { useRouter } from 'vue-router'
    import toast from 'vue3-toastify'
    import Cookies from 'js-cookie'
    import FormLabel from '../components/form/Label.vue'
    import TextInput from '../components/form/TextInput.vue'
    import Select from '../components/form/Select.vue'
    import vueFilePond from 'vue-filepond'
    import 'filepond/dist/filepond.min.css'
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"


    const router = useRouter();
    const store = useStore()
    const emit = defineEmits('company:added')

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    )

    const fileUploading = ref(false)

    const user = JSON.parse(localStorage.getItem('user'))

    const formDisabled = computed( () => {
        // Disable the form if any required fields are missing OR a file is in the process of uploading
        return fileUploading.value || !(company.value.name && company.value.address && company.value.industry_id && company.value.description)
    })

    const company = ref({
        user_id: user.uuid,
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        url: '',
        industry_id: '',
        description: ''
    })
    const companyLogo = ref(null)

    const serverOptions = {
        url: store.state.api_url_base,
        process: {
            url: '/api/company/logo/add',
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            withCredentials: true
        }
    }

    let industries = ref({})

    const buttonText = ref('Add Company')

    async function getIndustries() {
        let { data } = await axios.get(`${store.state.api_url_base}/api/industries`)
        industries.value = data
    }
    
    function handleProcessFile(e, file) {
        // console.log(file.serverId.split('/'))
        companyLogo.value = file.serverId.split('/')
        fileUploading.value = false
        buttonText.value = 'Add Company'
    }

    function handleAddFileStart() {
        fileUploading.value = true
        buttonText.value = 'File Uploading...'
    }

    async function addCompany() {
        try {
            // Add Company Http
            await axios.post(`${store.state.api_url_base}/api/company/add`, {
                company: company.value,
                logo: companyLogo.value
            })
            emit('company:added')

            router.push({ path: '/account/companies' })
            


        } catch(error) {
            //
        }
    }

    getIndustries()
    
</script>
<template>

    <MainContentArea>
        <PageHeading text="Add New Company" />
        <Container>

            <div class="flex items-start gap-5">

                <SidebarAccount />


                <section class="flex-1 bg-white p-6 rounded-lg shadow-lg">

                    <form @submit.prevent="addCompany">
                        
                        <div class="mb-4">
                            <FormLabel value="Company Name" for="company_name" />
                            <TextInput name="company_name" v-model="company.name" @update:modelValue="company.name = $event" />
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Company Address" for="company_address" />
                            <TextInput name="company_address" v-model="company.address" @update:modelValue="company.address = $event" />
                        </div>

                        <div class="flex gap-5">
                            <div class="mb-4 w-1/2">
                                <FormLabel value="City" for="company_city" />
                                <TextInput name="company_city" v-model="company.city" @update:modelValue="company.city = $event" />
                            </div>
                            <div class="mb-4 w-1/4">
                                <FormLabel value="State" for="company_state" />
                                <TextInput name="company_state" v-model="company.state" @update:modelValue="company.state = $event" />
                            </div>
                            <div class="mb-4 w-1/4">
                                <FormLabel value="Zip Code" for="company_zip" />
                                <TextInput name="company_zip" v-model="company.zip" @update:modelValue="company.zip = $event" />
                            </div>
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Email" for="company_email" />
                            <TextInput name="company_email" v-model="company.email" @update:modelValue="company.email = $event" />
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Company URL" for="company_url" />
                            <TextInput name="company_url" v-model="company.url" @update:modelValue="company.url = $event" />
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Industry" for="company_industry" />
                            <Select
                                name="company_industry"
                                v-model="company.industry_id"
                                @update:modelValue="company.industry_id = $event">

                                <option value="">Select an industry</option>
                                <option
                                    v-for="industry in industries"
                                    :key="industry.id"
                                    :value="industry.id">
                                    {{ industry.label }}
                                </option>
                            </Select>
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Description" for="description" />
                            <textarea v-model="company.description" class="w-full border border-gray-300 shadow-sm h-36 text-gray-700" name="description"></textarea>
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Logo" for="logo" />
                            <FilePond
                                :server="serverOptions"
                                :allowImageCrop="true"
                                imagePreviewHeight="200"
                                image-crop-aspect-ratio="1:1"
                                acceptedFileTypes="image/jpeg, image/png"
                                @addfilestart="handleAddFileStart"
                                @processfile="handleProcessFile"

                            />

                        </div>

                        <div class="mb-4">
                            <button
                                :disabled="formDisabled"
                                type="submit"
                                class="mt-4 p-2 bg-[color:var(--p-blue-md)] text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {{ buttonText }}
                            </button>
                        </div>
                    </form>

                </section>
            </div>
        </Container>
    </MainContentArea>
    
</template>
