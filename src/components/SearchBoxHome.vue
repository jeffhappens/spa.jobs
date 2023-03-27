<script setup>
    import { ref } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const emit = defineEmits(['resultsUpdated'])
    
    const searchParams = ref({
        keyword: '',
        distance: 25
    })

    const searchResults = ref(false)

    const clearResults = async () => {

        searchResults.value = false
        searchParams.value.keyword = ''

        emit('resultsCleared')

    }

    const updateResults = async () => {
        let { data } = await axios.post(`${store.state.api_url_base}/api/search`, searchParams.value)
        searchResults.value = true
        emit('resultsUpdated', { data, term: searchParams.value.keyword })
    }

</script>

<template>

    <div class="relative flex flex-col">

        <form @submit.prevent="updateResults" class="p-4 flex items-center gap-5 shadow-lg absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 bg-opacity-80 w-3/4 rounded-full">
        
            <div @click="clearResults" class="flex items-center justify-between bg-white flex-1 p-2 rounded-full shadow-sm">
                
                <input
                    v-model="searchParams.keyword"
                    type="text"
                    class="w-4/5 rounded-full px-6 py-4 text-xl text-black border-0 focus:ring-0"
                    placeholder="Search by Job Title, Keyword, or Company Name"
                />

                <div v-if="searchResults" class="flex items-center justify-end mr-2 cursor-pointer">
                    <font-awesome-icon class="text-black text-4xl mr-2" icon="fa-solid fa-xmark" />
                    <p class="text-black">Clear Results</p>
                </div>



            </div>
            
        </form>
    </div>    
</template>