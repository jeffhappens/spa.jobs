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
    <aside class="bg-white w-full mb-4 rounded-md shadow flex text-gray-800 text-xs md:flex-col md:w-24 md:py-2">

        <router-link
            class="w-1/4 md:w-full p-2 text-center flex flex-col border-r last:border-0 md:border-0"
            :class="{ 'text-sky-600' : route.name === link.routeName }"
            v-for="link in links" :key="link"
            :to="{ name: link.routeName }">
            <font-awesome-icon :icon="`fa-solid ${link.icon}`" class="text-2xl mb-1" />
            {{ link.label }}
        </router-link>

    </aside>
</template>