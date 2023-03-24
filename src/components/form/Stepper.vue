<script setup>

    import { ref } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const steps = ref([
        {
            label: 'About the Job',
            link: 'post-job-details',
            active: route.name === 'post-job-details',
            complete: false 
        },
        {
            label: 'About your company',
            link: 'post-company-details',
            active: route.name === 'post-company-details',
            complete: false
        },
        {
            label: 'Preview Listing',
            link: 'post-preview',
            active: route.name === 'post-preview',
            complete: false
        },
        {
            label: 'Payment & Post',
            link: '',
            active: false,
            complete: false 
        },
    ])

    function setStepperClass(step) {
        if(step.active) {
            return 'bg-sky-500'
        }
        if(step.complete) {
            return 'bg-lime-500'
        }
        if(!step.active) {
            return 'bg-gray-300'
        }
    }
</script>

<template>

    <div class="flex justify-between bg-white p-4 mb-6 rounded-lg shadow-md sticky top-0 z-10">

        <div
            v-for="(step, index) in steps"
            :key="step.label"
            class="flex items-center gap-3">

            <div
                class="h-10 w-10 rounded-full text-white text-lg flex items-center justify-center"
                :class="setStepperClass(step)">
                
                <h2 v-if="!step.complete">{{ index + 1 }}</h2>
                <h2 v-else class="flex items-center justify-center">
                    <span class="material-symbols-outlined">done</span>
                </h2>
            </div>

            <p :class="{ 'text-lg text-gray-700' : step.active, 'text-gray-300' : !step.active }">
                <router-link class="font-semibold" :to="{ name: step.link }">
                    {{ step.label }}
                </router-link>
            </p>
        </div>
    </div>
    
</template>