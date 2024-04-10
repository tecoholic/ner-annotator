<template>
  <q-item clickable v-close-popup @click="promptForNameAndExport()">
    <q-item-section>Export</q-item-section>
  </q-item>
</template>

<script>
/*
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


*/

import { mapState } from 'vuex'
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
      // Class colors mapping
      const classColors = {
        CHEMICAL: 'red-11',
        MATERIAL: 'blue-11',
        MATERIAL_STRUCTURE: 'light-green-11',
        APPLICATION: 'deep-orange-11',
        PROCESS_OR_TECHNIQUE: 'pink-11',
        PROPERTY: 'light-blue-11',
        MEASUREMENT: 'lime-11',
        ABBREVIATION: 'brown-11',
        COMPOUND: 'red-11',
      }

      // Transform classes to include id and color
      const transformedClasses = this.classes.map((className, index) => ({
        id: index + 1,
        name: className,
        color: classColors[className] || 'grey-11', // Default color if not specified
      }))

      // Transform annotations to match the desired structure
      // Transform annotations to match the desired structure
    const transformedAnnotations = this.annotations.map(annotation => {
      return [
        annotation.text,
        {
          entities: annotation.entities.map(entity => {
            console.log("ENTITY to transform:" ,entity);
            // Copy the existing history
            let history = [...entity[9]]; // Assuming entity[11] is the full history list
            console.log("ENTITY 8=",entity[8]);
            console.log("ENTITY 9 =",entity[9]);
            // Check if userHasToggles is true and add a new history entry if so
            if (entity[6]) {
              const newHistoryEntry = [
                entity[8], // Status from entity[9] 
                new Date().toISOString(), // Current date-time in ISO format
                annotator, // The annotator's name provided earlier
                entity[3], // The class or label from entity[5]
              ];
              history.push(newHistoryEntry); // Append the new entry to the history
            }
            
            return [
              entity[1], 
              entity[2], // Start position
              entity[3], // End position
              history // The updated history including the new entry where applicable
            ];
          })
        }
      ];
    });



      const output = {
        classes: transformedClasses,
        annotations: transformedAnnotations,
      }

      const jsonStr = JSON.stringify(output, null, 2) // Pretty print JSON
      await exportFile(jsonStr, `${annotator}-annotations.json`)
    },
  },
}
</script>




