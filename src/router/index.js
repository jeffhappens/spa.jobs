import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},

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
        component: () => import('../views/BrowseCompanies.vue')
    },

    {
        path: '/company/:uuid/:slug',
        name: 'company',
        component: () => import('../views/Company.vue')
    },

    {
        path: '/industries',
        name: 'industries',
        component: () => import('../views/Industries.vue')
    },

    {
        path: '/industries/:slug',
        name: 'industries-jobs',
        component: () => import('../views/IndustriesJobs.vue')
    },

    {
        path: '/post',
        name: 'post',
        beforeEnter: isAuthenticated,
        component: () => import('../views/PostListing.vue')
    },

    {
        path: '/post/job-details',
        name: 'post-job-details',
        beforeEnter: isAuthenticated,
        component: () => import('../views/PostListingJobDetails.vue')
    },

    {
        path: '/post/company-details',
        name: 'post-company-details',
        beforeEnter: isAuthenticated,
        component: () => import('../views/PostListingCompanyDetails.vue')
    },

    {
        path: '/post/preview-listing',
        name: 'post-preview',
        beforeEnter: isAuthenticated,
        component: () => import('../views/PostPreviewListing.vue')
    },

    {
        path: '/account',
        name: 'account',
        beforeEnter: isAuthenticated,
        component: () => import('../views/Account.vue')
    },

    {
        path: '/account/companies',
        name: 'my-companies',
        beforeEnter: isAuthenticated,
        component: () => import('../views/MyCompanies.vue')
    },

    {
        path: '/account/listings',
        name: 'my-listings',
        beforeEnter: isAuthenticated,
        component: () => import('../views/MyListings.vue')
    },
    {
        path: '/account/listings/edit/:uuid',
        name: 'edit-listing',
        beforeEnter: isAuthenticated,
        component: () => import('../views/EditListing.vue')
    },

    {
        path: '/account/companies/add',
        name: 'add-company',
        beforeEnter: isAuthenticated,
        component: () => import('../views/AddCompany.vue')
    },

    {
        path: '/account/companies/edit/:id',
        name: 'edit-company',
        beforeEnter: isAuthenticated,
        component: () => import('../views/EditCompany.vue')
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
        path: '/listing/:uuid/:slug',
        name: 'listing',
        component: () => import('../views/ListingView.vue')
    },
    {
        path: '/terms-of-service',
        name: 'terms-of-service',
        component: () => import('../views/TermsOfService.vue')
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: () => import('../views/PrivacyPolicy.vue')
    }


  ]
})


async function isAuthenticated(to, from , next) {
    
    // is there a user object stored?
    let userObj = localStorage.getItem('user')

    if(userObj) {

        try {
            const user = await axios.get(`${store.state.api_url_base}/api/user`)
            next()
        } catch(error) {
            next('/login')
        }
    } else {
        next('/login')
    }
}

export default router
