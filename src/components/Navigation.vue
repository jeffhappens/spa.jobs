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
        { label: 'BROWSE BY INDUSTRY', routeName: 'industries' },
        { label: 'BROWSE BY COMPANY', routeName: 'companies' },
    ])

    const menuState = ref(false)
    function toggleMenu() {

        menuState.value = !menuState.value

    }


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
                <router-link :to="{ name: 'home' }">{{ $store.state.site_title }}</router-link>
            </div>

            <nav class="hidden lg:flex items-center justify-center gap-10 text-white">

                <div v-for="navItem in navigationItems" :key="navItem.label">
                    <router-link
                        :to="{ name: navItem.routeName }"
                        class="transition hover:text-blue-500">
                        {{ navItem.label }}
                    </router-link>
                </div>
                <router-link
                    :to="{ name: store.state.post_job_item.routeName }"
                    class="font-semibold py-2 px-4 rounded-full bg-[color:var(--p-orange)]">
                    {{ store.state.post_job_item.label }}
                </router-link>
            </nav>
            
            <div class="flex justify-end items-center gap-8 text-right">

                <div v-if="user?.uuid" class="flex items-center gap-4">
                    
                    <div>
                        <p class="font-semibold">{{ user.name }}</p>
                        <div class="flex items-center gap-2">
                            <p class="text-sm text-[color:var(--p-blue-md)] cursor-pointer hover:underline underline-offset-2">
                                <router-link :to="{ name: 'account' }">Account</router-link>
                            </p>
                            <p @click="userLogout" class="text-sm text-[color:var(--p-orange)] cursor-pointer hover:underline underline-offset-2">Logout</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>
                        <router-link :to="{ name: 'login' }" class="hover:text-[color:var(--p-orange)] hover:underline underline-offset-2">Sign In</router-link> /
                        <router-link :to="{ name: 'register' }" class="hover:text-[color:var(--p-blue-md)] hover:underline underline-offset-2">Create Account</router-link>
                    </p>
                </div>

                <div
                    @click="toggleMenu"
                    class="lg:hidden transition w-12 flex flex-col items-center justify-center text-sky-500 bg-gray-800 hover:bg-gray-700 p-2 cursor-pointer rounded-sm">
                    
                    <font-awesome-icon v-if="!menuState" icon="fa-solid fa-bars" class="text-2xl" />
                    <font-awesome-icon v-else icon="fa-solid fa-xmark" class="text-2xl" />
                    <p class="underline text-xs">
                        {{ !menuState ? 'MENU' : 'CLOSE' }}
                    </p>
                </div>

            </div>
        </Container>


        <!-- MOBILE MENU -->
        <div v-if="menuState" class="py-6 bg-gray-900 lg:hidden">
            <Container>

                <div v-for="navItem in navigationItems" :key="navItem.label" class="mb-4">
                    <router-link
                        @click="toggleMenu"
                        :to="{ name: navItem.routeName }"
                        class="transition hover:text-blue-500">
                        {{ navItem.label }}
                    </router-link>
                </div>
                <div class="my-4">
                    <router-link
                        @click="toggleMenu"
                        :to="{ name: store.state.post_job_item.routeName }"
                        class="font-semibold py-2 px-4 rounded-full bg-[color:var(--p-orange)]">
                        {{ store.state.post_job_item.label }}
                    </router-link>
                </div>
            
            </Container>
        </div>
    </div>
</template>
