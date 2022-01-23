<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">NER Text Annotator</h1>
          <h2 class="subtitle">Annotate text for spaCy NER Model training</h2>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="container">
        <div class="columns">
          <div class="column">
            <LoadTextFile class="pt-6" v-on:file-loaded="onFileLoaded" />
          </div>
        </div>
      </div>
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
