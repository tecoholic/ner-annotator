export default {
  state() {
    return {
      classes: [],
      inputSentences: [],
      annotations: [],
    };
  },
  getters: {},
  mutations: {
    setInputSentences(state, payload) {
      if (Array.isArray(payload)) {
        payload = payload.join("\n");
      }
      let lines = payload.split("\n");
      state.inputSentences = lines.map((s, i) => ({id: i, text: s}))
    },
  },
  actions: {},
};
