<template>
  <q-header bordered>
    <div class="q-pa-sm q-pl-md row items-center">
      <!-- 
      <div class="cursor-pointer non-selectable">
        <span>
          Project
        </span>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup @click="promptForProject = true">
              <q-item-section>New Project</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Open Project</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Save Project</q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-close-popup>
              <q-item-section>Quit</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
      -->

      <div class="q-ml-md cursor-pointer non-selectable">
        <span>
          Annotations
        </span>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <export-annotations />
          </q-list>
        </q-menu>
      </div>

      <!--
      <div class="q-ml-md cursor-pointer non-selectable">
        <span>
          Tags
        </span>
        <q-menu>
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Export</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Import</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
      -->
    </div>
  </q-header>

  <q-dialog v-model="promptForProject" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Project Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="newProjectName"
          autofocus
          @keyup.enter="promptForProject = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Create Project" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ExportAnnotations from "./ExportAnnotations.vue";

export default {
  components: { ExportAnnotations },
  name: "MenuBar",
  data: function() {
    return {
      promptForProject: false,
      newProjectName: "",
    };
  },
};
</script>
