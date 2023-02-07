<template>
    <div class="relative flex flex-col h-36">
        
        <div class="bg-[color:var(--p-blue-drk)] flex-1"></div>
        <div class="bg-gray-50 flex-1"></div>

        <div class="p-4 flex items-center gap-10 shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 bg-opacity-90 w-2/3 rounded-full">
            
            <div class="flex items-center justify-between bg-white w-2/3 p-3 rounded-full shadow-sm">
                
                <span class="material-symbols-outlined text-black">search</span>
                <input type="text" class="w-full p-2 text-xl text-black focus:outline-none" placeholder="Search for jobs by Title, Keyword, or Company Name" />

            </div>
            
            <div class="cursor-pointer flex items-center justify-between bg-white w-1/3 p-5 rounded-full shadow-sm">

                <div class="w-2/3 text-center text-gray-400 text-lg">Within 25 miles</div>
                <span class="material-symbols-outlined text-black text-2xl">arrow_drop_down</span>

            </div>
        </div>
    </div>    
</template>