<script setup>
    import { ref, defineProps } from 'vue'
    import { useRoute } from 'vue-router'
    const route = useRoute()
    let props = defineProps(['listing'])
</script>
<template>

    <div class="bg-white mb-8 p-4 text-black shadow-md rounded-xl">

        <div class="flex justify-between">
            <p class="text-gray-600 mb-3">{{ props.listing.industry?.label }}</p>
            <p v-if="route.name === 'my-listings'">
                <router-link :to="{ name: 'edit-listing', params: { uuid: props.listing.uuid } }">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-xl" />
                </router-link>
            </p>
        </div>
        
        <div class="flex justify-between align-start">

            <div>
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
            </div>
        </div>
    </div>
</template>