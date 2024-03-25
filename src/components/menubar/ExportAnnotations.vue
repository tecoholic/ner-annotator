<template>
  <q-item clickable v-close-popup @click="promptForNameAndExport()">
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
    promptForNameAndExport() {
      // Trigger a prompt to ask for the user's name
      const annotator = prompt("Please enter your name for the annotations export:");
      if (annotator) {
        this.generateJSONExport(annotator);
      } else {
        console.log("Export cancelled or name not provided.");
      }
    },

    async generateJSONExport(annotator) {
      // Enhanced output including annotator's name with each entity
      const output = {
        classes: this.classes.map((c) => c.name ),
        annotations: this.annotations.map(a => ({
          text: a.text,
          entities: a.entities.map(entity => ({
            ...entity,
            annotator, // Adding the annotator's name to each entity
            date: new Date().toISOString(), // Optionally include the current date and time
          }))
        }))
      };

      const jsonStr = JSON.stringify(output); // Pretty print JSON
      await exportFile(jsonStr, `${annotator}-annotations.json`);
    },
  },
};
</script>
