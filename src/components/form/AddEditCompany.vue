<script setup>
    
    import { ref, computed, defineEmits } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import Cookies from 'js-cookie'

    import MainContentArea from '#/MainContentArea.vue'
    import Container from '#/Container.vue'
    import PageHeading from '#/PageHeading.vue'
    import SidebarAccount from '#/SidebarAccount.vue'
    import FormLabel from '#/form/Label.vue'
    import TextInput from '#/form/TextInput.vue'
    import Select from '#/form/Select.vue'

    import vueFilePond from 'vue-filepond'
    import 'filepond/dist/filepond.min.css'
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"

    const route = useRoute()

    const emit = defineEmits([ 'companyAdded', 'companyUpdated' ])
    const props = defineProps(
        [ 'company' ]
    )

    let event

    if(route.name === 'edit-company') {
        event = 'companyUpdated'
    }
    if(route.name === 'add-company') {
        event = 'companyAdded'
    }



    
    const store = useStore()

    const fileUploading = ref(false)
    const states = ref()
    const buttonText = ref(route.name === 'add-company' ? 'Add Company' : 'Update Company')
    const companyLogo = ref({})


    const formDisabled = computed( () => {
        // Disable the form if any required fields are missing OR a file is in the process of uploading
        return fileUploading.value || !(props.company?.name && props.company?.address && props.company.industry_id && props.company.description)
    })

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    )
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




    /**
     * Retrieves a list of states by making a GET request to the states API endpoint and sets the value of the states variable to the response data.
     *
     * @async
     * @function getStates
     * @returns {Promise<void>} - This function does not return a value, but it sets the value of the states variable to the response data.
     *
     * @throws {Error} - If the API endpoint returns an error or if the axios library encounters an error while making the request.
     */
    async function getStates() {
        try {
            const { data } = await axios.get(`${store.state.api_url_base}/api/states`)
            states.value = data
        } catch(err) {
            console.log(err)
        }
    }
    getStates()
    
    
    
    
    
    let industries = ref({})
    /**
     * Retrieves a list of industries by making a GET request to the industries API endpoint and sets the value of the industries variable to the response data.
     *
     * @async
     * @function getIndustries
     * @returns {Promise<void>} - This function does not return a value, but it sets the value of the industries variable to the response data.
     *
     * @throws {Error} - If the API endpoint returns an error or if the axios library encounters an error while making the request.
     */
    async function getIndustries() {
        try {
            let { data } = await axios.get(`${store.state.api_url_base}/api/industries`)
            industries.value = data
        } catch(err) {
            console.log(err)
        }
    }
    getIndustries()
    
    
    
    
    
    /**
     * Handles a file upload by setting the value of the companyLogo variable to the server ID of the uploaded file, setting the value of the fileUploading variable to false, and setting the value of the buttonText variable to 'Add Company'.
     *
     * @function handleProcessFile
     * @param {Event} e - The file upload event.
     * @param {Object} file - The uploaded file object.
     * @returns {void} - This function does not return a value, but it updates the values of the companyLogo, fileUploading, and buttonText variables.
     */
    function handleProcessFile(e, file) {

        // companyLogo.value = file.serverId.split('/')
        companyLogo.value = JSON.parse(file.serverId)
        fileUploading.value = false
        buttonText.value = route.name === 'add-company' ? 'Add Company' : 'Update Company'
    }
    
    
    
    
    
    /**
     *
     * @function handleAddFileStart
     * @returns {void}
     */
    function handleAddFileStart() {
        fileUploading.value = true
        buttonText.value = 'File Uploading...'
    }
</script>

<template>

    <form @submit.prevent="emit(event, [company, companyLogo] )">
    
        
        <div class="mb-4">
            <FormLabel value="Company Name" for="company_name" />
            <TextInput name="company_name" type="text" v-model="company.name" @update:modelValue="company.name = $event" />
        </div>

        <div class="mb-4">
            <FormLabel value="Company Address" for="company_address" />
            <TextInput name="company_address" type="text" v-model="company.address" @update:modelValue="company.address = $event" />
        </div>

        <div class="flex gap-5">
            <div class="mb-4 w-1/2">
                <FormLabel value="City" for="company_city" />
                <TextInput name="company_city" type="text" v-model="company.city" @update:modelValue="company.city = $event" />
            </div>
            <div class="mb-4 w-1/4">
                <FormLabel value="State" for="company_state" />
                <Select v-model="company.state" class="" @update:modelValue="company.state = $event">
                    <option value="">Select a State</option>
                    <option v-for="state in states" :key="state.id" :value="state.abbr">
                        {{ state.abbr }}
                    </option>
                </Select>
            </div>
            <div class="mb-4 w-1/4">
                <FormLabel value="Zip Code" for="company_zip" />
                <TextInput name="company_zip" type="text" v-model="company.zip" @update:modelValue="company.zip = $event" />
            </div>
        </div>

        <div class="mb-4">
            <FormLabel value="Email" for="company_email" />
            <TextInput name="company_email" type="text" v-model="company.email" @update:modelValue="company.email = $event" />
        </div>

        <div class="mb-4">
            <FormLabel value="Company URL" for="company_url" />
            <TextInput name="company_url" type="text" v-model="company.url" @update:modelValue="company.url = $event" />
        </div>

        <div class="mb-4">
            <FormLabel value="Industry" :helpText="route.name === 'edit-company' ? 'Change this value with caution. It will also affect any current listings for this company.' : '' " for="company_industry" />
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

            <div class="flex gap-5">
                <div v-if="companyLogo?.filename" class="w-1/4 border border-gray-300">
                    <img :src="`${store.state.api_url_base}/tmp/${companyLogo.folder}/${companyLogo.filename}`" />
                </div>
                <div v-else class="w-1/4 border border-gray-300">
                    <img v-if="company.logo" :src="`${store.state.api_url_base}/${company.logo}`" />
                </div>

                <div class="flex-1">
                    
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
            </div>

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
    
</template>