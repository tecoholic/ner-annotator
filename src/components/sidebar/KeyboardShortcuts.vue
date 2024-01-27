<template>
  <section>
    <br>
    <q-toggle
      v-model="enableKeyboardShortcuts"
      label="Keyboard Shortcuts"
      @click="enableKeyboardShortcutsChanged"
    />
    <q-icon
      style="margin-left: 5px; margin-top: 3px"
      :color="$q.dark.isActive ? 'grey-4' : 'grey-10'"
      name="far fa-question-circle"
      @click="showShortcutHelp = true"
    />
  </section>
  <q-dialog
    :model-value="showShortcutHelp"
    @hide="showShortcutHelp = false"
  >
    <q-card style="min-width: 100px; padding: 10px; border-radius: 10px">
      <q-card-section class="text-body1">
        <div class="column">
          <div
            class="row"
            style="height: 40px"
          >
            <div class="col-4">
              Num Keys:
            </div>
            <div class="col">
              Change classes
            </div>
          </div>
          <div
            class="row"
            style="height: 60px"
          >
            <div class="col-4">
              Space Bar:
            </div>
            <div class="col">
              Save and move to the next sentence
            </div>
          </div>
          <div
            class="row"
            style="height: 60px"
          >
            <div class="col-4">
              Right Arrow:
            </div>
            <div class="col">
              Skip and move to the next sentence
            </div>
          </div>
          <div
            class="row"
            style="height: 60px"
          >
            <div class="col-4">
              Left Arrow:
            </div>
            <div class="col">
              Go back to the previous sentence
            </div>
          </div>
          <div
            class="row"
            style="height: 60px"
          >
            <div class="col-4">
              Escape:
            </div>
            <div class="col">
              Discard changes to the current sentence
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
  
<script>
export default {
  name: "KeyboardShortcuts",
  data: function() {
    return {
      enableKeyboardShortcuts: false,
      showShortcutHelp: false,
    };
  },
  methods: {
    enableKeyboardShortcutsChanged() {
      this.$store.commit("setKeyboardShortcuts", this.enableKeyboardShortcuts);
    },
  },
};
</script>
  