<script setup>

import { ref } from 'vue'

const nn = ref(false)

const user = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

async function onRegister() {

    await axios.post('http://localhost:8000/register', user.value )
    nn.value = true // Show success message


}

</script>
<template>

    <main class="flex justify-center items-center pt-4 bg-gray-100 bg">

        <div class="shadow-md w-2/5 rounded-xl bg-white bg-opacity-90 p-8">

            <div v-if="nn" class="text-gray-700">
                <h2 class="text-3xl font-semibold">Thanks for signing up!</h2>
                <p>We just sent you an email with instructions on how to activate your account.</p>
            </div>

            <div v-else>

                <div class="mb-8 text-gray-700">
                    <h2 class="text-3xl font-semibold">Create an Account</h2>
                    <p>Getting started is fast and easy. Fill out the fields below and you'll be one step closer to landing that job or new hire!</p>
                </div>

                <form @submit.prevent="onRegister">

                    <div class="mb-4">
                        <label for="name" class="mb-1 block font-semibold text-lg text-gray-700">Full Name</label>
                        <input v-model="user.name" type="text" name="name" class="w-full p-2 border border-gray-300 text-lg text-gray-600" />
                    </div>

                    <div class="mb-4">
                        <label for="email" class="mb-1 block font-semibold text-lg text-gray-700">Email Address</label>
                        <input v-model="user.email" type="text" name="email" class="w-full p-2 border border-gray-300 text-lg text-gray-600" />
                    </div>

                    <div class="mb-8">
                        <label for="password" class="mb-1 block font-semibold text-lg text-gray-700">Password</label>
                        <input v-model="user.password" type="password" name="password" class="w-full p-2 border border-gray-300 text-lg text-gray-600" />
                    </div>
                    <div class="mb-8">
                        <label for="password_confirmation" class="mb-1 block font-semibold text-lg text-gray-700">Password Again</label>
                        <input v-model="user.password_confirmation" type="password" name="password_confirmation" class="w-full p-2 border border-gray-300 text-lg text-gray-600" />
                    </div>

                    <div class="flex items-center justify-between">
                        <button class="py-2 px-10 bg-[color:var(--p-blue-md)] text-lg text-white font-semibold rounded-md">Create Account</button>
                        <router-link class="text-sky-500 font-semibold" to="/login">I have an account</router-link>
                    </div>

                </form>
            </div>

        </div>        
    </main>
    
</template>

<style scoped>
.bg {
    background-image: url(../assets/Meteor.svg);
    background-size: cover;
}
</style>