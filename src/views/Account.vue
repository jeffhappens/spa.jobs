<script setup>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import { toast } from 'vue3-toastify'
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Label from '../components/form/Label.vue'
    import TextInput from '../components/form/TextInput.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'

    const store = useStore()
    const user = JSON.parse(localStorage.getItem('user'))
    
    const validationError = ref('')
    const currentPassword = ref('')
    const newPassword = ref('')

    const deletetext = ref('')
    const deleteButtonDisabled = computed( () => {
        return deletetext !== 'DELETE' 
    })

    const clearPasswordFields = () => {
        newPassword.value = ''
        currentPassword.value = ''
    }

    async function changePassword() {
        validationError.value = ''
        try {
            await axios.post(`${store.state.api_url_base}/api/change-password`, {
                'password' : currentPassword.value,
                'newPassword': newPassword.value
            })
            clearPasswordFields()
            toast('Your password has been updated.', { autoClose: 2000 })
        } catch(error) {
            validationError.value = error.response.data.message
        }
    }
</script>

<template>

    <MainContentArea>

        <PageHeading text="Account Details" />

        <Container>

            <div class="flex items-start gap-5">

                <SidebarAccount />

                <section class="flex-1">

                    <div class="bg-white p-4 mb-6 w-full shadow-md text-gray-800 flex gap-4 rounded-lg">

                        <!-- <div>
                            <img class="inline-block h-16 w-16 rounded-full ring-2 ring-gray-300" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                        </div> -->

                        <ul class="flex-1">
                            <li class="text-xl font-semibold">{{ user.name }}</li>
                            <li class="font-semibold mb-1">{{ user.email }}</li>
                            <li class="text-sm">Joined on: {{ new Intl.DateTimeFormat('en-US').format( new Date(user.created_at) ) }}</li>
                        </ul>
                        
                        <!-- <div>
                            <font-awesome-icon class="text-xl text-gray-600" icon="fa-solid fa-pen-to-square" />
                        </div> -->
                    </div>
                    
                    <div class="mb-6 shadow-md rounded-lg bg-white p-6">
                        

                        <h4 class="mb-3 text-xl font-semibold text-gray-600">Change your password</h4>
                        <div v-if="validationError" class="bg-rose-200 border border-rose-400 p-2 mb-2 rounded-sm text-rose-600">
                            {{ validationError }}
                        </div>
                        <form @submit.prevent="changePassword">

                            <div class="mb-2">
                                <Label for="password" value="Current Password" />
                                <TextInput v-model="currentPassword" />
                            </div>
                            <div>
                                <Label for="password" value="New Password" />
                                <TextInput v-model="newPassword" />
                            </div>

                            <button class="mt-4 p-2 bg-[color:var(--p-blue-md)] text-white">Save Changes</button>

                        </form>
                    </div>

                    <div class="shadow-md bg-white border-2 border-red-400 p-6 rounded-lg">

                        <h4 class="mb-3 text-xl font-semibold text-gray-600">Delete your account</h4>
                        <div class="text-gray-600 mb-4">
                            <p>Type DELETE in the field below to proceed.</p>
                            <p>Once you delete your account, you will be able to access your listings until they expire.</p>
                        </div>


                        <TextInput v-model="deletetext" @update:modelValue="deletetext = $event"/>

                        <button
                            :disabled="deleteButtonDisabled"

                            :class="{
                                'bg-red-200' : deleteButtonDisabled,
                                'bg-red-600' : !deleteButtonDisabled,
                            }"
                            class="mt-4 p-2 text-white">
                            Delete My Account
                        </button>
                    </div>
                </section>
            </div>
        </Container>
    </MainContentArea>
</template>
