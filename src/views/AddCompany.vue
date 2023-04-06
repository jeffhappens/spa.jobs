<script setup>
    import { ref, computed, defineEmits } from 'vue'
    import { useStore } from 'vuex'
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'


    import { useRouter, useRoute } from 'vue-router'
    import toast from 'vue3-toastify'
    import Cookies from 'js-cookie'
    import AddEditCompany from '../components/form/AddEditCompany.vue'

    import vueFilePond from 'vue-filepond'
    import 'filepond/dist/filepond.min.css'
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"


    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const emit = defineEmits('company:added')
    const states = ref()

    const user = JSON.parse(localStorage.getItem('user'))

    const company = ref({
        author: user.uuid,
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        url: '',
        industry_id: '',
        description: '...'
    })

    /**
     * Sends a POST request to the API to add a new company with the company name and logo values in the company and companyLogo variables, respectively. If the request is successful, emits a 'company:added' event and navigates back to the previous page. If the request fails, does nothing (the error is handled by the catch block).
     *
     * @async
     * @function addCompany
     * @throws {Error}
     * @returns {void}
     */
    async function addCompany(data) {
        console.log(data)
        try {
            await axios.post(`${store.state.api_url_base}/api/company/add`, {
                company: data[0],
                logo: data[1].folder
            })
            emit('company:added')
            router.back()
        } catch(error) {
            //
        }
    }
</script>
<template>
    <MainContentArea>
        <PageHeading text="Add New Company" />
        <Container>
            <div class="flex items-start gap-5">
                <SidebarAccount />
                <section class="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <AddEditCompany :company="company" @companyAdded="addCompany" />
                </section>
            </div>
        </Container>
    </MainContentArea>
</template>
