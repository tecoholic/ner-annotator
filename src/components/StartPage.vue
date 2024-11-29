<template>
  <div class="q-mx-auto q-my-xl" style="max-width: 600px">
    <h1 class="text-h4 q-mb-sm text-center">NER Text Annotator</h1>
    <p class="text-caption text-center">
      Annotate text for spaCy NER Model training
    </p>

    <div class="q-my-xl q-py-md column">
      <div class="row justify-between items-center">
        <div>
          <p
            :class="[
              'text-h6 q-my-md',
              $q.dark.isActive ? 'text-grey-4' : 'text-grey-7',
            ]"
          >
            Select your file(s), then press 'Begin'!
          </p>
          <p
            :class="[
              'text-subtitle1 q-my-md',
              $q.dark.isActive ? 'text-grey-4' : 'text-grey-7',
            ]"
          >
            Hint: You can also drag and drop files into this window!
          </p>
        </div>
        <q-btn
          v-close-popup
          outline
          label="Begin!"
          :color="!textFile ? 'grey-7' : 'blue'"
          :disable="!textFile"
          @click="onConfirmation"
        />
      </div>
      <div class="row items-center">
        <q-file
          class="col-5 q-mx-sm"
          v-model="textFile"
          accept=".txt"
          filled
          label="Text file"
          :bg-color="$q.dark.isActive ? 'black-1' : 'light-blue-1'"
          @rejected="fileSelectionError('Invalid text file')"
        >
          <template #prepend>
            <q-icon name="fas fa-upload" />
          </template>
        </q-file>
        <q-file
          class="col-5 q-mx-sm"
          v-model="annotationFile"
          accept=".json"
          filled
          label="(Optional) Annotations"
          :bg-color="$q.dark.isActive ? 'black-1' : 'light-blue-1'"
          @rejected="fileSelectionError('Invalid annotation file')"
        >
          <template #prepend>
            <q-icon name="fas fa-upload" />
          </template>
        </q-file>
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
        icon: "fas fa-exclamation-circle",
        message: msg,
        color: "red-6",
        position: "top",
        timeout: 2000,
        actions: [{ label: "Dismiss", color: "white" }],
      });
    },
  },
};
</script>
