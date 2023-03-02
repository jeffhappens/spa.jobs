<script setup>

    import { ref } from 'vue'
    const emit = defineEmits(['resultsUpdated'])
    const radii = ref(['25', '50', '75'])
    
    const searchParams = ref({
        keyword: '',
        distance: 25
    })

    const updateResults = async () => {
        let { data } = await axios.post('http://localhost:8000/api/search', searchParams.value)
        emit('resultsUpdated', { d: data, term: searchParams.value.keyword })
    }

</script>

<template>

    <div class="relative flex flex-col">

        <form @submit.prevent="updateResults" class="p-4 flex items-center gap-5 shadow-lg absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 bg-opacity-80 w-3/4 rounded-full">
        
            <div class="flex items-center justify-between bg-white flex-1 p-2 rounded-full shadow-sm">
                
                <input
                    v-model="searchParams.keyword"
                    type="text"
                    class="w-full rounded-full px-6 py-4 text-xl text-black border-0 focus:ring-0"
                    placeholder="Search by Job Title, Keyword, or Company Name"
                />

            </div>
            
            <!-- <div class="bg-[color:var(--p-blue-md)] p-6 rounded-full shadow-sm">
                <button type="submit" class="px-3 text-xl text-white drop-shadow-sm">Search</button>
            </div> -->
        </form>
    </div>    
</template>