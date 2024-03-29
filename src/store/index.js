import { createStore } from 'vuex'

const store = createStore({
    state: {
        site_title: 'FJL',
        api_url_base: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://api.flexjoblistings.com',

        payment_link_url: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_8wM041fpEbUZ8b6bII' : 'https://buy.stripe.com/00g14M2Br93q89O8wx',

        listing: {
            title: '',
            type_id: '1',

            apply_link: {
                type: 'url',
                icon: 'link',
                value: 'https://',
            },

            // apply_link: 'https://',
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
            routeName: 'post-job-details',
            destination: '/post/job-details'
        }
    },

    getters: {},

    mutations: {

        set_apply_link_value(state, data) {
            state.listing.apply_link = data
        },
        update_apply_link(state, data) {
            state.listing.apply_link.value = data
        },

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

        SET_APPLY_LINK_VALUE(context, data) {
            context.commit('set_apply_link_value', data)
        },
        UPDATE_APPLY_LINK(context, data) {
            context.commit('update_apply_link', data)
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