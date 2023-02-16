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

        <form @submit.prevent="updateResults" class="p-4 flex items-center gap-10 shadow-lg absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 bg-opacity-80 w-3/4 rounded-full">
        
            <div class="flex items-center justify-between bg-white w-2/3 p-2 rounded-full shadow-sm">
                
                <span class="material-symbols-outlined text-[color:var(--p-orange)]">search</span>
                <input v-model="searchParams.keyword" type="text" class="w-full p-2 text-xl text-black focus:outline-none" placeholder="Search by Job Title, Keyword, or Company Name" />

            </div>
            
            <div class="cursor-pointer flex items-center justify-between bg-white w-1/3 p-4 rounded-full shadow-sm">
                
                <span class="text-[color:var(--p-orange)] material-symbols-outlined">distance</span>
                
                <select v-model="searchParams.distance" class="w-full text-left text-xl text-gray-400">
                    <option v-for="radius in radii" :key="radius" :value="radius">
                        Within {{ radius }} Miles
                    </option>
                    <option value="unlimited">Remote / No Limit</option>
                </select>
            </div>
            <div class="bg-[color:var(--p-blue-md)] p-4 rounded-full shadow-sm">
                <button type="submit" class="px-3 text-xl text-white drop-shadow-sm">Search</button>
            </div>
        </form>
    </div>    
</template>