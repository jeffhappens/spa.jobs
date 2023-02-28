<script setup>
    import { ref, defineProps, defineEmits } from 'vue'
    import { useRouter } from 'vue-router'
    import Container from '../components/Container.vue'
    
    const emit = defineEmits(['user:logout'])
    const props = defineProps(['user'])
    const router = useRouter()
    const host = 'http://localhost:8000'
    const apihost = host + '/api'

    const navigationItems = ref([
        { label: 'HOME', destination: '/' },
        { label: 'BROWSE BY INDUSTRY', destination: '/industries' },
        { label: 'BROWSE BY COMPANY', destination: '/companies' },
    ])

    const postJobItem = ref({
        label: 'POST A JOB',
        destination: '/post'
    })

    async function userLogout() {
        await axios.post(`${host}/logout`)
        localStorage.removeItem('user')
        emit('user:logout')
        router.push({ path: '/'})
    }

</script>
<template>

    <div class="bg-black shadow-md">

        <Container class="flex items-center justify-between h-20">

            <div class="text-left bg-gray-800 rounded-md py-2 px-6">
                <router-link to="/">SITE NAME</router-link>
            </div>
            
            <nav class="flex items-center justify-center gap-10 text-white">
                <div v-for="navItem in navigationItems" :key="navItem.label">
                    <router-link
                        :to="navItem.destination"
                        class="transition hover:text-blue-500">
                        {{ navItem.label }}
                    </router-link>
                </div>
                <router-link
                    :to="postJobItem.destination"
                    class="font-semibold py-1 px-4 rounded-full bg-[color:var(--p-orange)]">
                    {{ postJobItem.label }}
                </router-link>
            </nav>
            
            <div class="flex justify-end items-center gap-5 text-right">
                <div v-if="user?.uuid" class="flex items-center gap-4">
                    
                    <div>
                        <p class="font-semibold">{{ user.name }}</p>
                        <div class="flex items-center gap-2">
                            <p class="text-sm text-[color:var(--p-blue-md)] cursor-pointer hover:underline underline-offset-2">
                                <router-link to="/account">Account</router-link>
                            </p>
                            <p @click="userLogout" class="text-sm text-[color:var(--p-orange)] cursor-pointer hover:underline underline-offset-2">Logout</p>
                        </div>
                    </div>
                    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="/img/profile.avif" alt=""/>
                </div>
                <div v-else>
                    <p>
                        <router-link to="/login" class="hover:text-[color:var(--p-orange)] hover:underline underline-offset-2">Sign In</router-link> /
                        <router-link to="/register" class="hover:text-[color:var(--p-blue-md)] hover:underline underline-offset-2">Create Account</router-link>
                    </p>
                </div>

            </div>
        </Container>
    </div>
</template>
