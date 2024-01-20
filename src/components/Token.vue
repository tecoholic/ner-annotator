<!--A token is a word. A token block is an annotation.
    When annotations are created, they replace the tokens
    within them in token-manager.js's tokens list. -->
<template>
  <span 
  v-if="token.type === 'token'"
  :id="'t' + token.start"
  class="token"
  :style="{'padding': this.$store.state.annotationPrecision == 'char' ? '0.25rem 0rem' : '0.25rem'}"
  >
    {{ token.text == " " ? "&nbsp;" : token.text }}
  </span>
</template>
<script>
export default {
  name: "Token",
  props: {
    token: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
  .token {
    font-size: large;
    display: inline-block;
    line-height: 3;
  }
</style>