<template>
  <div class="my-2">
    <button class="button is-danger" @click="generateJSONExport()">
      Export Annotations
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { documentDir } from "@tauri-apps/api/path";

export default {
  name: "Export",
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
    },
  },
};
</script>
