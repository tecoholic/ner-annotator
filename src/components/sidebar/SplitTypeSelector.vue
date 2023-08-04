<template>
  <section>
    <div class="q-pa-md">
      <q-select
        outlined
        :bg-color="$q.dark.isActive ? 'dark' : 'white'"
        v-model="splitType"
        :options="splitOptions"
        :map-options="true"
        label="Text Seperator"
      />
    </div>

    <div class="q-px-md" v-if="splitType === 'custom'">
      <q-input
        label="Separator"
        bg-color="white"
        outlined
        v-model="customSeparator"
        @change="separatorChanged"
        :disabled="annotations.length"
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
