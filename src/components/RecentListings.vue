<script setup>
import { defineProps } from 'vue'
import ListingCard from './ListingCard.vue'
const props = defineProps(['recentListings', 'heading'])


</script>

<template>
    <div class="bg-gray-50 pt-24">
        <div class="rounded-lg w-3/4 mx-auto">
            <h2 class="text-4xl p-3 mb-10 text-center text-[color:var(--p-blue-drk)] font-semibold">{{ props.heading }}</h2>
            <div v-for="listing in props.recentListings" :key="listing.id">
                <ListingCard  :listing="listing" />
            </div>
        </div>
    </div>
</template>