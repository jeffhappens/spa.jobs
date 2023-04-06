<script setup>
    import { ref, defineProps, defineEmits } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import Container from '../components/Container.vue'
    
    const emit = defineEmits(['user:logout'])
    const props = defineProps(['user'])
    const router = useRouter()
    const store = useStore()
    
    const navigationItems = ref([
        // { label: 'HOME', destination: '/' },
        { label: 'BROWSE BY INDUSTRY', destination: '/industries' },
        { label: 'BROWSE BY COMPANY', destination: '/companies' },
    ])

    // const postJobItem = ref({
    //     label: 'POST A JOB FOR $99',
    //     destination: '/post/job-details'
    // })

    async function userLogout() {
        await axios.post(`${store.state.api_url_base}/logout`)
        localStorage.removeItem('user')
        emit('user:logout')
        router.push({ path: '/'})
    }

</script>
<template>

    <div class="bg-black shadow-md">

        <Container class="flex items-center justify-between h-20">

            <div class="text-left text-sky-600 rounded-md py-2 text-3xl">
                <router-link to="/">{{ $store.state.site_title }}</router-link>
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
                    :to="store.state.post_job_item.destination"
                    class="font-semibold py-2 px-4 rounded-full bg-[color:var(--p-orange)]">
                    {{ store.state.post_job_item.label }}
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
