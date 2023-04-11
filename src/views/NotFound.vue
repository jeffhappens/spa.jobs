<script setup>
    import MainContentArea from '#/MainContentArea.vue'
    import Container from '../components/Container.vue'
    import PageHeading from '../components/PageHeading.vue'
</script>
<template>
    <MainContentArea>
        <PageHeading text="Page Not Found" />

        <Container>
            <section class="flex-1 w-full text-gray-800">
                <h1 class="text-3xl">Whoops! The page you're looking for cannot be found.</h1>
                <div class="py-4 text-lg">
                    <p>It have been moved or deleted, or there may be a mistake in the URL you entered. Please check the URL and try again.</p>
                    <p>If you continue to experience issues, please contact our support team for assistance.</p>
                    <p>Thank you for your understanding.</p>
                </div>
            </section>
        </Container>

    </MainContentArea>
    
</template>