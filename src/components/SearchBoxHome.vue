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
                
                <span class="material-symbols-outlined text-[color:var(--p-orange)]">search</span>

                <input
                    v-model="searchParams.keyword"
                    type="text"
                    class="w-full rounded-full p-4 text-xl text-black border-0 focus:ring-0"
                    placeholder="Search by Job Title, Keyword, or Company Name"
                />

            </div>
            
            <!-- <div class="cursor-pointer flex items-center justify-between bg-white w-1/3 p-4 rounded-full shadow-sm">
                
                <span class="text-[color:var(--p-orange)] material-symbols-outlined">distance</span>
                
                <select v-model="searchParams.distance" class="w-full text-left text-xl text-gray-400 border-0 focus:ring-0">
                    <option v-for="radius in radii" :key="radius" :value="radius">
                        Within {{ radius }} Miles
                    </option>
                    <option value="unlimited">Remote / No Limit</option>
                </select>
            </div> -->
            <div class="bg-[color:var(--p-blue-md)] p-6 rounded-full shadow-sm">
                <button type="submit" class="px-3 text-xl text-white drop-shadow-sm">Search</button>
            </div>
        </form>
    </div>    
</template>