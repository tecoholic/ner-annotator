<template>
  <mark :class="['bg-' + backgroundColor, {'shadow-unreviewed': !userHasToggled, 'bg-red': !token.humanOpinion}]">
    <Token
      v-for="t in token.tokens"
      :key="t.start"
      :token="t"
    />
    <span class="tag">
      <!-- Toggle status cycle button -->
      <i v-if="this.currentPage==='review'" :class="symbolClass" @click="toggleSymbol"></i>
      {{ token.label }}
      <!-- Replace label button (double arrows) -->
      <q-btn
        icon="fa fa-exchange-alt"
        round
        flat
        size="xs"
        text-color="grey-7"
        title="Change label to currently selected label"
        @click="recordActionAndEmit('replace-block-label', token.start)"
      />
      <!-- Delete label button (X) -->
      <q-btn
        icon="fa fa-times-circle"
        round
        flat
        size="xs"
        text-color="grey-7"
        title="Delete annotation"
        @click.stop="recordActionAndEmit('remove-block', token.start)" 
      />
      <q-btn
        v-if="this.currentPage==='review'"
        :icon="reviewedIconClass"
        round
        flat
        size="xs"
        text-color="grey-9"
        title="Dark indicates that you have reviewed this annotation, light means you have not."
        @click.stop="toggleReviewed"
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
      default: 0
    }
  },
  data() {
    return {
      userHasToggled: false,
      suggestedState: false,
      isReviewed: false,
    };
  },
  computed: {
    ...mapState(["currentPage"]),
    symbolClass() {
      switch (this.isSymbolActive) {
        case 0: return "fas fa-minus-circle";
        case 1: return "fas fa-check-circle";
        case 2: return "fas fa-times-circle";
        default: return "fas fa-question-circle";
      }
    },
    reviewedIconClass() {
      return this.userHasToggled ? 'fas fa-square' : 'far fa-square';
    },
  },
  methods: {
    toggleSymbol() {
      this.recordAction('symbol-state', this.isSymbolActive);
      let nextState = (this.isSymbolActive + 1) % 3;
      this.userHasToggled = true;
      this.$emit('update-symbol-state', {
        tokenStart: this.token.start,
        newSymbolState: nextState
      });
    },
    toggleReviewed() {
      this.recordAction('review-state', this.isReviewed);
      this.isReviewed = !this.isReviewed;
      this.userHasToggled = true;  // Set userHasToggled to true when review state is toggled
    },
    recordAction(actionType, previousState) {
      const action = {
        type: actionType,
        tokenStart: this.token.start,
        previousState: previousState,
        newState: this[actionType === 'symbol-state' ? 'isSymbolActive' : 'isReviewed'],
        timestamp: Date.now()
      };
      this.$emit('record-undo', action);
    },
    recordActionAndEmit(action, payload) {
      this.recordAction(action, this.token);
      this.$emit(action, payload);
    },
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
.shadow-unreviewed {
  box-shadow: 0 0 10px 4px goldenrod;
}
.bg-red {
  box-shadow: 0 0 10px 4px red;
}
</style>
