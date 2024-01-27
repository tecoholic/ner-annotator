<template>
  <q-dialog
    :model-value="show"
    @hide="$emit('hide')"
  >
    <q-card style="min-width: 400px; padding: 10px; border-radius: 10px">
      <q-card-section>
        <div class="text-h6">
          NER Annotator
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p><strong>Version: </strong>{{ version }}</p>
        <p>
          <strong>Source: </strong>
          <a href="https://github.com/tecoholic/ner-annotator">
            Github Repository
          </a>
        </p>
        <p>
          <strong>Author:</strong>
          @tecoholic (<a href="https://github.com/tecoholic">Github</a>,
          <a href="https://github.com/tecoholic">Twitter</a>)
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="OK"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "AboutDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hide"],
  data: function() {
    return {
      // eslint-disable-next-line no-undef
      version: APPLICATION_VERSION,
    };
  },
};
</script>

<style></style>
