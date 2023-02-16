<script setup>
    import { ref, defineProps, defineEmits } from 'vue'
    import { useRouter } from 'vue-router'

    const emit = defineEmits(['user:logout'])
    const props = defineProps(['user'])
    const router = useRouter()
    

    const navigationItems = ref([
        { label: 'HOME', destination: '/' },
        { label: 'FAQ', destination: '/faq' },
        { label: 'COMPANIES', destination: '/companies' },
    ])
    
    const postJobItem = ref({
        label: 'POST A JOB',
        destination: '/post'
    })

    async function userLogout() {
        await axios.post('http://localhost:8000/logout')
        localStorage.removeItem('user')
        emit('user:logout')
        router.push({ path: '/'})
    }

</script>
<template>

    <div class="bg-black shadow-md">
    
        <div class="max-w-screen-xl mx-auto p-6 flex items-center justify-between w-full text-white">

            <div class="w-1/4 text-left">
                <router-link to="/">JOB BOARD PROTOTYPE</router-link>
            </div>
            
            <nav class="w-1/2 flex items-center justify-center gap-10 text-white">
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
            
            <div class="w-1/4 flex justify-end  items-center gap-5 text-right">
                <div v-if="user" class="flex items-center gap-4">
                    
                    <div>
                        <p class="font-semibold">{{ user.name }}</p>
                        <div class="flex items-center gap-2">
                            <p class="text-sm text-[color:var(--p-blue-md)] cursor-pointer hover:underline underline-offset-2">
                                <router-link to="/account">Account</router-link>
                            </p>
                            <p @click="userLogout" class="text-sm text-[color:var(--p-orange)] cursor-pointer hover:underline underline-offset-2">Logout</p>
                        </div>
                    </div>
                    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                </div>
                <div v-else>
                    <p>
                        <router-link to="/login">Sign In</router-link>
                    </p>
                </div>

            </div>
        </div>
        
    </div>
</template>