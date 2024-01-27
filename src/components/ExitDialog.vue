<template>
  <q-dialog
    :model-value="show"
    @hide="$emit('hide')"
  >
    <q-card style="max-width: 400px; padding: 10px; border-radius: 10px">
      <q-card-section>
        <div class="text-h5">
          Are you sure you want to close this file?
        </div>
      </q-card-section>

      <q-card-section class="text-body1">
        <p>All changes made to this file will be lost.</p>
        If you haven't exported the annotations, please do so before closing the file.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="Cancel"
          color="red"
          @click="$emit('hide')"
        />
        <q-btn
          v-close-popup
          flat
          label="OK"
          color="light-blue"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ExitDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hide", "confirm"],
};
</script>
