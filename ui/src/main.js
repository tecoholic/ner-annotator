import { createApp } from 'vue'
import App from './App.vue'
import 'es6-promise/auto'
import { createStore } from 'vuex'
import store from './store.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle)
library.add(faHourglassHalf)

const app = createApp(App)

app.use(createStore(store))

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
