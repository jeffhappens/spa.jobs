<script setup>
    import { ref, defineEmits } from 'vue'
    import { useRoute, useRouter  } from 'vue-router';

    import Cookies from 'js-cookie'
    
    import Label from '../components/form/Label.vue';
    import TextInput from '../components/form/TextInput.vue';
    import Select from '../components/form/Select.vue'
    
    import vueFilePond from 'vue-filepond'
    import 'filepond/dist/filepond.min.css'
    
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"


    const host = 'http://localhost:8000'
    const apihost = host + '/api'
    
    const user = JSON.parse(localStorage.getItem('user'))
    const router = useRouter()
    const route = useRoute()
    const emit = defineEmits('company:updated')

    let industries = ref({})
    async function getIndustries() {
        let { data } = await axios.get(`${apihost}/industries`)
        industries.value = data
    }

    const company = ref({})
    let newLogo = ref(null)

    const buttonText = ref('Update Company')

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    )

    async function handleProcessFile(e, file) {

        const {data} = await axios.get(`${apihost}/logo/${file.serverId}`)
        console.log(data)
        newLogo.value = `tmp/${data.folder}/${data.file}`
    }
    function handleUpdateFiles() {
        newLogo.value = null
    }

    const serverOptions = {
        url: apihost,
        process: {
            url: '/company/logo/add',
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
            },
            withCredentials: true
        }
    }

    async function getCompany() {
        const { data } = await axios.get(`${apihost}/companies/edit/${route.params.id}`)
        
        company.value = data
    }

    async function updateCompany() {
        try {
            // Add Company Http
            await axios.post(`${apihost}/company/update`, {
                company: company.value,
                logo: newLogo.value
            })
            emit('company:updated')
            router.push({ path: '/account/companies' })
            


        } catch(error) {
            //
        }
    }
    getIndustries()
    getCompany()

</script>
<template>
    <main class="flex justify-center items-start bg-gray-100 bg">
        <div class="rounded-lg w-3/4 mx-auto">
            <div class="my-8 flex justify-between">
                <h2 class="text-4xl text-gray-800 font-semibold">Edit Company</h2>
            </div>

            <div class="flex items-start gap-5">
                <aside class="w-1/3">
                    <div class="bg-white p-4 mb-6 w-full shadow-md text-gray-800 flex gap-4">
                        <div>
                            <img class="inline-block h-16 w-16 rounded-full ring-2 ring-gray-300" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                        </div>
                        
                        <ul class="flex-1">
                            <li class="text-xl font-semibold">{{ user.name }}</li>
                            <li class="font-semibold mb-1">{{ user.email }}</li>
                            <li class="text-sm">Joined on: {{ new Intl.DateTimeFormat('en-US').format( new Date(user.created_at) ) }}</li>
                        </ul>
                        <div>
                            <span class="cursor-pointer material-symbols-outlined">edit</span>
                        </div>
                    </div>

                    <div class="bg-white w-full shadow-md text-gray-800">
                        <ul class="p-2">
                            <li class="px-4 py-2 flex items-center justify-between border-b border-gray-200">
                                <router-link to="/account" class="font-semibold">Account Details</router-link>
                                <span class="material-symbols-outlined">chevron_right</span>
                            </li>
                            <li class="px-4 py-2 px-4 py-2 flex items-center justify-between">
                                <router-link to="/account/companies" class="font-semibold">Companies</router-link>
                                <span class="material-symbols-outlined">chevron_right</span>
                            </li>
                        </ul>
                    </div>
                </aside>

                <section class="flex-1">

                    <form @submit.prevent="updateCompany">
                        <div class="mb-4">
                            <Label for="name" value="Company Name" />
                            <TextInput name="name" v-model="company.name" @update:modelValue="$event = company.name" />
                        </div>

                        <div class="mb-4">
                            <Label for="address" value="Company Address" />
                            <TextInput name="address" v-model="company.address" @update:modelValue="$event = company.address" />
                        </div>

                        <div class="mb-4">
                            <Label value="Industry" for="company_industry" />
                            <Select
                                class="w-full"
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
                            <Label value="Logo" for="logo" />

                            <div class="flex items-center gap-5">
                                <div class="w-32">
                                    <img v-if="newLogo" :src="`${host}/${newLogo}`" />
                                    <img v-else :src="`${host}/${company.logo}`" />
                                </div>


                                <FilePond
                                    class="flex-1"
                                    :server="serverOptions"
                                    :allowImageCrop="true"
                                    imagePreviewHeight="200"
                                    image-crop-aspect-ratio="1:1"
                                    acceptedFileTypes="image/jpeg, image/png"
                                    @addfilestart="handleAddFileStart"
                                    @processfile="handleProcessFile"
                                    @removefile="handleUpdateFiles"

                                />
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


                </section>
            </div>
        </div>
    </main>
</template>