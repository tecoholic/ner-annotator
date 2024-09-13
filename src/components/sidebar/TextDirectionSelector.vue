<template>
  <section>
    <div class="q-px-md q-pb-md">
      <q-select
        v-model="textDirection"
        outlined
        :bg-color="$q.dark.isActive ? 'dark' : 'white'"
        :options="directionOptions"
        :map-options="true"
        label="Text Direction"
      />
    </div>
  </section>
</template>

<script>

export default {
  name: "TextDirectionSelector",
  data() {
    return {
      directionOptions: [
        { label: "Right to Left", value: "rtl" },
        { label: "Left to Right", value: "ltr" },
      ],
    };
  },
  computed: {
    textDirection: {
      get() {
        switch (this.$store.state.textDirection) {
          case "rtl":
            return "rtl";
          case "ltr":
            return "ltr";
          default:
            return "ltr";
        }
      },
      set(option) {
        switch (option.value) {
          case "rtl":
            this.$store.commit("setTextDirection", "rtl");
            break;
          case "ltr":
            this.$store.commit("setTextDirection", "ltr");
            break;
          default:
            this.$store.commit("setTextDirection", "ltr");
            break;
        }
      },
    },
  },
};
</script>
