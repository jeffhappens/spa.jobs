<script setup>
    import { ref } from 'vue'
    import { toast } from 'vue3-toastify'

    const user = JSON.parse(localStorage.getItem('user'))

    const validationError = ref('')

    const currentPassword = ref('')
    const newPassword = ref('')

    async function changePassword() {

        validationError.value = ''
        try {
            await axios.post('http://localhost:8000/api/change-password', {
                'password' : currentPassword.value,
                'newPassword': newPassword.value
            })
            console.log('OOOOOOK')
            toast('Your password has been updated.', { autoClose: 2000 })

        } catch(error) {

            validationError.value = error.response.data.message
        }


    }
</script>

<template>
    <main class="flex justify-center items-start bg-gray-100 bg">
        <div class="rounded-lg w-3/4 mx-auto">
            <div class="my-6">
                <h2 class="text-4xl text-gray-800 font-semibold">Account Details</h2>
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
                    
                    <div class="mb-6 shadow-md bg-white p-6">
                        

                        <h4 class="mb-3 text-xl font-semibold text-gray-600">Change your password</h4>
                        <div v-if="validationError" class="bg-rose-200 border border-rose-400 p-2 mb-2 rounded-sm text-rose-600">
                            {{ validationError }}
                        </div>
                        <form @submit.prevent="changePassword">
                            <div class="mb-2">
                                <label class="block text-gray-700 mb-1 font-semibold">Current Password</label>
                                <input v-model="currentPassword" type="password" name="password" class="p-2 w-full border border-gray-300 bg-white text-gray-700" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-1 font-semibold">New Password</label>
                                <input v-model="newPassword" type="password" name="password" class="p-2 w-full border border-gray-300 bg-white text-gray-700" />
                            </div>

                            <button class="mt-4 p-2 bg-[color:var(--p-blue-md)] text-white">Save Changes</button>

                        </form>
                    </div>

                    <div class="shadow-md bg-white p-6">
                        

                        <h4 class="mb-3 text-xl font-semibold text-gray-600">Delete your account</h4>
                        <p class="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, assumenda in! A officiis adipisci, et, assumenda perferendis obcaecati aspernatur odit fuga hic voluptatem nostrum architecto velit quibusdam explicabo, impedit sequi.</p>
                        <button class="mt-4 p-2 bg-red-600 text-white">Delete My Account</button>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>
