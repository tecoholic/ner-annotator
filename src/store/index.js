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
  setInputSentences(state, payload) {
    if (!Array.isArray(payload)) {
      state.originalText = payload;
      payload = payload.split(state.separator);
    }
    state.inputSentences = payload.map((s, i) => ({ id: i, text: s }));
  },
  addClass(state, payload) {
    let existing = state.classes.find((c) => c.name == payload);
    if (existing) {
      return;
    }
    let lastIndex = state.classes.reduce((p, c) => {
      return c.id > p ? c.id : p;
    }, 0);
    state.classes.push({
      id: lastIndex + 1,
      name: payload,
      color: niceColors[lastIndex % niceColors.length],
    });
    if (state.classes.length === 1) {
      state.currentClass = state.classes[0];
    }
  },
  removeClass(state, payload) {
    state.classes = state.classes.filter((c) => c.id != payload);
    if (state.currentClass.id === payload) {
      state.currentClass = state.classes[0];
    }
  },
  setCurrentClass(state, payload) {
    state.currentClass = state.classes.find((c) => c.id === payload);
  },
  addAnnotation(state, payload) {
    state.annotations.push(payload);
  },
  setSeparator(state, payload) {
    state.separator = payload;
    const sentences = state.originalText.split(state.separator);
    state.inputSentences = sentences.map((s, i) => ({ id: i, text: s }));
  },
  nextSentence(state) {
    state.currentIndex += 1;
  },
  resetIndex(state) {
    state.currentIndex = 0;
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
  },
};

export const getters = {};

const actions = {
  createNewClass({ commit, state }, className) {
    return new Promise((resolve, reject) => {
      commit("addClass", className);
      try {
        LocalStorage.set("classes", state.classes);
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },
  deleteClass({ commit, state }, classId) {
    commit("removeClass", classId);
    LocalStorage.set("classes", state.classes);
  },
};

export default {
  state() {
    return {
      originalText: "",
      separator: "\n",
      classes: LocalStorage.getItem("classes") || [],
      inputSentences: [],
      annotations: [],
      currentClass: {},
      currentIndex: 0,
    };
  },
  getters,
  mutations,
  actions,
};
