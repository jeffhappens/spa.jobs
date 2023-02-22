<script setup>
    import { ref } from 'vue'

    const myCompanies = ref([])

    const user = JSON.parse(localStorage.getItem('user'))

    async function getCompanies() {
        const { data } = await axios.get('http://localhost:8000/api/companies/' + user.uuid)
        myCompanies.value = data
    }

    getCompanies()


</script>
<template>

    <main class="flex justify-center items-start bg-gray-100 bg">
        <div class="rounded-lg w-3/4 mx-auto">
            <div class="my-8 flex justify-between">
                <h2 class="text-4xl text-gray-800 font-semibold">Companies</h2>
                <div class="mb-4">
                    <router-link to="/account/companies/add" class="text-white bg-[color:var(--p-blue-md)] p-2">Add New Company</router-link>
                </div>
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

                    <div v-for="company in myCompanies" :key="company.id" class="bg-white w-full shadow-md text-gray-800 mb-6 p-4 flex gap-5">
                        <div class="w-16">
                            <img :src="`/img/${company.logo}`" />
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl">{{ company.name }}</h3>
                            <p>{{ company.address }}</p>
                            <p>{{ company.industry.label }}</p>
                            <p>{{ company.listings_count }} current listings</p>
                        </div>
                        <div>
                            <span class="cursor-pointer material-symbols-outlined">edit</span>
                        </div>
                    </div>
                    

                </section>
            </div>
        </div>
    </main>
    
</template>