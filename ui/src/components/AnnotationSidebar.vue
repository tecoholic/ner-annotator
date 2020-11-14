<template>
  <nav class="panel">
    <p class="panel-heading">
      Annotating {{ current.id + 1 }}/{{ inputSentences.length }}
    </p>
    <div
      v-for="sentence in visibleSentences"
      :key="sentence.id"
      class="panel-block"
      :class="{ 'has-background-info-light': current.id === sentence.id }"
    >
      <span
        class="is-size-7 is-single-line"
        :class="{
          'has-text-weight-light': current.id < sentence.id,
          'has-text-info': current.id === sentence.id,
        }"
      >
        {{ sentence.id + 1 }}. {{ sentence.text }}
      </span>

      <span class="icon has-text-success" v-if="current.id > sentence.id">
        <font-awesome-icon icon="check-circle" />
      </span>
      <span class="icon has-text-info" v-if="current.id === sentence.id">
        <font-awesome-icon icon="hourglass-half" />
      </span>
    </div>
    <div class="panel-block" v-if="current.id + 10 < inputSentences.length">
      <div class="is-block">...</div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AnnotationSidebar",
  props: {
    current: {
      type: Object,
      required: true,
    },
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
