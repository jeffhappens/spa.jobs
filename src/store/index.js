import { createStore } from 'vuex'

const store = createStore({
    state: {
        site_title: 'FLEX JOB LISTINGS',
        api_url_base: 'http://localhost:8000',

        listing: {
            title: '',
            type_id: '1',
            apply_link: 'https://',
            description: '',
            author_uuid: '',
            company_id: '',
            industry_id: '',
            uuid: '',
            company: {
                author: '',
                name: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                email: '',
                url: '',
                logo: '',
                industry_id: '',
                description: '',
            }
        },

        post_job_item: {
            label: 'POST A JOB FOR $99',
            destination: '/post/job-details'
        }
    },

    getters: {},

    mutations: {

        set_listing_value(state, data) {
            state.listing[data.field] = data.value
        },

        set_company_value(state, data) {
            state.listing.company[data.field] = data.value
        },
        set_company(state, data) {
            state.listing.company = data
        },

    },

    actions: {
        set_job_listing(context, listing) {
            context.commit('set_job_listing', listing)
        },

        SET_LISTING_VALUE(context, data) {
            context.commit('set_listing_value', data)
        },

        SET_COMPANY(context, data) {
            context.commit('set_company', data)
        },        

        SET_COMPANY_VALUE(context, data) {
            context.commit('set_company_value', data)
        },

    }
})

export default store