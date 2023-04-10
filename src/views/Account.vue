<script setup>
    import { ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { toast } from 'vue3-toastify'
    import MainContentArea from '../components/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
    import Label from '../components/form/Label.vue'
    import TextInput from '../components/form/TextInput.vue'
    import SidebarAccount from '../components/SidebarAccount.vue'

    const store = useStore()
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem('user'))


    const emit = defineEmits(['user:logout'])
    
    const validationError = ref('')
    const currentPassword = ref('')
    const newPassword = ref('')

    const deletetext = ref('')
    const deleteButtonDisabled = computed( () => {
        return deletetext.value !== 'DELETE' 
    })

    /**
     * Clears the value of the newPassword and currentPassword variables.
     *
     * @function clearPasswordFields
     * @returns {void} - This function does not return a value, but it clears the value of the newPassword and currentPassword variables.
     */
    const clearPasswordFields = ()  => {
        newPassword.value = ''
        currentPassword.value = ''
    }

    function deleteAccount() {
        alert('Delete Account Fired')
    }


    /**
     * Logs out the user by making a POST request to the logout API endpoint, removing the user from local storage, emitting a user:logout event, and redirecting to the home page after a 3-second delay.
     *
     * @async
     * @function userLogout
     * @returns {Promise<void>} - This function does not return a value, but it logs out the user and redirects to the home page after a 3-second delay.
     *
     * @throws {Error} - If the API endpoint returns an error or if the axios library encounters an error while making the request.
     */
    async function userLogout() {
        await axios.post(`${store.state.api_url_base}/logout`)
        localStorage.removeItem('user')
        emit('user:logout')
        setTimeout(() => {
            location.href = '/'

        }, 3000)
    }


    /**
     * Changes the user's password by making a POST request to the change-password API endpoint with the current password and new password, and logs out the user after displaying a success message.
     *
     * @async
     * @function changePassword
     * @returns {Promise<void>} - This function does not return a value, but it changes the user's password and logs out the user.
     *
     * @throws {Error} - If the API endpoint returns an error, if the axios library encounters an error while making the request, or if there is a validation error in the request data.
     */
    async function changePassword() {
        validationError.value = ''
        try {
            await axios.post(`${store.state.api_url_base}/api/change-password`, {
                'password' : currentPassword.value,
                'newPassword': newPassword.value
            })
            toast('Your password has been updated. Logging you out.', { autoClose: 2000 })
            userLogout()
            
        } catch(error) {
            validationError.value = error.response.data.message
        }
    }
</script>

<template>

    <MainContentArea>

        <PageHeading text="Account Details" />

        <Container>

            <div class="flex-col md:flex items-start gap-5">

                <SidebarAccount />

                <section class="flex-1 w-full">

                    <div class="bg-white p-4 mb-6 w-full shadow-md text-gray-800 flex gap-4 rounded-lg">

                        <ul class="flex-1">
                            <li class="text-xl font-semibold">{{ user.name }}</li>
                            <li class="font-semibold mb-1">{{ user.email }}</li>
                            <li class="text-sm">Joined on: {{ new Intl.DateTimeFormat('en-US').format( new Date(user.created_at) ) }}</li>
                        </ul>
                        
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

                            <div class="flex items-center gap-5 mt-6">
                                <button class="p-2 bg-[color:var(--p-blue-md)] text-white">Change Password</button>
                                <p class="text-amber-600">You will be logged out of your account after you change your password.</p>
                            </div>

                        </form>
                    </div>

                    <div class="shadow-md bg-white border-4 border-red-400 p-6 rounded-lg">

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
                            class="mt-4 p-2 text-white"
                            @click="deleteAccount">
                            Delete My Account
                        </button>
                    </div>
                </section>
            </div>
        </Container>
    </MainContentArea>
</template>
