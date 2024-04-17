
<template>
  <q-item clickable v-close-popup @click="promptForNameAndExport()">
    <q-item-section>Export</q-item-section>
  </q-item>
</template>
<script>

import { mapState } sfrom 'vuex'
import { exportFile } from './utils'

export default {
  name: 'ExportAnnotations',
  computed: {
    ...mapState(['annotations', 'classes']),
  },
  methods: {
    promptForNameAndExport() {
      const annotator = prompt('Please enter your name for the annotations export:')
      if (annotator) {
        this.generateJSONExport(annotator)
      } else {
        console.log('Export cancelled or name not provided.')
      }
    },

    async generateJSONExport(annotator) {
      // Enhanced output including annotator's name with each entity
      const output = {
        classes: this.classes.map((c, index) => ({
        id: index + 1,
        name: c.name,
        color: c.color
      })),
        annotations: this.annotations.map(annotation => {
          return {
            text: annotation.text,
            entities: annotation.entities.map(entity => {
              let history = entity[9]; // Assuming entity.history contains the array of history

              const state = entity[5] === 2 ? "Rejected" :
                            entity[5] === 1 ? "Accepted" : "Suggested";

              const newHistoryEntry = [
                state, 
                new Date().toISOString(), 
                annotator, 
                entity[3], // The class or label from entity
              ];

              // Append the new entry directly to the history array
              history.push(newHistoryEntry);

              return [
                entity[1], // start position
                entity[2], // end position
                entity[3], // label
                history // history array
              ];
            })
          };
        })
      };

      const jsonStr = JSON.stringify(output, null, 2); // Pretty print JSON
      await exportFile(jsonStr, `${annotator}-annotations.json`);
    },
  },
}
</script>

