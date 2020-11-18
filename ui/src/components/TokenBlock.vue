<template>
  <mark>
    <Token :token="t" v-for="t in token.tokens" :key="t.start" />
    <span class="tag">
      {{ token.label }}
      <a class="delete is-small" @click="$emit('remove-block', token.start)"></a>
    </span>
  </mark>
</template>
<script>
import Token from "./Token";

export default {
  name: "TokenBlock",
  emits: ["remove-block"],
  data:function() {
    return {
      showClose: false,
    }
  },
  props: {
    token: {
      type: Object,
      requried: true
    }
  },
  components: {
    Token
  }
}
</script>

<style lang="scss">
mark {
  padding: 0.5rem;
  position: relative;
  background-color: burlywood;
  &::after {
    content: var(--tag);
    padding: 0.3rem;
    color: darkslategray;
    font-size: small;
  }
}
.close-btn {
  cursor: pointer;
  font-size: small;
  position: absolute;
  width: 1rem;
  height:1rem;
  padding-left: 0.2rem;
  border-radius: 50%;
  background-color: black;
  color: white;
}
.delete {
  margin-left: 10px;
}
</style>