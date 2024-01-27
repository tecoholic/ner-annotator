<template>
  <section>
    <div class="q-pa-md">
      <q-select
        v-model="splitType"
        outlined
        :bg-color="$q.dark.isActive ? 'dark' : 'white'"
        :options="splitOptions"
        :map-options="true"
        label="Text Seperator"
      />
    </div>

    <div
      v-if="splitType === 'custom'"
      class="q-px-md"
    >
      <q-input
        v-model="customSeparator"
        label="Separator"
        bg-color="white"
        outlined
        :disabled="annotations.length"
        @change="separatorChanged"
      />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SpitTypeSelector",
  data() {
    return {
      customSeparator: "---",
      splitOptions: [
        { label: "New Line", value: "newline" },
        { label: "An Empty Line", value: "emptyline" },
        { label: "Custom String", value: "custom" },
      ],
    };
  },
  computed: {
    ...mapState(["annotations"]),
    splitType: {
      get() {
        switch (this.$store.state.separator) {
          case "\n":
            return "newline";
          case "\n\n":
            return "emptyline";
          default:
            return "custom";
        }
      },
      set(option) {
        switch (option.value) {
          case "newline":
            this.$store.commit("setSeparator", "\n");
            break;
          case "emptyline":
            this.$store.commit("setSeparator", "\n\n");
            break;
          default:
            this.$store.commit("setSeparator", "---");
            break;
        }
      },
    },
  },
  methods: {
    separatorChanged() {
      this.$store.commit("setSeparator", this.customSeparator);
    },
  },
};
</script>
