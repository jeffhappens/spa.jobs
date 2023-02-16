<script setup>
import { ref } from 'vue'

const heading = ref('Job Board Prototype For Remote Workers')
const description = ref('Jobs is a curated job board of the best jobs for developers, designers and marketers in the tech industry.')

</script>  
<template>
    <div class="bg-[color:var(--p-blue-drk)] text-white hero">
        <div class="max-w-screen-md mx-auto text-center pt-32 pb-32">
            
            <h2 class="font-bold text-6xl mb-6">{{ heading }}</h2>
            
            <p class="text-lg">{{ description }}</p>
        </div>
    </div>
</template>

<style scoped>
.hero {
    background-color: #FFFFFF;
    
    /* background-image: url(../assets/MassCircles.svg);
    background-image: url(../assets/ShinyOverlay.svg);
    background-image: url(../assets/RectLight.svg);
    background-image: url(../assets/Meteor.svg); */
    background-image: url(../assets/Hexagon.svg);
    background-size: cover;
}
</style>

