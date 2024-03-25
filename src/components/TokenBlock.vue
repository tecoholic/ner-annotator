<template>
  <mark :class="'bg-' + backgroundColor">
    <component
      :is="'Token'"
      v-for="t in token.tokens"
      :id="'t' + t.start"
      :key="t.start"
      :token="t"
    />
    <span class="tag" @click="toggleSymbol">
      <i :class="symbolClass"></i>
      {{ token.label }}
      <q-btn
        icon="fa fa-times-circle"
        round
        flat
        size="xs"
        text-color="grey-7"
        @click.stop="$emit('remove-block', token.start)"
      />
    </span>
  </mark>
</template>

<script>
import Token from "./Token";

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
      symbolClass() {
        if (!this.userHasToggled)  {
          console.log("After loading symbolClass is human? ",this)
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
  console.log("TokenBlock created with humanOpinion:", this.humanOpinion);
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
