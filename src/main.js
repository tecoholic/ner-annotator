import { createApp } from "vue";
import App from "./App.vue";
import "es6-promise/auto";
import { createStore } from "vuex";
import store from "./store";

import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import './assets/styles.scss';
import './styles/quasar.scss';
import './styles/quasar.variables.scss';
import 'quasar/src/css/index.sass';

const app = createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(createStore(store));

app.mount("#app");
