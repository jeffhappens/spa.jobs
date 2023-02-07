<script setup>
import { ref } from 'vue'

import axios from 'axios'

const posts = ref()

async function getPosts() {
    let { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?count=25')
    posts.value = data
}
getPosts()

</script>

<template>
    <div class="bg-white bg-opacity-10 p-4">
        <div class="max-w-screen-md mt-10 mb-24 mx-auto text-center">
            <h2 class="font-bold text-5xl mb-6">Job Board for Developers, Designers, and Marketers</h2>
            <p>Jobs is a curated job board of the best jobs for developers, designers and marketers in the tech industry.</p>
        </div>
    </div>


    <div class="flex gap-5 justify-between rounded-full max-w-screen-lg -mt-16 mx-auto bg-white bg-opacity-75 p-4">
        <div class="flex items-center justify-between bg-white w-2/3 p-3 rounded-full">
            <span class="material-symbols-outlined text-black">search</span>
            <input type="text" class="w-full p-2 text-xl text-black focus:outline-none" placeholder="Search for jobs by Name, Company, or Industry"  />
        </div>
        <div class="cursor-pointer flex items-center justify-between bg-white w-1/3 p-3 rounded-full">
            <div class="w-2/3 text-center text-gray-400 text-lg">Within 25 miles</div>
            <span class="material-symbols-outlined text-black text-2xl">arrow_drop_down</span>
        </div>
    </div>



    <div class="max-w-screen-lg mt-10 mt-24 mb-24 mx-auto bg-white bg-opacity-25 p-8">
        <div
            class="bg-white mb-8 p-4 text-black shadow-md"
            v-for="post in posts" :key="post.id">

            <h4 class="text-black text-lg">{{ post.title }}</h4>
            <p>{{ post.body }}</p>

        </div>
    </div>
</template>