<template>
  <div class="tile box">
    <div class="tile-body">
      <h3 class="title">Load Text File</h3>
      <p>
        Load strings from text file and generate JSON suitable for
        <strong>Spacy</strong> NER training
      </p>
      <div class="file has-name is-boxed mt-4">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="textfile"
            accept=".txt"
            @change="onFileSelected"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "LoadTextFile",
  emits: ["file-loaded"],
  methods: {
    ...mapMutations(["setInputSentences"]),
    onFileSelected(e) {
      let files = e.target.files;
      if (!files.length) return;

      let reader = new FileReader();
      reader.addEventListener("load", (event) => {
        this.setInputSentences(event.target.result);
        this.$emit("file-loaded");
      });
      reader.readAsText(files[0]);
    },
  },
};
</script>
