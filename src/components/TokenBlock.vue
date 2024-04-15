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
      <!-- Toggle status cycle button -->
      <i v-if="this.currentPage==='review'" :class="symbolClass" @click="toggleSymbol"></i>
      {{ token.label }}
      <!-- Replace label button (double arrows) -->
      <!-- v-if="this.currentPage==='annotate'" -->
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
      <!-- Note: changed from @click to @click.stop -->
      <q-btn
        icon="fa fa-times-circle"
        round
        flat
        size="xs"
        text-color="grey-7"
        title="Delete annotation"
        @click.stop="$emit('remove-block', token.start)" 
      />
    </span>
  </mark>
</template>

<script>
import Token from "./Token";
import { mapState } from "vuex";

export default {
  name: "TokenBlock",
  components: {
    Token,
  },
  props: {
  token: Object,
  backgroundColor: String,
  humanOpinion: Boolean,
  isSymbolActive: {
    type: Number,
    default: 0  // Default to 0 which should correspond to 'Suggested'
  }
},
data() {
  return {
    userHasToggled: false,
    suggestedState: false, // This can be kept if it's used elsewhere in your component
  };
},
  computed: {
      ...mapState(["currentPage"]),
      symbolClass() {
    // Correct the mapping of states to icons
    switch (this.isSymbolActive) {
      case 0: return "fas fa-minus-circle";  // Suggested
      case 1: return "fas fa-check-circle"; // Accepted
      case 2: return "fas fa-times-circle"; // Rejected
      default: return "fas fa-question-circle";  // Default or unknown state
    }
    },
    },
    methods: {
  toggleSymbol() {
    let nextState = (this.isSymbolActive + 1) % 3;
    this.userHasToggled = true;
    this.$emit('update-symbol-state', {
      tokenStart: this.token.start,
      newSymbolState: nextState
    });
  }
},
    created() {
},
};
</script>

<style lang="scss">
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
