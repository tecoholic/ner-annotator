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
      <q-btn v-if="this.currentPage==='annotate'"
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
  },
  data() {
    return {
        // Initial state
        isSymbolActive: false,
        userHasToggled: false, // Tracks if the user has interacted with the token
      };
    },
  computed: {
      ...mapState(["currentPage"]),
      symbolClass() {
        if (!this.userHasToggled)  {
          // Initial icon state: circle only if humanOpinion is false, otherwise cross
          return !this.humanOpinion ? "fas fa-circle" : "fas fa-times-circle";
        } else {
          // Once toggled, switch between checkmark and cross
          return this.isSymbolActive ? "fas fa-check-circle" : "fas fa-times-circle";
        }
      },
    },
    methods: {
      toggleSymbol() {
        if (this.token.initiallyNLP && !this.userHasToggled) {
          // If initially set by NLP and user hasn't toggled yet, allow toggle to false
          this.isSymbolActive = false;
        } else {
          // Normal toggle behavior
          this.isSymbolActive = !this.isSymbolActive;
        }
        this.userHasToggled = true;
      },
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
