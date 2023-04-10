<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()

    const links = [
        { label: 'Account Details', routeName: 'account', icon: 'fa-user' },
        { label: 'Manage Listings', routeName: 'my-listings', icon: 'fa-list' },
        { label: 'Manage Companies', routeName: 'my-companies', icon: 'fa-building' },
        { label: 'Post a Job', routeName: 'post-job-details', icon: 'fa-circle-plus' },
    ]
</script>
<template>
    <aside class="w-1/16 lg:w-1/4">
        <div class="w-full text-gray-800 rounded-lg">
            <ul>
                <li v-for="link in links" :key="link">
                    <router-link
                        :to="{ name: link.routeName }"
                        class="font-semibold block p-2 w-full hover:bg-white rounded-lg">
                        <font-awesome-icon :icon="`fa-solid ${link.icon}`" class="text-xl"/>
                        <span class="hidden lg:inline lg:ml-2">{{ link.label }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>