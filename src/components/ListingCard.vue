<script setup>
    import { ref, defineProps } from 'vue'
    let props = defineProps(['listing'])
</script>
<template>

    <div class="bg-white mb-8 p-4 text-black shadow-md rounded-xl">
        
        <div class="flex items-center justify-between align-start">

            <div>
                <p class="text-gray-600 mb-3">{{ props.listing.industry?.label }}</p>

                <h4 class="text-2xl">
                    <router-link
                        class="font-semibold hover:underline hover:underline-offset-2"
                        :to="{
                            name: 'listing',
                            params: {
                                uuid: props.listing.uuid,
                                slug: props.listing.slug
                            }
                        }">
                        {{ props.listing.title }}
                    </router-link>
                </h4>

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

                

                
            </div>
            <div>
                <p class="text-gray-500 text-sm">Posted on {{ new Intl.DateTimeFormat('en-us').format() }}</p>
                <!-- <a
                    :href="'http://'+props.listing.apply_link"
                    class="shadow-md text-lg font-semibold bg-[color:var(--p-blue-md)] text-white py-2 px-4 rounded-md">
                    Apply for this job
                </a> -->
            </div>
        </div>



        <!-- <p class="text-md">{{ props.listing.description }}</p> -->

        <!-- <div class="flex items-center justify-end mt-8">
            <a :href="'http://'+props.listing.apply_link" class="shadow-md text-lg font-semibold bg-[color:var(--p-blue-md)] text-white py-1 px-4 rounded-md">Apply for this job</a>
        </div> -->
    </div>
</template>