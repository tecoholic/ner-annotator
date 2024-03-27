class TokenManager {
  /**
   *
   * @param {Array} tokens
   */
  constructor(classes) {
    this.classes = classes
    this.tokens = []; // Initialize tokens array
  }

  setTokensAndAnnotation(tokens, currentAnnotation) {
    // Initialize tokens with provided annotation data
    this.tokens = tokens.map((t) => ({
      type: "token",
      start: t[0],
      end: t[1],
      text: t[2],
      humanOpinion: true, // Default humanOpinion to true for all initial tokens
    }));
    this.words = tokens.map(t => t[2]);

    if (currentAnnotation != undefined) {
      // reset prevoius annotation state
      for (let i = 0; i < currentAnnotation.entities.length; i++) {
        var start = currentAnnotation.entities[i][0];
        var end = currentAnnotation.entities[i][1];
        var entityName = currentAnnotation.entities[i][2];
        var entityClass = this.classes.find(c => c.name.toUpperCase() === entityName.toUpperCase())
        if (!entityClass) {
          entityClass = {"name": entityName};
        }
        this.addNewBlock(start, end, entityClass, true, name === "nlp");
      }
    }
  }

  /**
   * Creates a new token block with the tokens whose starts match the input
   * parameters
   *
   * @param {Number} start 'start' value of the token forming the start of the token block
   * @param {Number} end 'start' value of the token forming the end of the token block
   * @param {Number} _class the id of the class to highlight
   * @param {Boolean} isHumanOpinion Seperate nlp vs human made annotation

   */
  addNewBlock(_start, _end, _class, humanOpinion, initiallyNLP = false, isLoaded, name="name", status ="suggested") {
    // Directly apply humanOpinion to the block structure
    let block = {
      type: "token-block",
      start: _start,
      end: _end,
      name: name,
      label: _class.name,
      humanOpinion: humanOpinion,
      initiallyNLP: initiallyNLP,
      userHasToggled: false, // Ensure it's set for the new block
      isSymbolActive: false, // Ensure it's set for the new block
      isSuggested: false,
      isLoaded: isLoaded,
      status: status,
      tokens: this.tokens.filter(token => token.start >= _start && token.end <= _end),
      backgroundColor: _class.color || null,
    };
    console.log("addNewBlock's opinion: ", humanOpinion);
    let selectedTokens = [];
    let newTokens = [];
  
    let selectionStart = _end < _start ? _end : _start;
    let selectionEnd = _end > _start ? _end : _start;
  
    for (let i = 0; i < this.tokens.length; i++) {
      let currentToken = this.tokens[i];
      if (currentToken.end < selectionStart) {
        // token is before the selection
        newTokens.push(currentToken);
      } else if (currentToken.end > selectionStart && currentToken.start < selectionEnd) {
        // token is inside the selection
        if (currentToken.type == "token-block") {
          if (currentToken.label.toUpperCase() == _class.name.toUpperCase()) {
            // tokens are from the same class
            selectedTokens.push(...currentToken.tokens);
          } else {
            // tokens are from different class
            let tokensBeforeSelection = [];
            let tokensAfterSelection = [];
            let oldTokens = currentToken.tokens;
            for (let j = 0; j < oldTokens.length; j++) {
              let oldToken = oldTokens[j];
              if (oldToken.end <= selectionStart) {
                tokensBeforeSelection.push(oldToken);
              } else if (oldToken.end > selectionStart && oldToken.start < selectionEnd) {
                selectedTokens.push(oldToken);
              } else if (oldToken.start >= selectionEnd) {
                tokensAfterSelection.push(oldToken);
              }
            }
  
            // Append new blocks with necessary attributes for before and after the selection
            appendNewBlock(tokensBeforeSelection, currentToken, newTokens);
            appendNewBlock(selectedTokens, _class, newTokens, true); // Append selected tokens with updated attributes
            appendNewBlock(tokensAfterSelection, currentToken, newTokens);
  
            selectedTokens = []; // Reset selectedTokens for potential next use
          }
        } else if (currentToken.type == "token") {
          selectedTokens.push(currentToken);
        }
      } else if (currentToken.start >= selectionEnd && selectedTokens.length) {
        // token is first after the selection
        appendNewBlock(selectedTokens, _class, newTokens, true); // Append selected tokens with updated attributes
        selectedTokens = []; // Ensure selected tokens are cleared after use
        newTokens.push(currentToken);
      } else {
        newTokens.push(currentToken);
      }
    }
  
    // Append block at the end if there are remaining selected tokens
    if (selectedTokens.length) {
      newTokens.push(block);
      appendNewBlock(selectedTokens, _class, newTokens, true); // Append remaining selected tokens with updated attributes
    }
  
    // Update the tokens array with new tokens
    this.tokens = newTokens;
    function appendNewBlock(tokens, _class, tokensArray, updateAttributes = false) {
      if (tokens.length) {
        let newBlock = {
          type: "token-block",
          start: tokens[0].start,
          end: tokens[tokens.length - 1].end,
          name: name,
          tokens: tokens,
          label: _class.name,
          classId: _class.id || 0,
          backgroundColor: _class.color || null,
          // Set these attributes for all token-blocks, updating existing blocks as needed
          initiallyNLP: updateAttributes ? initiallyNLP : false,
          userHasToggled: false,
          isSymbolActive: false,
          isLoaded: isLoaded,
          status: status,
        };
        tokensArray.push(newBlock);
      }
  }
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
    const currentDate = new Date();
    const dateFormatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const timeFormatter = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = dateFormatter.format(currentDate);
    const time = timeFormatter.format(currentDate);
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].type === "token-block") {
        let b = this.tokens[i];
        console.log("export As annotations this is ", b);
        entities.push([b.name, date, time, b.start, b.end, b.label, b.initiallyNLP, b.isSymbolActive, b.userHasToggled, b.isLoaded,b.status]);
      }
    }
    return entities;
  }

  // Returns a token-block given its starting index, else returns null
  getBlockByStart(start) {
    for (let i = 0; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      if (token.type === "token-block" && token.start === start) {
        return token;
      }
    }
    console.log("Error, Unable to get block by start in token-manager.js");
    return null;
  }  
}

export default TokenManager;



/// Make toggle between open/close/reject
/// Update it so previous / loadable 
/// 