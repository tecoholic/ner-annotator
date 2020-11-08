import { createApp } from 'vue'
import App from './App.vue'
import 'es6-promise/auto'
import { createStore } from 'vuex'
import store from './store.js'

const app = createApp(App)

app.use(createStore(store))

app.mount('#app')
