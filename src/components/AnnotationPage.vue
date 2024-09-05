<template>
  <div>
    <classes-block />
    <div
      class="q-pa-lg"
      style="height:60vh; overflow-y:scroll;"
    >
      <component
        :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
        v-for="t in tm.tokens"
        :id="'t' + t.start"
        :key="t.start"
        :token="t"
        :background-color="t.backgroundColor"
        @remove-block="onRemoveBlock"
      />
    </div>

    <div
      class="q-pa-md"
      style="border-top: 1px solid #ccc"
    >
      <q-btn
        color="red"
        outline
        class="q-mx-sm"
        label="Reset"
        @click="resetBlocks"
      />
      <q-btn
        class="q-mx-sm"
        :color="$q.dark.isActive ? 'grey-3' : 'grey-9'"
        outline
        :disabled="currentIndex == 0"
        label="Back"
        @click="backOneSentence"
      />
      <q-btn
        class="q-mx-sm"
        :color="$q.dark.isActive ? 'grey-3' : 'grey-9'"
        outline
        label="Skip"
        @click="skipCurrentSentence"
      />
      <q-btn
        class="q-mx-sm"
        color="green-7"
        outline
        label="Save"
        @click="saveTags"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Token from "./Token.vue";
import TokenBlock from "./TokenBlock.vue";
import ClassesBlock from "./ClassesBlock.vue";
import TokenManager from "./token-manager";
import TreebankTokenizer from "treebank-tokenizer";

export default {
  name: "AnnotationPage",
  components: {
    Token,
    TokenBlock,
    ClassesBlock,
  },
  data: function() {
    return {
      tm: new TokenManager([]),
      currentSentence: {},
      redone: "",
      tokenizer: new TreebankTokenizer(),
    };
  },
  computed: {
    ...mapState([
      "annotations",
      "classes",
      "currentClass",
      "currentIndex",
      "inputSentences",
      "enableKeyboardShortcuts",
      "annotationPrecision",
    ]),
  },
  watch: {
    inputSentences() {
      this.resetIndex();
      this.tokenizeCurrentSentence();
    },
    annotations() {
      if (this.currentAnnotation != this.annotations[this.currentIndex]) {
        this.tokenizeCurrentSentence();
      }
    },
    classes() {
      this.tokenizeCurrentSentence();
    },
    annotationPrecision() {
      this.tokenizeCurrentSentence();
    }
  },
  created() {
    if (this.inputSentences.length) {
      this.tokenizeCurrentSentence();
    }
    document.addEventListener("mouseup", this.selectTokens);
    document.addEventListener('keydown', this.keypress);
  },
  beforeUnmount() {
    document.removeEventListener("mouseup", this.selectTokens);
    document.removeEventListener("keydown", this.keypress);
  },
  methods: {
    ...mapMutations(["nextSentence", "previousSentence", "resetIndex"]),
    keypress(event) {
      if (!this.enableKeyboardShortcuts) {
        return
      }
      if (event.keyCode == 32) { // Space
        this.saveTags();
      } else if (event.keyCode == 39) { // right arrow
        this.skipCurrentSentence();
      } else if (event.keyCode == 37) { // left arrow
        this.backOneSentence();
      } else if (event.keyCode == 82 || event.keyCode == 27) { // r / R or ESC
        this.resetBlocks();
      }
      // stop event from bubbling up
      event.stopPropagation()
    },
    tokenizeCurrentSentence() {
      this.currentSentence = this.inputSentences[this.currentIndex];
      this.currentAnnotation = this.annotations[this.currentIndex];

      let tokens, spans;

      if (this.$store.state.annotationPrecision == "char") {
        tokens = this.currentSentence.text.split('');
        spans = []
        for (let i = 0; i < this.currentSentence.text.length; i++) {
          spans.push([i, i + 1]);
        }
      } else {
        tokens = this.tokenizer.tokenize(this.currentSentence.text);
        spans = this.tokenizer.span_tokenize(this.currentSentence.text);
      }

      let combined = tokens.map((t, i) => [spans[i][0], spans[i][1], t]);

      this.tm = new TokenManager(this.classes);
      this.tm.setTokensAndAnnotation(combined, this.currentAnnotation);
    },
    selectTokens() {
      let selection = document.getSelection();

      if (
        selection.anchorOffset === selection.focusOffset &&
        selection.anchorNode === selection.focusNode
      ) {
        return;
      }
      
      const rangeStart = selection.getRangeAt(0);
      const rangeEnd = selection.getRangeAt(selection.rangeCount - 1);
      let start, end;
      try {
        start = parseInt(rangeStart.startContainer.parentElement.id.replace("t", ""));
        let offsetEnd = parseInt(rangeEnd.endContainer.parentElement.id.replace("t", ""));
        end = offsetEnd + rangeEnd.endOffset;
        if(!end){
          /* 
            If last node of selected text contains tag name 
            Fetch the previous node
          */
          const endContainerParent = rangeEnd.endContainer.parentNode;
          const previousNode = endContainerParent.previousSibling;
          offsetEnd = parseInt(previousNode.parentElement.id.replace("t",""))
          end = offsetEnd + rangeEnd.endOffset;
        }
      } catch {
        return;
      }

      if (!this.classes.length && selection.anchorNode) {
        alert(
          "There are no Tags available. Kindly add some Tags before tagging."
        );
        selection.empty();
        return;
      }
      
      this.tm.addNewBlock(start, end, this.currentClass);
      selection.empty();
    },
    onRemoveBlock(blockStart) {
      this.tm.removeBlock(blockStart);
    },
    resetBlocks() {
      this.tm.resetBlocks();
    },
    skipCurrentSentence() {
      this.nextSentence();
      this.tokenizeCurrentSentence();
    },
    backOneSentence() {
      this.previousSentence();
      this.tokenizeCurrentSentence();
    },
    saveTags() {
      this.$store.commit("addAnnotation", {
        text: this.currentSentence.text,
        entities: this.tm.exportAsAnnotation(),
      });
      this.nextSentence();
      this.tokenizeCurrentSentence();
    },
  },
};
</script>
