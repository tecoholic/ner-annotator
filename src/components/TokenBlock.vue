<template>
  <mark :class="'bg-' + backgroundColor">
    <component
      :is="'Token'"
      :id="'t' + t.start"
      v-for="t in token.tokens"
      :token="t"
      :key="t.start"
    />
    <span class="tag">
      {{ token.label }}
      <!-- Replace label button (double arrows) -->
      <q-btn
        icon="fa fa-exchange-alt"
        round
        flat
        size="xs"
        text-color="grey-7"
        title="Change label to currently selected label"
        @click="$emit('replace-block-label', token.start)"
      />
      <!-- Delete label button (X) -->
      <q-btn
        icon="fa fa-times-circle"
        round
        flat
        size="xs"
        text-color="grey-7"
        title="Delete annotation"
        @click="$emit('remove-block', token.start)"
      />
    </span>
  </mark>
</template>
<script>
import Token from "./Token";

export default {
  name: "TokenBlock",
  emits: ["remove-block", "replace-block-label"],
  data: function() {
    return {
      showClose: false,
    };
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
  components: {
    Token,
  },
};
</script>

<style lang="scss">
// mark is the highlight behind an annotated section of text
mark {
  padding: .5rem;
  position: relative;
  background-color: burlywood;
  border: 1px solid $grey-7;
  border-radius: 0.35rem;
}
// tag is the label/class tag on an annotated section of text
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
