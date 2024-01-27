<template>
  <q-item
    v-close-popup
    clickable
    @click="generateJSONExport()"
  >
    <q-item-section>Export</q-item-section>
  </q-item>
</template>

<script>
import { mapState } from "vuex";
import { exportFile } from "./utils";

export default {
  name: "ExportAnnotations",
  computed: {
    ...mapState(["annotations", "classes"]),
  },
  methods: {
    async generateJSONExport() {
      const output = {
        classes: this.classes.map((c) => c.name),
        annotations: this.annotations.map((a) => ([
          a.text,
          {entities: a.entities}
        ])),
      };
      const jsonStr = JSON.stringify(output);
      await exportFile(jsonStr, "annotations.json");
    },
  },
};
</script>
