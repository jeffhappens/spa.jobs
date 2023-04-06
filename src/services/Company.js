import { ref } from 'vue'
import { useStore } from 'vuex'

export async function getCompanies(page = 1) {

    const store = useStore()

    return new Promise((resolve, reject) => {

        const response = 
        try {
            await axios.get(`${store.state.api_url_base}/api/companies?page=${page}`)


        .catch((error) => {
            reject(error)
        })
        .then((response) => {
            resolve(response)
        })
        

    

        try {
            const { data } = await axios.get(`${store.state.api_url_base}/api/companies?page=${page}`)
            return data
            // companies.value = data
        } catch(err) {
            return err
            // errorMessage.value.status = true
            // errorMessage.value.message = 'Whoops! We encountered a problem while trying to fetch companies.'
        }
    // }

}