<template>
  <div class="q-mx-auto q-my-xl" style="max-width: 600px">
    <h1 class="text-h4 q-mb-sm text-center">NER Text Annotator</h1>
    <p class="text-subtitle1 text-center">
      Annotate text for spaCy NER Model training
    </p>

    <div class="q-my-xl q-py-md column">
      <div class="row justify-around q-my-xl">
        <q-file
          class="col-5 q-mx-sm"
          v-model="textFile"
          accept=".txt"
          filled
          label="Open text file"
          color="primary"
          @rejected="
            fileSelectionError(
              'Only text files (.txt) can be used for creating annotations.'
            )
          "
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-file-text" />
          </template>
        </q-file>
        <div>
          <q-file
            class="col-5 q-mx-sm"
            v-model="annotationFile"
            accept=".json"
            filled
            label="Load Annotations"
            color="teal"
            @rejected="fileSelectionError('Invalid annotation file')"
          >
            <template #prepend>
              <q-icon name="fas fa-file-code" />
            </template>
          </q-file>
          <p class="text-caption q-mx-sm q-my-sm text-grey-8">Optional</p>
        </div>
      </div>

      <div class="row">
        <p class="col-12 q-my-md text-blue-7 text-center">
          <q-icon name="fa fa-lightbulb" />
          You can also drag and drop files into this window!
        </p>
      </div>
      <div class="row justify-center q-my-xl">
        <q-btn
          v-close-popup
          label="Start Annotating"
          class="full-width"
          color="primary"
          @click="onConfirmation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "StartPage",
  emits: ["file-loaded"],
  data() {
    return {
      textFile: null,
      annotationFile: null,
    };
  },
  methods: {
    ...mapMutations(["setInputSentences", "loadAnnotations"]),
    onConfirmation() {
      try {
        let reader = new FileReader();
        reader.addEventListener("load", (event) => {
          this.setInputSentences(event.target.result);
        });
        reader.readAsText(this.textFile);
      } catch (e) {
        this.fileSelectionError("Invalid text file");
        return;
      }

      if (!this.annotationFile) {
        this.$emit("file-loaded");
        return;
      }

      try {
        let reader = new FileReader();
        reader.addEventListener("load", (event) => {
          this.loadAnnotations(JSON.parse(event.target.result));
        });
        reader.readAsText(this.annotationFile);
      } catch (e) {
        this.fileSelectionError("Invalid annotation file");
        return;
      }

      this.$emit("file-loaded");
    },
    fileSelectionError(msg) {
      this.$q.notify({
        type: "negative",
        icon: "fas fa-explosion",
        message: msg,
        position: "center",
        timeout: 5000,
        actions: [{ label: "Dismiss", color: "white" }],
      });
    },
  },
};
</script>
