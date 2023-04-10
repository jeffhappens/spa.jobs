<script setup>
    import { useRoute } from 'vue-router'
    const route = useRoute()

    const links = [
        { label: 'Account', routeName: 'account', icon: 'fa-user' },
        { label: 'Listings', routeName: 'my-listings', icon: 'fa-list' },
        { label: 'Companies', routeName: 'my-companies', icon: 'fa-building' },
        { label: 'Post a Job', routeName: 'post-job-details', icon: 'fa-circle-plus' },
    ]
</script>
<template>
    <aside class="bg-white w-full mb-4 rounded-md shadow flex text-gray-800 text-xs">

        <router-link
            class="w-1/4 p-2 text-center flex flex-col border-r last:border-0"
            v-for="link in links" :key="link"
            :to="{ name: link.routeName }">
            <font-awesome-icon :icon="`fa-solid ${link.icon}`" class="text-2xl mb-1" />
            {{ link.label }}
        </router-link>

    </aside>
</template>