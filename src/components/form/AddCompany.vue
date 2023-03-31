<script setup>
    import Label from '#/form/Label.vue'
    import Select from '#/form/Select.vue'
    import ErrorMessage from '#/form/ErrorMessage.vue'
    import { ref, defineProps } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const router = useRouter()
    const store = useStore()
    const props = defineProps({
        companies: Array,
        errors: Array
    })
</script>
<template>

    <div v-if="companies?.length">
        <Label for="" helpText="Select the company for this job." value="Your Company" />

        <div class="flex items-center gap-5">
            <Select
                class="w-1/3"
                :class="{ 'border border-red-600' : errors?.company_id }"
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
