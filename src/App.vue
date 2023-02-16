<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'

const user = ref()

function setLoggedInUser(u) {
    user.value = u
}
</script>

<template>
    <Navigation :user="user" />
    <RouterView
        @user:login="setLoggedInUser"
        class="flex-1"
    />
</template>
