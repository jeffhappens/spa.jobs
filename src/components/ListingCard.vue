<script setup>
    import { ref, defineProps } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    const route = useRoute()
    const store = useStore()
    let props = defineProps(['listing'])

    const renewMessage = ref(false)

    function showRenewMessage() {
        renewMessage.value = true
    }

    function renewListing(listing_id) {
        
        const params = new URLSearchParams({
            client_reference_id: `renewal_${listing_id}`,
            success_url: store.state.api_url_base,
            cancel_url: store.state.api_url_base,
        })
        location.href = `${store.state.payment_link_url}?${params}`
    }
</script>
<template>
    <div class="bg-white mb-8 p-4 text-black shadow-md rounded-xl">
        <!-- Industry Label -->
        <div class="flex justify-between">
            <p class="text-gray-600 mb-3">{{ props.listing.industry?.label }}</p>
            <p v-if="route.name === 'my-listings'">
                <router-link :to="{ name: 'edit-listing', params: { uuid: props.listing.uuid } }">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-xl" />
                </router-link>
            </p>
        </div>
        <div class="block md:flex justify-between align-start">
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
                <p class="text-xs text-gray-600">
                    {{ listing.renewed_on ? 'Reposted' : 'Posted' }} on {{ listing.renewed_on ? listing.renewed_on : listing.created_at }}
                    <!-- -->
                    <span v-if="route.name === 'my-listings'">
                        / {{ listing.expired ? 'Expired' : 'Expires' }} on {{ listing.expires_at }}
                    </span>
                </p>

                <div v-if="route.name === 'my-listings' && listing.expired">
                    <button
                        v-if="!renewMessage"
                        @click="showRenewMessage"
                        class="bg-sky-400 text-white px-2 py-1 my-2 rounded-sm">
                        Renew Listing
                    </button>

                    <div v-if="renewMessage" class="border border-amber-400 bg-amber-100 rounded-sm p-3 my-4 w-full">
                        <p class="text-sm">You are about to renew this listing. Please make sure the listing information is current before proceeding.</p>
                        <p class="my-2 flex gap-2">
                            <button
                                @click="renewListing(listing.uuid)"
                                class="bg-sky-500 text-white py-1 px-2 rounded-sm">
                                Yes, renew this listing
                            </button>
                            <button
                                @click="renewMessage = false"
                                class="bg-amber-500 text-white py-1 px-2 rounded-sm">
                                Cancel
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>