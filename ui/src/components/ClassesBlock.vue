<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control" v-for="cl in classes" :key="cl.id">
      <div class="tags is-medium has-addons">
        <a
          class="tag is-medium"
          :class="{ 'is-link': cl.id === currentClass.id }"
          @click="setCurrentClass(cl.id)"
        >
          {{ cl.name }}
        </a>
        <a class="tag is-medium is-delete" @click="removeClass(cl.id)"></a>
      </div>
    </div>

    <p class="control" v-if="showNewClassInput || classes.length === 0">
      <input
        type="text"
        class="input is-inline"
        v-model="newClassName"
        @keyup="onInputKeyup"
        placeholder="NER TAG"
      />
      <button class="button is-info is-inline" @click="saveNewClass">
        Add
      </button>
    </p>

    <p class="control">
      <button
        class="button is-primary"
        @click="showNewClassInput = true"
      >
        <span class="icon">
          <font-awesome-icon class="fa-lg" icon="plus-square" />
        </span>
      </button>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ClassesBlock",
  data() {
    return {
      showNewClassInput: false,
      newClassName: "",
    };
  },
  computed: {
    ...mapState(["classes", "currentClass"]),
  },
  watch: {
    newClassName(now, then) {
      if (now != then) {
        this.newClassName = now.toUpperCase();
      }
    },
  },
  methods: {
    ...mapMutations(["removeClass", "setCurrentClass"]),
    saveNewClass() {
      this.$store.commit("addClass", this.newClassName);
      this.showNewClassInput = false;
      this.newClassName = "";
    },
    onInputKeyup(e) {
      if (e.key === "Enter") {
        this.saveNewClass();
      }
    },
  },
};
</script>
