class TokenManager {
  /**
   *
   * @param {Array} tokens
   */
  constructor(tokens) {
    this.tokens = tokens.map((t) => ({
      type: "token",
      start: t[0],
      end: t[1],
      text: t[2],
    }));
    this.words = tokens.map(t => t[2]); 
  }

  /**
   * Creates a new token block with the tokens whose starts match the input
   * parameters
   *
   * @param {Number} start 'start' value of the token forming the start of the token block
   * @param {Number} end 'start' value of the token forming the end of the token block
   * @param {Number} _class the id of the class to highlight
   */
  addNewBlock(start, end, _class) {
    let selectedTokens = [];
    let newTokens = [];

    for (let i = 0; i < this.tokens.length; i++) {
      let t = this.tokens[i];
      if (t.start < start) {
        newTokens.push(t);
      } else if (t.type == "token" && t.start >= start && t.start <= end) {
        selectedTokens.push(t);
      } else if (t.start > start && selectedTokens.length) {
        newTokens.push({
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class && _class.name ? _class.name : "Unlabelled",
          classId: _class && _class.id ? _class.id : 0,
        });
        selectedTokens = [];
        newTokens.push(t);
      } else {
        newTokens.push(t);
      }
    }
    this.tokens = newTokens;
  }

  /**
   * Removes a token block and puts back all the tokens in their original position
   *
   * @param {Number} blockStart 'start' value of the token block to remove
   */
  removeBlock(blockStart) {
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
  }

  /**
   * Removes all the tag blocks and leaves only tokens
   */
  resetBlocks() {
    let newTokens = [];
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].type === "token") {
        newTokens.push(this.tokens[i]);
      } else {
        newTokens.push(...this.tokens[i].tokens);
      }
    }
    this.tokens = newTokens;
  }

  /**
   * Exports the tokens and the token blocks as annotations
   */
  exportAsAnnotation() {
    let entities = [];
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].type === "token-block") {
        let b = this.tokens[i];
        entities.push([b.start, b.end, b.label]);
      }
    }
    return entities;
  }
}

export default TokenManager;
