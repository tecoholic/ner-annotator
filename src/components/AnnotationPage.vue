<template>
  <div>
    <classes-block />
    <div class="q-pa-lg">
      <component
        :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
        :id="'t' + t.start"
        v-for="t in tm.tokens"
        :token="t"
        :key="t.start"
        :backgroundColor="t.backgroundColor"
        @remove-block="onRemoveBlock"
      />
    </div>

    <div class="q-pa-md" style="border-top: 1px solid #ccc">
      <q-btn
        color="red"
        outline
        class="q-mx-md"
        @click="resetBlocks"
        label="Reset"
      />
      <q-btn
        class="q-mx-md"
        outline
        @click="skipCurrentSentence"
        label="Skip"
      />
      <q-btn
        class="q-mx-md"
        color="green"
        outline
        @click="saveTags"
        label="Save"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Token from "./Token";
import TokenBlock from "./TokenBlock";
import ClassesBlock from "./ClassesBlock.vue";
import TokenManager from "./token-manager";
import TreebankTokenizer from "treebank-tokenizer";

export default {
  name: "AnnotationPage",
  data: function() {
    return {
      tm: new TokenManager([]),
      currentSentence: {},
      currentIndex: 0,
      redone: "",
      tokenizer: new TreebankTokenizer(),
    };
  },
  components: {
    Token,
    TokenBlock,
    ClassesBlock,
  },
  computed: {
    ...mapState(["inputSentences", "classes", "annotations", "currentClass"]),
  },
  watch: {
    inputSentences() {
      this.currentIndex = 0;
      this.tokenizeCurrentSentence();
    },
  },
  created() {
    if (this.inputSentences.length) {
      this.tokenizeCurrentSentence();
    }
    document.addEventListener("mouseup", this.selectTokens);
  },
  beforeUnmount() {
    document.removeEventListener("mouseup", this.selectTokens);
  },
  methods: {
    tokenizeCurrentSentence() {
      if (this.currentIndex >= this.inputSentences.length) {
        // TODO show completed message
        alert("You have completed all the sentences");
        return;
      }
      this.currentSentence = this.inputSentences[this.currentIndex];

      let tokens = this.tokenizer.tokenize(this.currentSentence.text);
      let spans = this.tokenizer.span_tokenize(this.currentSentence.text);
      let combined = tokens.map((t, i) => [spans[i][0], spans[i][1], t]);
      this.tm = new TokenManager(combined);
    },
    selectTokens() {
      let selection = document.getSelection();

      if (
        selection.anchorOffset === selection.focusOffset &&
        selection.anchorNode === selection.focusNode
      )
        return;
      let startIdx, endIdx;
      try {
        startIdx = parseInt(
          selection.anchorNode.parentElement.id.replace("t", "")
        );
        endIdx = parseInt(
          selection.focusNode.parentElement.id.replace("t", "")
        );
      } catch (e) {
        console.log("selected text were not tokens");
        return;
      }

      if (!this.classes.length && selection.anchorNode) {
        alert(
          "There are no Tags available. Kindly add some Tags before tagging."
        );
        selection.empty();
        return;
      }

      this.tm.addNewBlock(startIdx, endIdx, this.currentClass);
      selection.empty();
    },
    onRemoveBlock(blockStart) {
      this.tm.removeBlock(blockStart);
    },
    resetBlocks() {
      this.tm.resetBlocks();
    },
    skipCurrentSentence() {
      this.currentIndex++;
      this.tokenizeCurrentSentence();
    },
    saveTags() {
      this.$store.commit("addAnnotation", [
        this.currentSentence.text,
        { entities: this.tm.exportAsAnnotation() },
      ]);
      this.currentIndex++;
      this.tokenizeCurrentSentence();
    },
  },
};
</script>
