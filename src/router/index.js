import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../views/ForgotPassword.vue')
    },
    {
        path: '/password-reset/:token',
        name: 'password-reset',
        component: () => import('../views/PasswordReset.vue')
    },

    {
        path: '/faq',
        name: 'faq',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/companies',
        name: 'companies',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/post',
        name: 'post',
        component: () => import('../views/Register.vue')
    },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
        path: '/listing',
        name: 'listing',
        component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
