<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import Navigation from './components/Navigation.vue'
import Cookies from 'js-cookie'

const user = ref()

function setLoggedInUser(u) {
    user.value = u
    toast(`Welcome back ${u.name}!`, { autoClose: 2000 })
}

function logoutUser() {
    user.value = getLoggedInUser()
    toast('You are logged out', { autoClose: 2000 })
}

function getLoggedInUser() {

    return JSON.parse(localStorage.getItem('user'))
    
}
function notifyCompanyAdded() {
    toast('New Company Added', { autoClose: 2000 })
}
user.value = getLoggedInUser()

</script>

<template>
    <Navigation
        @user:logout="logoutUser"
        :user="user"
    />
    <RouterView
        @user:login="setLoggedInUser"
        @company:added="notifyCompanyAdded"
        class="flex-1"
    />
    <!-- <RouterView class="flex-1" /> -->
</template>
