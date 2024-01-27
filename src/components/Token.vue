<template>
  <span 
    v-if="token.type === 'token'"
    :id="'t' + token.start"
    class="token"
    :style="{'padding': $store.state.annotationPrecision == 'char' ? '0.25rem 0rem' : '0.25rem'}"
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