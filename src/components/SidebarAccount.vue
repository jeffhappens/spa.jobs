<template>
    <aside class="w-1/4">
        <div class="bg-white w-full shadow-md text-gray-800 rounded-lg">
            <ul class="p-2">
                <li class="px-4 py-2 flex items-center justify-between border-b border-gray-200">
                    <router-link to="/account" class="font-semibold">Account Details</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
                <li class="px-4 py-2 flex items-center justify-between border-b border-gray-200">
                    <router-link to="/account/listings" class="font-semibold">My Listings</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
                <li class="px-4 py-2 flex items-center justify-between">
                    <router-link to="/account/companies" class="font-semibold">My Companies</router-link>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
            </ul>
        </div>
    </aside>
</template>