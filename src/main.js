import { createApp } from "vue";
import { Quasar } from "quasar";
import "quasar/src/css/index.sass";

import App from "./App.vue";
import "es6-promise/auto";
import { createStore } from "vuex";
import store from "./store";

import quasarUserOptions from "./quasar-user-options";
import "@fontsource-variable/nunito";
import "./styles/quasar.scss";

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(createStore(store));

app.mount("#app");
