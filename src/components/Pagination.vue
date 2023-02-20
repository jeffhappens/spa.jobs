<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps(['data'])
const emit = defineEmits(['paginate'])

function paginate(index, data) {

    const total = data.links.length - 1
    const isPrevButton = index === 0
    const isNextButton = index === total
    
    let nextPage

    if(!isPrevButton && !isNextButton) {

        if(index === data.current_page) { // Prevent duplicate network requests
            return false
        }
        emit('paginate', index)
    }

    if(isPrevButton) {
        if(data.current_page > 1) {
            emit('paginate', data.current_page -1 )
        }
    }
    if(isNextButton) {
        if(data.current_page < data.last_page) {
            emit('paginate', data.current_page +1 )
        }
    }
    
}
</script>

<template>
    <div class="flex items-center justify-between gap-3 mb-6 text-sky-400 rounded-sm">
        <p class="text-gray-400">Page {{ data.current_page }} of {{ data.last_page }}</p>
        <div class="flex gap-2">
        <div
            v-for="(link, index) in data.links"
            :key="link.label"
            class="bg-white py-2 px-4 flex items-center justify-between rounded-sm shadow-sm cursor-pointer select-none"
            :class="{ 'bg-[color:var(--p-blue-md)] text-white' : index === data.current_page }"
            
            v-html="link.label"
            @click="paginate(index, data)">
        </div>
        </div>
    </div>
</template>