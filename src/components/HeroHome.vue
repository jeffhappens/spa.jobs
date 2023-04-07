<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

import Container from '#/Container.vue'

const store = useStore()

const heading = ref([
    'Location Independent? So are We!',
    'Join the future of work',
    'Skip the Commute, Work from Anywhere'
])
const description = ref('Flex Job listings is a curated job board of the best remote jobs for any industry.')

</script>  
<template>

    <div class="bg-[color:var(--p-blue-drk)] text-white hero">

        <Container>
            <div class="py-32 text-center">
                <h2 class="font-bold text-5xl md:text-6xl mb-6">{{ heading[2] }}</h2>
                <p class="text-lg">{{ description }}</p>
                <div class="mt-10">
                    <router-link
                        :to="store.state.post_job_item.destination"
                        class="text-lg md:text-xl font-semibold py-4 px-8 rounded-full bg-[color:var(--p-orange)]">
                        {{ store.state.post_job_item.label }}
                    </router-link>
                </div>
            </div>
        </Container>
    </div>
</template>

<style scoped>
.hero {
    background-color: #FFFFFF;
    background-image: url(../assets/Hexagon.svg);
    background-size: cover;
}
</style>

