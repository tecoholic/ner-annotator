<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">NER Text Annotator</h1>
          <h2 class="subtitle">Annotate text for SpaCy NER Model traning</h2>
        </div>
      </div>
    </section>

    <section class="container tile is-parent">
      <LoadTextFile v-on:file-loaded="onFileLoaded" />
      <div class="tile"></div>
    </section>
  </div>
</template>

<script>
import LoadTextFile from "./LoadTextFile";

export default {
  name: "StartPage",
  emits: ["file-loaded"],
  components: {
    LoadTextFile,
  },
  methods: {
    onFileLoaded() {
      this.$emit("file-loaded");
    },
  },
};
</script>
