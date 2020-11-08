<template>
  <div>
    <StartPage v-if="currentPage === 'start'" v-on:file-loaded="onFileLoaded" />
    <AnnotationPage v-if="currentPage === 'annotator'" />
  </div>
</template>

<script>
import StartPage from "./components/StartPage";
import AnnotationPage from "./components/AnnotationPage";

import "./assets/styles.scss";

export default {
  name: "App",
  data: function() {
    return {
      currentPage: "start",
    };
  },
  components: {
    StartPage,
    AnnotationPage,
  },
  methods: {
    onFileLoaded() {
      this.currentPage = "annotator";
    },
  },
};
</script>
