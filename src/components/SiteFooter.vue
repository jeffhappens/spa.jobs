<script setup>
    import { ref } from 'vue'
    import Container from '#/Container.vue'
</script>
<template>
    <footer class="bg-gray-900 py-6">
        <Container>
            <div class="md:flex">

                <div class="w-full mb-4 md:mb-0 md:w-1/2">
                    <h2 class="text-2xl text-white mb-2">Flex Job Listings</h2>
                    <p class="mb-2">Flex Job listings is a curated job board of the best remote jobs for any industry.</p>
                    <p class="flex items-center gap-2">
                        <font-awesome-icon icon="fa-solid fa-message" />
                        <a href="" class="text-sky-600">Get in touch with us</a>
                    </p>
                </div>
                <div class="flex-1 flex flex-col md:items-end">
                    <ul class="md:text-right mb-4">
                        <!-- <li>About Flex Job Listings</li> -->
                        <!-- <li>Frequently Asked Questions</li> -->
                        <li>
                            <router-link :to="{ name: 'terms-of-service' }" class="hover:underline">Terms of Service</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'privacy-policy' }" class="hover:underline">Privacy Policy</router-link>
                        </li>
                    </ul>

                    <div class="text-2xl flex gap-2">
                        <font-awesome-icon icon="fa-brands fa-twitter" />
                        <font-awesome-icon icon="fa-brands fa-facebook" />
                        <font-awesome-icon icon="fa-brands fa-linkedin" />
                    </div>
                </div>
            </div>
        </Container>
    </footer>
</template>