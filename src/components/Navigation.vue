<script setup>
    import { ref } from 'vue'

    const navigationItems = ref([
        { label: 'HOME', destination: '/' },
        { label: 'FAQ', destination: '/faq' },
        { label: 'COMPANIES', destination: '/companies' },
    ])
    
    const postJobItem = ref({
        label: 'POST A JOB',
        destination: '/post'
    })

</script>
<template>

    <div class="sticky top-0 z-50 bg-black shadow-md">
    
        <div class="max-w-screen-xl mx-auto p-6 flex items-center justify-between w-full text-white">

            <div class="w-1/3 text-left">SITE NAME</div>
            
            <nav class="w-1/3 flex items-center justify-center gap-10 text-white">
                <div v-for="navItem in navigationItems" :key="navItem.label">
                    <router-link
                        :to="navItem.destination"
                        class="transition hover:text-blue-500">
                        {{ navItem.label }}
                    </router-link>
                </div>
            </nav>
            
            <div class="w-1/3 text-right">
                <router-link
                    :to="postJobItem.destination"
                    class="font-bold py-2 px-6 rounded-full bg-[color:var(--p-orange)]">
                    {{ postJobItem.label }}
                </router-link>
            </div>
        </div>
        
    </div>
</template>