import "./styles/quasar.scss";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import { Dark, Notify } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    dark: "auto",
  },
  plugins: {
    Dark,
    Notify,
  },
  iconSet: iconSet,
};
