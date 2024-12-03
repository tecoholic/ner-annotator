<template>
  <q-header bordered>
    <div class="q-pa-sm q-pl-md row items-center">
      <div>
        <q-avatar size="xs">
          <img :src="appIconUrl" />
        </q-avatar>
        <span class="q-ml-sm">
          <strong> NER Annotator </strong>
        </span>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        <span> File </span>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item v-close-popup clickable @click="pendingClick = $refs.file">
              <q-item-section>Open File</q-item-section>
              <input
                ref="file"
                type="file"
                accept=".txt"
                style="display: none"
                @change="openFile"
              />
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        <span> Annotations </span>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <export-annotations />
            <q-item
              v-close-popup
              clickable
              @click="pendingClick = $refs.file"
              :disable="currentPage === 'start'"
            >
              <q-item-section>Import</q-item-section>
              <input
                ref="file"
                type="file"
                accept=".json"
                style="display: none"
                @change="importAnnotations"
              />
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        <span> Tags </span>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item
              v-close-popup
              clickable
              @click="exportTags()"
              :disable="currentPage == 'start'"
            >
              <q-item-section>Export</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="$refs.file.click()"
              :disable="currentPage == 'start'"
            >
              <q-item-section>Import</q-item-section>
              <input
                ref="file"
                type="file"
                accept=".json"
                style="display: none"
                @change="importTags"
              />
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <q-space />

      <div class="q-ml-md">
        <q-icon
          color="white"
          :name="$q.dark.isActive ? 'fa fa-sun' : 'fa fa-moon'"
          class="cursor-pointer"
          @click="toggleDarkMode"
        />
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        <span>Help</span>

        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item v-close-popup clickable @click="showHelp = true">
              <q-item-section>How to use?</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              href="https://github.com/tecoholic/ner-annotator/discussions"
              target="_blank"
            >
              <q-item-section>Forum</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              href="https://github.com/tecoholic/ner-annotator/issues"
              target="_blank"
            >
              <q-item-section>Report Issue</q-item-section>
            </q-item>
            <q-separator />
            <q-item v-close-popup clickable @click="showAbout = true">
              <q-item-section>About</q-item-section>
            </q-item>
          </q-list>
        </q-menu>

        <about-dialog :show="showAbout" @hide="showAbout = false" />
        <help-dialog :show="showHelp" @hide="showHelp = false" />
      </div>
    </div>
  </q-header>

  <q-dialog v-model="promptForProject" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Project Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="newProjectName"
          dense
          autofocus
          @keyup.enter="promptForProject = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="Cancel" />
        <q-btn v-close-popup flat label="Create Project" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <exit-dialog
    :show="pendingClick != null"
    @hide="pendingClick = null"
    @confirm="pendingClick.click()"
  />
</template>

<script>
import ExportAnnotations from "./ExportAnnotations.vue";
import { mapState, mapMutations } from "vuex";
import { exportFile } from "./utils";
import { useQuasar } from "quasar";
import AboutDialog from "../AboutDialog.vue";
import ExitDialog from "../ExitDialog.vue";
import HelpDialog from "../HelpDialog.vue";
import AppIcon from "../../assets/icon_32.png";

export default {
  name: "MenuBar",
  components: { ExportAnnotations, AboutDialog, HelpDialog, ExitDialog },
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
  data: function () {
    return {
      promptForProject: false,
      newProjectName: "",
      showAbout: false,
      pendingClick: null,
      showHelp: false,
      appIconUrl: AppIcon,
    };
  },
  computed: {
    ...mapState(["annotations", "classes", "currentPage"]),
  },
  methods: {
    ...mapMutations([
      "loadClasses",
      "loadAnnotations",
      "setInputSentences",
      "clearAllAnnotations",
      "resetIndex",
      "switchToPage",
    ]),
    // Funtion that exports the tags to a JSON file
    exportTags: async function () {
      await exportFile(JSON.stringify(this.classes), "tags.json");
    },
    importTags: function (e) {
      let file = e.target.files[0];
      let filereader = new FileReader();
      filereader.onload = (ev) => {
        try {
          this.loadClasses(JSON.parse(ev.target.result));
          this.notify(
            "fa fa-check",
            `${this.classes.length} Tags imported successfully`,
            "positive"
          );
        } catch (e) {
          this.notify("fas fa-exclamation-circle", "Invalid file", "red-6");
        }
      };
      filereader.readAsText(file);
    },
    openFile: function (e) {
      let file = e.target.files[0];
      let filereader = new FileReader();
      filereader.onload = (ev) => {
        this.setInputSentences(ev.target.result);
        this.clearAllAnnotations();
      };
      filereader.readAsText(file);
      this.resetIndex();
      if (this.currentPage != "annotate") {
        this.switchToPage("annotate");
      }
    },
    importAnnotations: function (e) {
      let file = e.target.files[0];
      let filereader = new FileReader();
      filereader.onload = (ev) => {
        try {
          this.loadAnnotations(JSON.parse(ev.target.result));
          this.notify(
            "fa fa-check",
            `Annotations imported successfully`,
            "positive"
          );
        } catch (e) {
          this.notify("fas fa-exclamation-circle", "Invalid file", "red-6");
        }
      };
      filereader.readAsText(file);
    },
    toggleDarkMode: function () {
      this.$q.dark.toggle();
    },
  },
};
</script>
