<template>
  <div
    class="fullscreen"
    style="overflow-y:scroll;"
    @dragover.prevent="onDragEnter"
    @dragenter="onDragEnter"
    @dragleave.self="onDragLeave"
    @drop.stop.prevent="onDrop"
  >
    <div :style="{'pointer-events': overlayActive ? 'none' : 'auto'}">
      <q-layout view="hHh lpR fFf">
        <menu-bar v-if="currentPage !== 'start'" />

        <q-drawer
          :model-value="currentPage !== 'start'"
          bordered
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-2'"
        >
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
      <drag-n-drop-overlay :style="{'visibility': overlayActive && pendingFileDrop == null ? 'visible' : 'hidden'}" />
      <exit-dialog
        :show="pendingFileDrop != null && currentPage != 'start'"
        @hide="pendingFileDrop = null"
        @confirm="processFileDrop()"
      />
    </div>
  </div>
</template>

<script>
import MenuBar from "./components/menubar/MenuBar.vue";
import StartPage from "./components/StartPage.vue";
import AnnotationPage from "./components/AnnotationPage.vue";
import AnnotationSidebar from "./components/AnnotationSidebar.vue";
import DragNDropOverlay from "./components/DragNDropOverlay.vue";
import ExitDialog from "./components/ExitDialog.vue";
import { mapState, mapMutations } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "LayoutDefault",
  components: {
    MenuBar,
    StartPage,
    AnnotationPage,
    AnnotationSidebar,
    DragNDropOverlay,
    ExitDialog
  },
  setup() {
    const $q = useQuasar();
    return {
      notify(icon, message, level) {
        $q.notify({
          icon,
          message,
          color: level,
          position: "top",
          timeout: 2000,
          actions: [
            {
              label: "Dismiss",
              color: "white",
            },
          ],
        });
      },
    };
  },
  data() {
    return {
      currentPage: "start",
      overlayActive: false,
      pendingFileDrop: null,
    };
  },
  computed: {
    ...mapState(["annotations", "classes"]),
  },
  methods: {
    ...mapMutations(["loadClasses", "loadAnnotations", "setInputSentences", "clearAllAnnotations", "resetIndex"]),
    switchToPage(page) {
      this.currentPage = page;
    },
    onDragEnter() {
      this.overlayActive = true;
    },
    onDragLeave() {
      this.overlayActive = false;
    },
    onDrop(event) {
      this.overlayActive = false;
      this.pendingFileDrop = event.dataTransfer.files[0]
      if (this.currentPage == "start")  this.processFileDrop();
    },
    processFileDrop() {
      let reader = new FileReader();
      reader.onload = (ev) => {
        let file = ev.target.result;
        try {
          if (this.currentPage == "start")  throw new Error("Not a text file.");
          this.loadAnnotations(JSON.parse(file));
          this.notify(
            "fa fa-check",
            `Annotations imported successfully`,
            "positive"
          );
        } catch (e) {
          try {
            if (this.currentPage == "start")  throw new Error("Not a text file.");
            this.loadClasses(JSON.parse(file));
            this.notify(
              "fa fa-check",
              `${this.classes.length} Tags imported successfully`,
              "positive"
            );
          } catch (e) {
            try {
              this.setInputSentences(file);
              this.clearAllAnnotations();
              this.resetIndex();
              this.switchToPage('annotate');
            } catch (e) {
              this.notify("fas fa-exclamation-circle", "Invalid file", "red-6");
            }
          }
        }
      };
      reader.readAsText(this.pendingFileDrop);
      this.pendingFileDrop = null;
    },
  },
};
</script>
