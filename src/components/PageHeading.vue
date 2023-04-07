<script setup>
    import { ref } from 'vue'
    import Container from '../components/Container.vue'
    
    const props = defineProps(['text','actions'])

</script>
<template>
    <div class="bg h-20 mb-12 flex items-center shadow-md">
        <Container class="flex justify-between items-center">

            <h2 class="text-xl md:text-3xl text-white text-shadow font-semibold">{{ text }}</h2>

            <router-link
                v-if="actions"
                :to="actions.url"
                class="text-white bg-[color:var(--p-blue-md)] rounded-md py-2 px-4">
                {{ actions.label }}
            </router-link>

        </Container>
    </div>
    
</template>

<style scoped>
    .bg {
        background: #D38312;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #A83279, #D38312);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #A83279, #D38312); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .text-shadow {
        text-shadow: 0 1px 5px rgba(0,0,0,.15);
    }
</style>