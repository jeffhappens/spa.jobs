<script setup>
    import { ref, defineProps } from 'vue'
    let props = defineProps(['listing'])
</script>
<template>

    <div class="bg-white mb-12 p-6 text-black shadow-md rounded-xl">
        
        <div class="flex justify-between align-start">

            <h4 class="text-3xl">
                <router-link
                    :to="{
                        name: 'listing',
                        params: {
                            uuid: props.listing.uuid,
                            slug: props.listing.slug
                        }
                    }">
                    {{ props.listing.title }}</router-link>
            </h4>
            <p class="text-sm">Posted {{ new Intl.DateTimeFormat('en-us').format() }}</p>
        </div>

        <p class="mb-2 text-lg text-[color:var(--p-orange)]">
            <router-link
                :to="{
                    name: 'company',
                    params: {
                        uuid: props.listing.company.uuid,
                        slug: props.listing.company.slug
                    }
                }"
                class="hover:underline hover:underline-offset-2">

                {{ props.listing.company?.name }}
            </router-link>
        </p>

        <p class="text-md">{{ props.listing.description }}</p>

        <div class="flex items-center justify-end mt-8">
            <a :href="'http://'+props.listing.apply_link" class="shadow-md text-lg font-semibold bg-[color:var(--p-blue-md)] text-white py-1 px-4 rounded-md">Apply for this job</a>
        </div>
    </div>
</template>