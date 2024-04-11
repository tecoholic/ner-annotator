import { LocalStorage } from "quasar";

const niceColors = [
  "red-11",
  "blue-11",
  "light-green-11",
  "deep-orange-11",
  "pink-11",
  "light-blue-11",
  "lime-11",
  "brown-11",
  "purple-11",
  "cyan-11",
  "yellow-11",
  "grey-11",
  "deep-purple-11",
  "teal-11",
  "amber-11",
  "blue-grey-11",
  "indigo-11",
  "green-11",
  "orange-11",
];



export const mutations = {
  setCurrentPage(state, page) {
    // console.log("From index.js, changing currentpage to", page)
    state.currentPage = page;
    // console.log("From index.js, current page is now", state.currentPage)
  },
  addToUndoStack(state, { undoAction, actionDescription }) {
    state.undoStack.push({ undoAction, actionDescription });
  },
  undoAction(state, action) {
    // This mutation will dynamically call other mutations based on action.type and action.payload
    if(action && typeof action.type === 'string' && typeof this._mutations[action.type] === 'function') {
      this._mutations[action.type][0](state, action.payload);
    }
  },
  // Mutation to undo the last action
  undoLastAction(state) {
    if (state.undoStack.length > 0) {
      const lastAction = state.undoStack.pop();
      lastAction.undoAction();
      console.log(`Undid action: ${lastAction.actionDescription}`);
    } else {
      console.warn("Undo stack is empty.");
    }
  },
  
  // Mutation to clear the undo stack
  clearUndoStack(state) {
    state.undoStack = [];
  },

  loadClasses(state, payload) {
    if (!Array.isArray(payload)) {
      throw new Error("loadClasses: payload must be an array");
    }
    let isValid = payload.reduce(
      (acc, curr) =>
        acc &&
        typeof curr === "object" &&
        "id" in curr &&
        "name" in curr &&
        "color" in curr,
      true
    );
    if (!isValid) {
      throw new Error("loadClasses: payload has invalid schema");
    }
    state.classes = payload;
    state.currentClass = state.classes[0];
    LocalStorage.set("tags", state.classes);
  },
  
  setInputSentences(state, payload) {
    try {
      let jsonData;
      if (typeof payload === 'string') {
        // Check if the payload is a JSON string
        try {
          jsonData = JSON.parse(payload);
          // If successful, continue with the JSON data processing
        } catch (jsonError) {
          // If JSON parsing fails, assume it's a text file and proceed to read its content
          jsonData = {
            annotations: [[payload, { entities: [] }]],
            classes: [] // You may need to provide some default values here based on your needs
          };
        }
      } else if (payload instanceof File) {
        // If the payload is a File (assumed to be a text file), read its content
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          try {
            const fileContent = event.target.result;
            jsonData = {
              annotations: [[fileContent, { entities: [] }]],
              classes: [] // You may need to provide some default values here based on your needs
            };
  
            // Proceed with the JSON data processing
            processJsonData(jsonData);
          } catch (error) {
            console.error(`Error processing text file: ${error.message}`);
          }
        };
  
        fileReader.readAsText(payload);
        return;
      } else {
        throw new Error("Invalid payload type");
      }
  
      // Continue with the JSON data processing
      processJsonData(jsonData);
    } catch (error) {
      console.error(`Error processing payload: ${error.message}`);
    }
  
    function processJsonData(jsonData) {
      /*
      Function to process data in input entities section and map to token metadata
      Currenlty set to send the last annotation in the list of annotation history
      as the information which gets loaded into review page on enter
      */
      const processedTexts = jsonData.annotations.map(([annotationText, annotationEntities], i) => {
        
        // Store the history of annotations to export to review page 
        let annotationHistory = [];
        // Set the current class for the preceding two indices of each entity
        /* THIS IS FOR THEIR OLD FILE STRUCTURE 
        if (annotationClassIds.length > 0) {
          annotationEntities.entities.forEach(entity => {
            if (entity.length >= 3) {
              const start = entity[0];
              const end = entity[1];
              // type = the block of information that contains the name, date label etc..
              const type = entity[3];
              const label = entity[2];
              const name = type[0][3];
              const status = type[0][4];
              console.log("label: ",label, "start: ",start, "end: ",end, "type: ",type, "name: ", name, "status: ", status);
              annotationHistory.push([label, start, end, type, name, status]);
              const textSnippet = annotationText.slice(start, end);
              const textIndices = [start - 1, start - 2]; // Adjust indices as needed
  
              console.log("THIS CONSOLE.LOG", sstate, label, textSnippet, textIndices);
            }
        }); */
          console.log("help")
          annotationEntities.entities.forEach(entity => {
              if (entity.length >= 3) {
                  console.log("help")
                  const start = entity[0];
                  const end = entity[1];
                  const types = entity[2]; // This will store all blocks as you wanted
                  const type = types[types.length - 1]; // This now assigns only the last block to 'type'
                  const ogtype = types[0];
                  const label = type[3];
                  const name = type[2];
                  const status = type[0];
                  var ogNLP = false
                  if(ogtype[2] === 'nlp') ogNLP = true
      
                  console.log("label: ",label, "start: ",start, "end: ",end, "type: ",type, "name: ", name, "status: ", status);
                  annotationHistory.push([label, start, end, type, name, status, ogNLP, types]);
    
                  console.log("Loaded annotation history:", types);
              }
      
          });
        state.annotationHistory = annotationHistory;
        console.log("Updated state.annotationHistory:", state.annotationHistory);
      

      return { id: i, text: annotationText };
    });
  
      state.inputSentences = processedTexts;
      state.originalText = processedTexts.map(item => item.text).join(state.separator);
  
      if (jsonData.classes && Array.isArray(jsonData.classes)) {
        mutations.loadClasses(state, jsonData.classes);
      }
    }
  },  
  
  
  addClass(state, payload) {
    // Check if the class already exists
    const existingClass = state.classes.find((c) => c.name === payload);
  
    // If the class already exists, return
    if (existingClass) {
      console.log('Class already exists, returning.');
      return;
    }
  
    // Add the new class
    const lastIndex = state.classes.reduce((p, c) => (c.id > p ? c.id : p), 0);
    const newClass = {
      id: lastIndex + 1,
      name: payload,
      color: niceColors[lastIndex % niceColors.length],
    };
  
    // Check again to handle a race condition
    if (!state.classes.some((c) => c.name === newClass.name)) {
      state.classes = [...state.classes, newClass];
  
      // If this is the first class, set it as the currentClass
      if (state.classes.length === 1) {
        state.currentClass = state.classes[0];
        console.log('Updated currentClass:', state.currentClass);
      }
    }
  },  
  
  removeClass(state, payload) {
    state.classes = state.classes.filter((c) => c.id != payload);
    if (state.currentClass.id === payload) {
      state.currentClass = state.classes[0];
    }
  },
  setCurrentClass(state, payload) {
    state.currentClass = state.classes[payload];
  },
  addAnnotation(state, payload) {
    state.annotations[state.currentIndex] = payload;
    state.currentAnnotation = payload;
  },
  clearAllAnnotations(state) {
    state.annotations = [];
    state.currentAnnotation = {};
  },
  setSeparator(state, payload) {
    state.separator = payload;
    const sentences = state.originalText.split(state.separator);
    state.inputSentences = sentences.map((s, i) => ({ id: i, text: s }));
  },
  setAnnotationPrecision(state, payload) {
    state.annotationPrecision = payload;
  },
  setKeyboardShortcuts(state, payload) {
    state.enableKeyboardShortcuts = payload;
  },
  nextSentence(state) {
    if (state.currentIndex < state.inputSentences.length - 1) {
      state.currentIndex += 1;
      state.currentAnnotation = state.annotations[state.currentIndex] || {};
    } else {
      alert("You have completed all the sentences");
    }
  },
  previousSentence(state) {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      state.currentAnnotation = state.annotations[state.currentIndex];
    } else {
      alert("You are at the beginning of all sentences");
    }
  },
  resetIndex(state) {
    state.currentIndex = 0;
  },
  loadAnnotations(state, payload) {
    let isValid = typeof payload === "object" &&
    "annotations" in payload &&
    "classes" in payload;

    if (!isValid) {
      throw new Error("loadAnnotations: payload has invalid schema");
    }

    let annotations = payload.annotations;
    if (!Array.isArray(annotations)) {
      throw new Error("loadAnnotations: payload must be an array");
    }

    let newAnnotations = [];

    for (var i = 0; i < annotations.length; i++) {
      if (annotations[i] == null) continue;
      let annotation = {
        'text': annotations[i][0],
        'entities': annotations[i][1].entities,
      }
      newAnnotations[i] = annotation;
    }
    state.annotations = newAnnotations;
    state.currentAnnotation = state.annotations[state.currentIndex];
  },
};

export const getters = {};

const actions = {
  createNewClass({ commit, state }, className) {
    return new Promise((resolve, reject) => {
      commit("addClass", className);
      try {
        LocalStorage.set("tags", state.classes);
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },
  deleteClass({ commit, state }, classId) {
    commit("removeClass", classId);
    LocalStorage.set("tags", state.classes);
  },
};

window.addEventListener('beforeunload', async (event) => {
  event.returnValue = "Please make sure you export annotations before closing the file.";
});

export default {
  state() {
    let tags = LocalStorage.getItem("tags");
    return {
      annotations: [],
      annotationHistory: [],
      undoStack: [],
      classes: tags || [],
      inputSentences: [],
      originalText: "",
      separator: "\n",
      enableKeyboardShortcuts: false,
      annotationPrecision: "word",
      // current state
      currentAnnotation: {},
      currentClass: tags && tags[0] || {},
      currentIndex: 0,
      currentSentence: "",
      currentPage: "start"
    };
  },
  getters,
  mutations,
  actions,
};
