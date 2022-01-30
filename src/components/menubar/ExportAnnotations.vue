<template>
  <q-item clickable v-close-popup @click="generateJSONExport()">
    <q-item-section>Export</q-item-section>
  </q-item>
</template>

<script>
import { mapState } from "vuex";
import { save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { documentDir } from "@tauri-apps/api/path";

export default {
  name: "ExportAnnotations",
  computed: {
    ...mapState(["annotations", "classes"]),
  },
  methods: {
    async generateJSONExport() {
      const output = {
        classes: this.classes.map((c) => c.name),
        annotations: this.annotations,
      };
      const jsonStr = JSON.stringify(output);

      if (typeof window.rpc === "undefined") {
        let element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr)
        );
        element.setAttribute("download", "annotations.json");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        save({
          defaultPath: await documentDir(),
          filters: [
            { extensions: ["json"], name: "JSON Files (*.json)" },
            { name: "All files (*.*)", extensions: ["*"] },
          ],
        })
          .then((path) => {
            if (!path) return;
            if (!path.match(/.*\.json$/)) path += ".json";

            invoke("save_file", { filepath: path, contents: jsonStr })
              .then((msg) => alert(msg))
              .catch((e) => alert(e));
          })
          .catch((e) => console.log("Save cancelled.", e));
      }
    },
  },
};
</script>
