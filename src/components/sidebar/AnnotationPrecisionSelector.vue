<template>
  <section>
    <div class="q-px-md q-pb-md">
      <q-select
        v-model="precisionType"
        outlined
        :bg-color="$q.dark.isActive ? 'dark' : 'white'"
        :options="precisionOptions"
        :map-options="true"
        label="Annotation Precision"
      />
    </div>
  </section>
</template>

<script>

export default {
  name: "AnnotationPrecisionSelector",
  data() {
    return {
      precisionOptions: [
        { label: "Word Level", value: "word" },
        { label: "Character Level", value: "char" },
      ],
    };
  },
  computed: {
    precisionType: {
      get() {
        switch (this.$store.state.annotationPrecision) {
          case "word":
            return "word";
          case "char":
            return "char";
          default:
            return "word";
        }
      },
      set(option) {
        switch (option.value) {
          case "word":
            this.$store.commit("setAnnotationPrecision", "word");
            break;
          case "char":
            this.$store.commit("setAnnotationPrecision", "char");
            break;
          default:
            this.$store.commit("setAnnotationPrecision", "word");
            break;
        }
      },
    },
  },
};
</script>
