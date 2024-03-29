import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBars, faBuilding, faChevronRight, faCirclePlus, faEnvelope, faFlag, faLink, faList, faLocationDot, faMessage, faPaperPlane, faPenToSquare, faPlus, faSatelliteDish, faTriangleExclamation, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(faChevronRight, faPenToSquare, faLink, faLocationDot, faSatelliteDish, faXmark, faPlus, faBuilding, faTriangleExclamation, faTriangleExclamation, faPaperPlane, faMessage, faTwitter, faFacebook, faLinkedin, faBars, faUser, faList, faCirclePlus, faEnvelope, faFlag)


window.axios = axios
axios.defaults.withCredentials = true

import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
