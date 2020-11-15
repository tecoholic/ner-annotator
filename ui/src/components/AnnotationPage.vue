<template>
  <div class="columns is-desktop">
    <div class="column is-one-fifth">
      <AnnotationSidebar :current="currentSentence" />
    </div>
    <div class="column">
      <div class="panel m-4">
        <div class="panel-heading">
          <classes-block />

        </div>
        <div class="panel-block">
          <div id="editor">
            <component
              :is="t.type === 'token' ? 'Token' : 'TokenBlock'"
              :id="'t' + t.start"
              v-for="t in tokens"
              :token="t"
              :key="t.start"
              @remove-block="onRemoveBlock"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "../axios";
import Token from "./Token";
import TokenBlock from "./TokenBlock";
import AnnotationSidebar from "./AnnotationSidebar";
import ClassesBlock from './ClassesBlock.vue';

export default {
  name: "AnnotationPage",
  data: function() {
    return {
      tokens: [],
      currentSentence: {},
      redone: "",
    };
  },
  components: {
    Token,
    TokenBlock,
    AnnotationSidebar,
    ClassesBlock,
  },
  computed: {
    ...mapState(["inputSentences", "classes", "annotations"]),
  },
  created() {
    if (this.inputSentences.length) {
      this.currentSentence = this.inputSentences[0];
      axios
        .post("/tokenize", this.currentSentence)
        .then((res) => {
          this.tokens = res.data.tokens.map((t) => ({
            type: "token",
            start: t[0],
            end: t[1],
            text: t[2],
          }));
        })
        .catch((err) => alert(err));
    }

    document.addEventListener("mouseup", this.selectTokens);
  },
  methods: {
    selectTokens() {
      let selection = document.getSelection();
      if (selection.anchorOffset === selection.focusOffset && selection.anchorNode === selection.focusNode)
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

      let selectedTokens = [];
      let newTokens = [];
      for (let i = 0; i < this.tokens.length; i++) {
        let t = this.tokens[i];
        if (t.start < startIdx) {
          newTokens.push(t);
        } else if (
          t.type == "token" &&
          t.start >= startIdx &&
          t.start <= endIdx
        ) {
          selectedTokens.push(t);
        } else if (t.start > startIdx && selectedTokens.length) {
          newTokens.push({
            type: "token-block",
            start: selectedTokens[0].start,
            end: selectedTokens[selectedTokens.length - 1].end,
            tokens: selectedTokens,
          });
          selectedTokens = [];
          newTokens.push(t);
        } else {
          newTokens.push(t);
        }
      }
      this.tokens = newTokens;
      selection.empty();
    },
    onRemoveBlock(blockStart) {
      let newTokens = [];
      for (let i = 0; i < this.tokens.length; i++) {
        if (
          this.tokens[i].type === "token-block" &&
          this.tokens[i].start === blockStart
        ) {
          newTokens.push(...this.tokens[i].tokens);
        } else {
          newTokens.push(this.tokens[i]);
        }
      }
      this.tokens = newTokens;
    },
  },
};
</script>

<style lang="scss">
#editor {
  padding: 1rem;
}
</style>
