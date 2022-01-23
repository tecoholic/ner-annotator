<template>
  <div class="field">
    <div class="file is-centered is-primary has-name is-boxed my-4">
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
            <font-awesome-icon icon="file-alt" />
          </span>
          <span class="file-label">
            Select file to start annotating
          </span>
        </span>
      </label>
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
