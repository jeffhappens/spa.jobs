<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'

    import Label from '#/form/Label.vue'
    import TextInput from '#/form/TextInput.vue'
    import ErrorMessage from '#/form/ErrorMessage.vue'

    const store = useStore()

    const nn = ref(false)
    const user = ref({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const errors = ref()

    async function onRegister() {
        try {
            await axios.post(`${store.state.api_url_base}/register`, user.value )
            nn.value = true // Show success message
        } catch(err) {
            errors.value = err.response.data.errors
        }
    }
</script>

<template>


    <main class="flex justify-center items-center pt-4 bg-gray-100 bg">

        <!-- <div class="shadow-md w-2/5 rounded-xl bg-white bg-opacity-90 p-8"> -->
        <div class="shadow-md w-10/12 md:w-3/5 rounded-xl bg-white bg-opacity-90 p-8 my-6">

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
                        <Label
                            for="name"
                            helpText="e.g. King Charles III"
                            value="Full Name" />

                        <TextInput
                            name="name"
                            :class="{ 'border-2 border-red-500' : errors?.name }"
                            v-model="user.name"
                            @update:modelValue="user.name = $event" />

                        <ErrorMessage v-if="errors?.name" :text="errors.name[0]" />
                    </div>

                    <div class="mb-4">
                        <Label
                            for="email"
                            helpText=""
                            value="Email Address" />

                        <TextInput
                            name="email"
                            :class="{ 'border-2 border-red-500' : errors?.email }"
                            v-model="user.email"
                            @update:modelValue="user.email = $event" />

                        <ErrorMessage v-if="errors?.email" :text="errors.email[0]" />
                    </div>

                    <div class="mb-4">
                        <Label
                            for="password"
                            helpText="Passwords must be at least 8 characters in length"
                            value="Password" />

                        <TextInput
                            type="password"
                            name="password"
                            :class="{ 'border-2 border-red-500' : errors?.password }"
                            @update:modelValue="user.password = $event" />

                        <ErrorMessage v-if="errors?.password" :text="errors.password[0]" />
                    </div>
                    <div class="mb-8">
                        <Label
                            for="password_confirmation"
                            helpText="Passwords must match"
                            value="Password Again" />

                        <TextInput
                            type="password"
                            name="password_confirmation"
                            :class="{ 'border-2 border-red-500' : errors?.password }"
                            @update:modelValue="user.password_confirmation = $event" />

                        <ErrorMessage v-if="errors?.password" :text="errors.password[0]" />
                    </div>

                    <div class="block md:flex items-center justify-between">
                        <button class="w-full md:w-auto py-2 px-10 bg-[color:var(--p-blue-md)] text-lg text-white font-semibold rounded-md">Create Account</button>
                        <div class="text-center my-4 md:text-start md:my-0">
                            <router-link class="text-sky-500 font-semibold" to="/login">I have an account</router-link>
                        </div>
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