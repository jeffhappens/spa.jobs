<script setup>
    import { ref, defineEmits } from 'vue'
    import { useRoute, useRouter  } from 'vue-router';
    import { useStore  } from 'vuex';
    import Cookies from 'js-cookie'
    
    import MainContentArea from '../components/MainContentArea.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Container from '../components/Container.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'
    import AddEditCompany from '../components/form/AddEditCompany.vue'
    
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const emit = defineEmits('company:updated')

    const user = JSON.parse(localStorage.getItem('user'))

    let newLogo = ref(null)
    const company = ref({})

    async function getCompany() {
        const { data } = await axios.get(`${store.state.api_url_base}/api/companies/edit/${route.params.id}`)
        company.value = data
    }
    getCompany()

    async function updateCompany(data) {

        console.log(data)
        
        try {
            // Add Company Http
            await axios.post(`${store.state.api_url_base}/api/company/update`, {
                company: data[0],
                logo: data[1].folder
            })
            emit('company:updated')
            router.push({ path: '/account/companies' })

        } catch(error) {
            //
        }
    }
</script>
<template>
    <MainContentArea>
        <PageHeading text="Edit Company" />
        <Container>
            <div class="flex items-start gap-5">
                <SidebarAccount />
                <section class="flex-1 bg-white p-6 rounded-lg shadow-lg">
                    <AddEditCompany :company="company" @companyUpdated="updateCompany" />
                </section>
            </div>
        </Container>
    </MainContentArea>
</template>
