<template>
  <nav class="px-3">
    <progress-bar :completed="current.id" :total="inputSentences.length" />
    <export />
  </nav>
</template>

<script>
import { mapState } from "vuex";
import Export from './sidebar/Export.vue';
import ProgressBar from './sidebar/ProgressBar.vue';

export default {
  name: "AnnotationSidebar",
  props: {
    current: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProgressBar,
    Export
  },
  computed: {
    ...mapState(["inputSentences"]),
    visibleSentences() {
      let start = this.current.id;
      if (start + 10 > this.inputSentences.length) {
        start = this.inputSentences.length - 10;
      }
      let end = start + 10;
      return this.inputSentences.slice(start, end);
    },
  },
};
</script>

<style lang="scss">
.is-single-line {
  width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
