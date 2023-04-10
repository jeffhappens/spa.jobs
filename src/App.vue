<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import Navigation from './components/Navigation.vue'
import Cookies from 'js-cookie'
import SiteFooter from '#/SiteFooter.vue'

const store = useStore()
const user = ref()

function setLoggedInUser(u) {
    user.value = u
    notify(`Welcome back ${u.name}!`)
}

function logoutUser() {
    user.value = getLoggedInUser()
    notify('You are logged out')
}

async function getLoggedInUser() {
    try {
        const { data } = await axios.get(`${store.state.api_url_base}/api/user`)
        localStorage.setItem('user', JSON.stringify(data))
        user.value = JSON.parse(localStorage.getItem('user'))
    } catch(error) {
        localStorage.removeItem('user')
    }
}

function notify(message) {
    toast(message, { autoClose: 2000 })
}

getLoggedInUser()
</script>

<template class="text-gray-700">
    <Navigation
        
        @user:logout="logoutUser"
        :user="user"
    />
    <RouterView
        @user:login="setLoggedInUser"
        @company:added="notify('New Company Added')"
        @listing:updated="notify('Listing updated')"
        @emailVerified="notify('Email Successfully Verified. You are now logged in.')"
        class="flex-1"
    />

    <SiteFooter />
</template>
