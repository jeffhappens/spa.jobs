<script setup>
    import Label from '#/form/Label.vue'
    import Select from '#/form/Select.vue'
    import ErrorMessage from '#/form/ErrorMessage.vue'
    import { ref, defineProps, defineEmits } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from 'vuex'

    // import { setCompanyId } from '@/services/listing.js'

    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const emit = defineEmits(['setCompanyId'])

    const user = JSON.parse(localStorage.getItem('user'))
    const props = defineProps({
        companies: Array,
        errors: Array
    })

    function setCompany(id) {
        const editListing = route.name === 'edit-listing'
        const postListing = route.name === 'post-job-details'

        const company = props.companies.find(v => {
            return v.id == id
        })

        if(editListing) {
            emit('setCompanyId', id)
        } else {
            store.dispatch('SET_COMPANY', company)
            updateState('company_id', company.id)
            updateState('industry_id', company.industry_id)
        }
    }
    
    function updateState(field, value) {
        store.dispatch('SET_LISTING_VALUE', { field, value })
    }
    
</script>
<template>

    <div v-if="companies?.length">
        <Label for="" helpText="Select the company for this job." value="Your Company" />

        <div class="md:flex items-center gap-5">
            <Select
                class="md:w-1/3"
                v-model="store.state.listing.company_id"
                @update:modelValue="setCompany($event)">
                <option value="">Select a Company</option>

                <option
                    v-for="company in companies"
                    :key="company.id"
                    :value="company.id">
                    {{ company.name }}
                </option>
            </Select>

            <p
                class="text-gray-600">Or you can
                <router-link class="text-sky-500 font-semibold underline" :to="{ name: 'add-company' }">Add Another Company</router-link>
            </p>
        </div>
        <ErrorMessage v-if="errors?.company_id" text="Please select a company" />
    </div>

    <div v-else class="border-2 border-gray-300 p-4 rounded-lg">

        <Label for="" helpText="First, we need to add a company to your account." value="Your Company" />

         <button
            class="text-white bg-sky-500 p-2 my-2 font-semibold"
             @click="router.push({ name: 'add-company' })">
             <font-awesome-icon class="text-white" icon="fa-solid fa-plus" />
             ADD A COMPANY
         </button>
    </div>
</template>
