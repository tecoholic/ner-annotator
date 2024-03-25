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
  addNewBlock(_start, _end, _class, humanOpinion, initiallyNLP = false, name = "name") {
    // Directly apply humanOpinion to the block structure
    let block = {
      type: "token-block",
      start: _start,
      end: _end,
      name: name,
      label: _class.name,
      humanOpinion: humanOpinion, 
      initiallyNLP: initiallyNLP, 
      userHasToggled: false, // Default value
      isSymbolActive: false,
      // Assuming tokens property will hold the tokens covered by this block
      tokens: this.tokens.filter(token => token.start >= _start && token.end <= _end),
      backgroundColor: _class.color || null, // Apply a default or use _class.color if available
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

            if (tokensBeforeSelection.length) {
              newTokens.push({
                type: "token-block",
                start: tokensBeforeSelection[0].start,
                end: tokensBeforeSelection[tokensBeforeSelection.length - 1].end,
                tokens: tokensBeforeSelection,
                label: currentToken.label,
                classId: currentToken.classId,
                backgroundColor: currentToken.backgroundColor,
              })
            }

            if (selectedTokens.length && tokensAfterSelection.length) {
              // there are selected tokens and more tokens in block after selection
              newTokens.push({
                type: "token-block",
                start: selectedTokens[0].start,
                end: selectedTokens[selectedTokens.length - 1].end,
                tokens: selectedTokens,
                label: _class && _class.name ? _class.name : "Unlabelled",
                classId: _class && _class.id ? _class.id : 0,
                backgroundColor: _class && _class.color ? _class.color : null,
              });
              selectedTokens = [];
            }

            if (tokensAfterSelection.length) {
              newTokens.push({
                type: "token-block",
                start: tokensAfterSelection[0].start,
                end: tokensAfterSelection[tokensAfterSelection.length - 1].end,
                tokens: tokensAfterSelection,
                label: currentToken.label,
                classId: currentToken.classId,
                backgroundColor: currentToken.backgroundColor,
              })
            }
          }
        } else if (currentToken.type == "token") {
          selectedTokens.push(currentToken);
        }
      } else if (currentToken.start >= selectionEnd && selectedTokens.length) {
        // token is first after the selection
        newTokens.push({
          type: "token-block",
          start: selectedTokens[0].start,
          end: selectedTokens[selectedTokens.length - 1].end,
          tokens: selectedTokens,
          label: _class && _class.name ? _class.name : "Unlabelled",
          classId: _class && _class.id ? _class.id : 0,
          backgroundColor: _class && _class.color ? _class.color : null,
        });
        selectedTokens = [];
        newTokens.push(currentToken);
      } else {
        newTokens.push(currentToken);
      }
    }

    // Case if the selected tokens are at the end of the text and have not been added to the newTokens
    if (selectedTokens.length) {
      block.tokens = selectedTokens; // Ensure newBlock has the correct tokens
      newTokens.push(block); // Add newBlock to the array of new tokens
    }
    
    // After finishing the loop and handling all tokens
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
    const currentDate = new Date();
    const dateFormatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const timeFormatter = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = dateFormatter.format(currentDate);
    const time = timeFormatter.format(currentDate);
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].type === "token-block") {
        console.log("export As annotations this is ", this);
        let b = this.tokens[i];
        entities.push([b.name, date, time, b.start, b.end, b.label, b.initiallyNLP, b.isSymbolActive, b.userHasToggled]);
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