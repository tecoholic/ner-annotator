<template>
  <div class="q-mx-auto q-my-xl" style="max-width: 600px">
    <h5 class="text-h5">NER Text Annotator</h5>
    <p class="text-subtitle1 text-grey-7">
      Annotate text for spaCy NER Model training
    </p>

    <div class="q-my-xl q-py-xl">
      <q-file
        v-model="textFile"
        accept=".txt"
        filled
        @update:model-value="onFileSelected"
        label="Open a text file to begin"
        bg-color="light-blue-1"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-upload" />
        </template>
      </q-file>
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
    };
  },
  methods: {
    ...mapMutations(["setInputSentences"]),
    onFileSelected(file) {
      let reader = new FileReader();
      reader.addEventListener("load", (event) => {
        this.setInputSentences(event.target.result);
        this.$emit("file-loaded");
      });
      reader.readAsText(file);
    },
  },
};
</script>
