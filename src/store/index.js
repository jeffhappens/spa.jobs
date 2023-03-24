import { createStore } from 'vuex'

const store = createStore({
    state: {
        site_title: 'FLEX JOB LISTINGS',
        api_url_base: 'http://localhost:8000',

        job_listing: {}
    },

    getters: {},

    mutations: {
        set_job_listing(state, listing) {
            state.job_listing = listing
        },

        set_company(state, company) {
            state.job_listing.company = company

        }
    },

    actions: {
        set_job_listing(context, listing) {
            context.commit('set_job_listing', listing)
        },

        set_company(context, company) {
            context.commit('set_company', company)
        }
    }



    
})

export default store