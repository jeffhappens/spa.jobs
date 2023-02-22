<script setup>
    import { ref } from 'vue'
    import FormLabel from '../components/form/Label.vue'
    import TextInput from '../components/form/TextInput.vue'
    import Select from '../components/form/Select.vue'
    import FileInput from '../components/form/FileInput.vue'

    const user = JSON.parse(localStorage.getItem('user'))
    let industries = ref({})

    async function getIndustries() {
        let { data } = await axios.get('http://localhost:8000/api/industries')
        industries.value = data
    }
    
    getIndustries()

    const file = ref(null)

    function updateLogoFile() {
        const f = document.getElementById('logo').files[0]
        file.value = f
        company.logo = f.name
    }

    async function addCompany() {

        try {

            // add company
            await axios.post('http://localhost:8000/api/company/add', company.value)
            // upload logo
            const formData = new FormData();
            formData.append('file', file)
            await axios.post('http://localhost:8000/api/company/logo/add', formData)




        } catch(error) {

        }

    }

    const company = ref({
        user_id: user.uuid,
        name: '',
        address: '',
        industry_id: '',
        logo: ''
    })


</script>
<template>

    <main class="flex justify-center items-start bg-gray-100 bg">
        <div class="rounded-lg w-3/4 mx-auto">
            <div class="my-8 flex justify-between">
                <h2 class="text-4xl text-gray-800 font-semibold">Add New Company</h2>
                <!-- <div class="mb-4">
                    <router-link to="/account/companies/add" class="text-white bg-[color:var(--p-blue-md)] p-2">Add New Company</router-link>
                </div> -->
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

                    <form @submit.prevent="addCompany" class="py-4 px-6 bg-white">

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
                            <FormLabel value="Logo" for="logo" />
                            <FileInput
                                id="logo"
                                name="logo"
                                ref="logo"
                                v-model="company.logo"
                                @change="updateLogoFile"
                                @update:modelValue="company.logo = $event"
                            />
                        </div>

                        <div class="mb-4">
                            <button class="mt-4 p-2 bg-[color:var(--p-blue-md)] text-white">Add Company</button>
                        </div>

                    </form>

                </section>
            </div>
        </div>
    </main>
    
</template>