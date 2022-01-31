<template>
  <q-layout view="hHh lpR fFf">
    <menu-bar v-if="currentPage !== 'start'" />

    <q-drawer :model-value="currentPage !== 'start'" bordered class="bg-grey-2">
      <annotation-sidebar />
    </q-drawer>

    <q-page-container>
      <start-page
        v-if="currentPage === 'start'"
        @file-loaded="switchToPage('annotate')"
      />
      <annotation-page v-if="currentPage === 'annotate'" />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuBar from "./components/menubar/MenuBar.vue";
import StartPage from "./components/StartPage.vue";
import AnnotationPage from "./components/AnnotationPage.vue";
import AnnotationSidebar from "./components/AnnotationSidebar.vue";

export default {
  name: "LayoutDefault",

  data() {
    return {
      currentPage: "start",
    };
  },
  components: {
    MenuBar,
    StartPage,
    AnnotationPage,
    AnnotationSidebar,
  },
  methods: {
    switchToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>
