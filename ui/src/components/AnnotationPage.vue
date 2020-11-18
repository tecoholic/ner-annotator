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
              v-for="t in tm.tokens"
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
import TokenManager from './token-manager';

export default {
  name: "AnnotationPage",
  data: function() {
    return {
      tm: new TokenManager([]),
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
          this.tm = new TokenManager(res.data.tokens); 
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
      this.tm.addNewBlock(startIdx, endIdx);
      selection.empty();
    },
    onRemoveBlock(blockStart) {
      this.tm.removeBlock(blockStart);
    },
  },
};
</script>

<style lang="scss">
#editor {
  padding: 1rem;
}
</style>
