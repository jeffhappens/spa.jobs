<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()
</script>
<template>
    <aside class="w-1/4">

        <div class="bg-white w-full shadow-md text-gray-800 rounded-lg">
            
            <ul>
                
                <li
                    class="px-4 py-2 flex items-center justify-between border-b border-gray-200 rounded-t-lg"
                    :class="{ 'bg-gray-200' : route.name == 'account' }"
                >
                    <router-link to="/account" class="font-semibold">Account Details</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
                
                <li
                    class="px-4 py-2 flex items-center justify-between border-b border-gray-200"
                    :class="{ 'bg-gray-200' : route.name == 'edit-listing' || route.name == 'my-listings' }"
                >

                    <router-link to="/account/listings" class="font-semibold">Manage Listings</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
                
                <li
                    class="px-4 py-2 flex items-center justify-between border-b border-gray-200"
                    :class="{ 'bg-gray-200' : route.name == 'my-companies' || route.name == 'edit-company' }"
                >
                    <router-link to="/account/companies" class="font-semibold">Manage Companies</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
                
                <li class="px-4 py-2 flex items-center justify-between">
                    <router-link :to="{ name: 'post-job-details' }" class="font-semibold">Post a Job</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
            </ul>
        </div>
    </aside>
</template>