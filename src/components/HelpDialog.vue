<template>
  <q-dialog :model-value="show" persistent maximized>
    <q-card>
      <q-bar>
        <q-space />
        <q-btn
          dense
          flat
          icon="fa fa-close"
          v-close-popup
          @click="$emit('hide')"
        >
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-h4">How to use the NER Annotator?</div>
      </q-card-section>
      <q-card-section>
        <div :class="[$q.dark.isActive ? 'bg-dark' : 'bg-grey-1', 'q-pa-lg']">
          <div class="q-mx-auto" style="max-width: 600px">
            <q-timeline>
              <q-timeline-entry
                subtitle="Step 1"
                title="Load your text file with contents to annotate"
                icon="fa fa-upload"
                color="blue"
              >
                <q-img
                  src="/assets/step-1.png"
                  spinner-color="white"
                  class="rounded-borders"
                  style="border: 1px solid #ccc; width: 80%"
                />
                <p class="text-subtitle q-my-md">
                  <q-icon name="fa fa-star" color="amber" />
                  <strong> Tips to prepare the text file </strong>
                </p>
                <ul>
                  <li>Break your content in paragraphs or passages</li>
                  <li>
                    Maintain a consistent seperator between the passages. <br />
                    e.g., a newline, an empty line or a text seperator like
                    <code>---</code>
                  </li>
                  <li>
                    For large datasets, break the text into smaller files and
                    tag them seperately
                  </li>
                </ul>
              </q-timeline-entry>
              <q-timeline-entry
                subtitle="Step 2"
                title="Create some tags and start tagging your text"
                icon="fa fa-tag"
                color="pink"
              >
                <q-img
                  src="/assets/step-2.png"
                  spinner-color="white"
                  class="rounded-borders"
                  style="border: 1px solid #ccc"
                />
                <ul class="q-my-md">
                  <li>
                    Use the <strong>New Tag</strong> button to create new tags
                  </li>
                  <li>
                    Use the <strong>Edit Tag</strong> button to remove unwanted
                    tags
                  </li>
                  <li>
                    Click the <strong>Save</strong> button once you are done
                    annotating an entry and to move to the next one
                  </li>
                  <li>
                    Adjust the <strong>Text Seperator</strong> break your
                    content correctly into entries
                  </li>
                  <li>
                    Use the <strong>Tags</strong> menu to Export/Import tags to
                    share with your team
                  </li>
                </ul>
              </q-timeline-entry>
              <q-timeline-entry
                subtitle="Step 3"
                title="Download your annotations as a JSON file that can be used for training"
                icon="fa fa-download"
                color="green"
              >
                <q-img
                  src="/assets/step-3.png"
                  spinner-color="white"
                  class="rounded-borders"
                  style="border: 1px solid #ccc; width: 70%"
                />
              </q-timeline-entry>

              <q-timeline-entry
                subtitle="Finally"
                title="Convert to DocBin format and use it for training"
                icon="fa fa-file-archive"
                color="purple"
              >
                <p>
                  See the spaCy documentation
                  <a
                    :class="
                      $q.dark.isActive ? 'text-light-blue-4' : 'text-dark-blue'
                    "
                    href="https://spacy.io/api/data-formats#json-input"
                  >
                    here
                  </a>
                  on how to convert the annotations from JSON to DocBin format.
                </p>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hide"],
};
</script>

<style lang="css">
ul {
  list-style: square;
}
li {
  margin-top: 0.25rem;
}
</style>
