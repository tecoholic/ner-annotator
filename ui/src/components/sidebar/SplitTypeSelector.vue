<template>
  <section>
    <div class="control">
      <label class="label">
        Text separator
      </label>
      <div class="select">
        <select
          name="split_type"
          id="split_type"
          v-model="splitType"
          @select="onSelect"
          :disabled="annotations.length"
        >
          <option value="newline">New Line</option>
          <option value="emptyline">An Empty Line</option>
          <option value="custom">Custom String</option>
        </select>
      </div>
    </div>

    <div class="field my-2" v-if="splitType === 'custom'">
      <div class="control">
        <input
          type="text"
          class="input"
          v-model="customSeparator"
          @change="separatorChanged"
          :disabled="annotations.length"
        />
      </div>
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
      set(value) {
        switch (value) {
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
