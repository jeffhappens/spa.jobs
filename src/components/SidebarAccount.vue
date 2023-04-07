<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()

    const links = [
        { label: 'Account Details', routeName: 'account' },
        { label: 'Manage Listings', routeName: 'my-listings' },
        { label: 'Manage Companies', routeName: 'my-companies' },
        { label: 'Post a Job', routeName: 'post-job-details' },
    ]
</script>
<template>
    <aside class="w-1/4">
        <div class="w-full text-gray-800 rounded-lg">
            <ul>
                <li v-for="link in links" :key="link">
                    <router-link
                        :to="{ name: link.routeName }"
                        class="font-semibold block p-2 w-full hover:bg-white rounded-lg">
                        {{ link.label }}
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>