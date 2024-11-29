import { Dark, Notify } from "quasar";
import iconSet from "quasar/icon-set/fontawesome-v6";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

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
