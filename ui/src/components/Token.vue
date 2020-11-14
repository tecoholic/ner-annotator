<template>
  <span v-if="token.type === 'token'" class="token">
    {{ token.text }}
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
    padding: 0.25rem;
    line-height: 3;
  }
</style>