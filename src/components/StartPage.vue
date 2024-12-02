<template>
  <div class="q-mx-auto q-my-xl" style="max-width: 600px">
    <h1 class="text-h4 q-mb-sm text-center">NER Text Annotator</h1>
    <p class="text-subtitle1 text-center">
      Annotate text for spaCy NER Model training
    </p>

    <div class="q-my-xl q-py-md column">
      <div class="row justify-around q-my-xl">
        <div class="col-5 q-mx-sm">
          <q-file
            v-model="textFile"
            accept=".txt"
            filled
            label="Load a text file"
            color="primary"
            :label-color="highlightTextFileInput ? 'red-8' : ''"
            :bg-color="highlightTextFileInput ? 'red-1' : ''"
            @rejected="
              fileSelectionError(
                'Only text files (.txt) can be used for creating annotations.'
              )
            "
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-file-text" :class="highlightTextFileInput ? 'text-red-8' : ''"/>
            </template>
          </q-file>

          <p :class="['text-caption q-mx-sm q-my-sm', $q.dark.isActive ? 'text-grey-6' : 'text-grey-8']">
            You can also drag and drop a file into this window!
          </p>
        </div>
        <div class="col-5 q-mx-sm">
          <q-file
            v-model="annotationFile"
            accept=".json"
            filled
            label="Load annotations"
            color="primary"
            @rejected="fileSelectionError('Invalid annotation file')"
          >
            <template #prepend>
              <q-icon name="fas fa-file-code" />
            </template>
          </q-file>
          <p :class="['text-caption q-mx-sm q-my-sm', $q.dark.isActive ? 'text-grey-6' : 'text-grey-8']">
            Optional
          </p>
        </div>
      </div>

      <div class="row justify-center q-my-xl">
        <q-btn
          v-close-popup
          label="Start Annotating"
          color="primary"
          class="q-py-md"
          @click="onConfirmation"
        />
      </div>
    </div>

    <div class="row">
      <p :class="['col-12 text-sm text-center', $q.dark.isActive ? 'text-grey-6' : 'text-grey-8']">
        <q-icon name="fa fa-hand-holding-heart" class="q-mr-sm" />
        Wondering what to do? See <strong>Help</strong>
        <q-icon name="fa fa-arrow-right" class="q-mx-xs" />
        <strong>How to Use?</strong>
      </p>
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
      highlightTextFileInput: false,
    };
  },
  watch: {
    textFile() {
      this.highlightTextFileInput = false;
    },
  },
  methods: {
    ...mapMutations(["setInputSentences", "loadAnnotations"]),
    onConfirmation() {
      this.highlightTextFileInput = false;
      if (!this.textFile) {
        this.fileSelectionError(
          "No text file selected. Open a text file to start annotating."
        );
        this.highlightTextFileInput = true;
        return;
      }
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
        icon: "fas fa-file-circle-exclamation",
        message: msg,
        position: "center",
        timeout: 5000,
        actions: [{ label: "Dismiss", color: "white" }],
      });
    },
  },
};
</script>
