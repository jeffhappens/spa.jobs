<script setup>
    import { ref, computed, defineEmits } from 'vue'
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
        industry_id: '',
        description: ''
    })
    const companyLogo = ref(null)

    const serverOptions = {
        url: 'http://localhost:8000',
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
        let { data } = await axios.get('http://localhost:8000/api/industries')
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
            await axios.post('http://localhost:8000/api/company/add', {
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


                <section class="flex-1">

                    <form @submit.prevent="addCompany" class="py-4 px-6 bg-white rounded-lg shadow-sm">
                        
                        <div class="mb-4">
                            <FormLabel value="Company Name" for="company_name" />
                            <TextInput name="company_name" v-model="company.name" @update:modelValue="company.name = $event" />
                        </div>

                        <div class="mb-4">
                            <FormLabel value="Company Address" for="company_address" />
                            <TextInput name="company_address" v-model="company.address" @update:modelValue="company.address = $event" />
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
