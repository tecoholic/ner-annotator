import { createApp } from "vue";
import App from "./App.vue";
import "es6-promise/auto";
import { createStore } from "vuex";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileAlt,
  faPlusSquare,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFileAlt);
library.add(faPlusSquare);
library.add(faTrash);
library.add(faEdit);

const app = createApp(App);

app.use(createStore(store));

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
