<script setup>
import { ref, defineEmits } from 'vue'
import router from '../router'

const user = ref({
    email: '',
    password: '',
})

const emit = defineEmits(['user:login'])

async function onLogin() {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie')
    await axios.post('http://localhost:8000/login', user.value)

    const me = await axios.get('http://localhost:8000/api/user')

    emit('user:login', me.data)

    router.push({ path: '/' })

}
</script>

<template>

    <main class="flex justify-center items-center bg-gray-100 bg">
        
        <div class="shadow-md w-2/5 rounded-xl bg-white bg-opacity-90 p-8">

            <div class="mb-4 text-gray-700">
                <h2 class="text-3xl font-semibold">Sign In</h2>
                <p>Stay updated on all of your listings and opportunities.</p>
            </div>

            <form @submit.prevent="onLogin">

                <div class="mb-4">
                    <label for="email" class="mb-1 block font-semibold text-lg text-gray-700">Email Address</label>
                    <input v-model="user.email" type="text" name="email" class="w-full p-2 border border-gray-300 text-lg text-gray-600" />
                </div>

                <div class="mb-4">
                    <label for="password" class="mb-1 block font-semibold text-lg text-gray-700">Password</label>

                    <input v-model="user.password" type="password" name="password" class="w-full p-2 border border-gray-300 text-lg text-gray-600" />
                </div>

                <div class="flex items-center justify-between">
                    <button class="py-2 px-10 bg-[color:var(--p-blue-md)] text-lg text-white font-semibold rounded-md">Sign In</button>
                    <router-link class="text-sky-500 font-semibold" to="">I already have an account</router-link>
                </div>

                <div>
                    <p class="text-center">I forgot my password</p>
                </div>

            </form>

        </div>
    </main>
</template>

<style scoped>
.bg {
    background-image: url(../assets/Meteor.svg);
    background-size: cover;
}
</style>