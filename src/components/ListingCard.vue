<script setup>
    import { ref, defineProps } from 'vue'
    let props = defineProps(['listing'])
</script>
<template>

    <div class="bg-white mb-12 p-6 text-black shadow-md rounded-2xl">
        
        <div class="flex justify-between align-start">

            <h4 class="text-3xl">
                <router-link :to="{ name: 'listing' }">{{ props.listing.title }}</router-link>
            </h4>
            <p class="text-sm">{{ new Intl.DateTimeFormat('en-us').format() }}</p>
        </div>

        <p v-if="props.listing.distance">{{ Math.floor(props.listing.distance) }} miles away</p>

        <p class="mb-2 text-[color:var(--p-blue-md)]">{{ props.listing.company.name }}</p>

        <p class="text-md">{{ props.listing.description }}</p>

        <div class="flex items-center justify-end mt-8">
            <a :href="'http://'+props.listing.apply_link" class="shadow-md text-lg font-semibold bg-[color:var(--p-blue-md)] text-white py-1 px-4 rounded-full">Apply for this job</a>
        </div>
    </div>
</template>