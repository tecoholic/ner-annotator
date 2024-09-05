<template>
  <mark :class="'bg-' + backgroundColor">
    <component
      :is="'Token'"
      v-for="t in token.tokens"
      :id="'t' + t.start"
      :key="t.start"
      :token="t"
    />
    <span class="tag">
      {{ token.label }}
      <q-btn
        icon="fa fa-times-circle"
        round
        flat
        size="xs"
        text-color="grey-7"
        @click="$emit('remove-block', token.start)"
      />
    </span>
  </mark>
</template>
<script>
import Token from "./Token.vue";

export default {
  name: "TokenBlock",
  components: {
    Token,
  },
  props: {
    token: {
      type: Object,
      requried: true,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
  },
  emits: ["remove-block"],
  data: function() {
    return {
      showClose: false,
    };
  },
};
</script>

<style lang="scss">
@import 'quasar/src/css/variables';

mark {
  padding: 0.5rem;
  position: relative;
  background-color: burlywood;
  border: 1px solid $grey-7;
  border-radius: 0.35rem;
}
.tag {
  background-color: whitesmoke;
  padding: 4px 0 4px 8px;
  border: 1px solid grey;
  border-radius: 0.35rem;
  font-size: x-small;
}
.close-btn {
  cursor: pointer;
  font-size: small;
  position: absolute;
  width: 1rem;
  height: 1rem;
  padding-left: 0.2rem;
  border-radius: 50%;
  background-color: black;
  color: white;
}
.delete {
  margin-left: 10px;
}
</style>
